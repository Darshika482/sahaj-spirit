import { Router, Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase.js';

const router = Router();

interface AdminRequest extends Request {
  admin?: { id: string; name: string; email: string };
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
    .select('id, name, email')
    .eq('email', user.email)
    .single();

  if (!admin) {
    return res.status(403).json({ error: 'Not an authorized admin' });
  }

  req.admin = admin;
  next();
}

router.get('/registrations', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase!
    .from('registrations')
    .select('id, payer_name, payer_email, payer_mobile, member_count, amount_paid, payment_status, razorpay_order_id, razorpay_payment_id, registered_at')
    .order('registered_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/registrations/:id/members', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase!
    .from('members')
    .select('id, member_id, name, gender, age, dietary, created_at')
    .eq('registration_id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/export', verifyAdmin, async (req, res) => {
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

export default router;
