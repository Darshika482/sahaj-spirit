import { Router, Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentFilePath = path.join(__dirname, '../../src/data/content.json');

const router = Router();

interface AdminRequest extends Request {
  admin?: { id: string; name: string; email: string; can_view_registrations: boolean; can_edit_content: boolean };
}

async function verifyAdmin(req: AdminRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!supabase) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  const token = authHeader.slice(7);
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  const { data: admin } = await supabase
    .from('admins')
    .select('id, name, email, can_view_registrations, can_edit_content')
    .eq('email', user.email)
    .single();

  if (!admin) {
    return res.status(403).json({ error: 'Not an authorized admin' });
  }

  req.admin = admin;
  next();
}

// Returns the logged-in admin's own permissions so the frontend can adapt its UI
router.get('/me', verifyAdmin, (req: AdminRequest, res) => {
  const { name, email, can_view_registrations, can_edit_content } = req.admin!;
  res.json({ name, email, can_view_registrations, can_edit_content });
});

function requireRole(role: 'can_view_registrations' | 'can_edit_content') {
  return (req: AdminRequest, res: Response, next: NextFunction) => {
    if (!req.admin?.[role]) {
      return res.status(403).json({ error: 'You do not have permission for this action.' });
    }
    next();
  };
}

router.get('/registrations', verifyAdmin, requireRole('can_view_registrations'), async (req, res) => {
  const { data, error } = await supabase!
    .from('registrations')
    .select('id, payer_name, payer_email, payer_mobile, member_count, amount_paid, payment_status, razorpay_order_id, razorpay_payment_id, registered_at')
    .order('registered_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/registrations/:id/members', verifyAdmin, requireRole('can_view_registrations'), async (req, res) => {
  const { data, error } = await supabase!
    .from('members')
    .select('id, member_id, name, gender, age, dietary, created_at')
    .eq('registration_id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/export', verifyAdmin, requireRole('can_view_registrations'), async (req, res) => {
  const { data, error } = await supabase!
    .from('members')
    .select('member_id, name, gender, age, dietary, created_at, registrations(payer_name, payer_email, payer_mobile, payment_status, razorpay_payment_id)')
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  const header = 'Member ID,Name,Gender,Age,Dietary,Payer Name,Payer Email,Payer Mobile,Payment Status,Razorpay Payment ID,Registered At\n';
  const rows = (data ?? []).map((m: any) => {
    const r = Array.isArray(m.registrations) ? m.registrations[0] : m.registrations ?? {};
    return [m.member_id ?? 'PENDING', m.name, m.gender, m.age, m.dietary,
      r.payer_name, r.payer_email, r.payer_mobile, r.payment_status, r.razorpay_payment_id ?? '', m.created_at]
      .map((v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`)
      .join(',');
  }).join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=sahaj-summit-2026.csv');
  res.send(header + rows);
});

router.get('/content', verifyAdmin, requireRole('can_edit_content'), (req, res) => {
  try {
    if (!fs.existsSync(contentFilePath)) {
      return res.status(404).json({ error: 'Content file not found' });
    }
    const raw = fs.readFileSync(contentFilePath, 'utf8');
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/content', verifyAdmin, requireRole('can_edit_content'), (req, res) => {
  try {
    const data = req.body;
    if (!data.comic || !data.experiences || !data.bulletin) {
      return res.status(400).json({ error: 'Invalid content structure' });
    }
    fs.writeFileSync(contentFilePath, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Image Upload to Supabase Storage ──────────────────────────────────────────
router.post('/upload', verifyAdmin, requireRole('can_edit_content'), async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Supabase not configured' });
    }

    const { base64, filename, contentType } = req.body;

    if (!base64 || !filename || !contentType) {
      return res.status(400).json({ error: 'Missing base64, filename, or contentType' });
    }

    // Decode base64 to buffer
    const buffer = Buffer.from(base64, 'base64');

    // Generate a unique path: content-images/<timestamp>-<filename>
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `${Date.now()}-${safeName}`;

    // Upload to Supabase Storage bucket "content-images"
    const { data, error } = await supabase.storage
      .from('content-images')
      .upload(storagePath, buffer, {
        contentType,
        cacheControl: '31536000',  // 1 year cache
        upsert: false,
      });

    if (error) {
      return res.status(500).json({ error: `Upload failed: ${error.message}` });
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('content-images')
      .getPublicUrl(data.path);

    res.json({ url: urlData.publicUrl });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

