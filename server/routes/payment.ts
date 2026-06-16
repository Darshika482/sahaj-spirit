import { Router } from 'express';
import crypto from 'crypto';
import { supabase } from '../lib/supabase.js';
import { generateMemberIds } from '../utils/memberId.js';

const router = Router();

// Called by frontend immediately after Razorpay checkout success
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return res.status(503).json({ error: 'Payment gateway not configured' });

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    if (supabase && registrationId) {
      const { data: members } = await supabase
        .from('members')
        .select('id')
        .eq('registration_id', registrationId);

      if (members && members.length > 0) {
        const ids = await generateMemberIds(supabase, members.length);
        for (let i = 0; i < members.length; i++) {
          await supabase
            .from('members')
            .update({ member_id: ids[i] })
            .eq('id', members[i].id);
        }
      }

      await supabase
        .from('registrations')
        .update({ payment_status: 'success', razorpay_payment_id })
        .eq('id', registrationId);

      const { data: confirmed } = await supabase
        .from('members')
        .select('id, member_id, name, gender, age, dietary')
        .eq('registration_id', registrationId);

      return res.json({ success: true, members: confirmed ?? [] });
    }

    res.json({ success: true, members: [] });
  } catch (err) {
    console.error('[Payment] verify error:', err);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Razorpay webhook — backup verification
router.post('/webhook', async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const rawBody = req.body;
    const isRaw = Buffer.isBuffer(rawBody);

    // Signature verification requires the raw body. On platforms that pre-parse
    // the body (e.g. Vercel) it arrives as an object, so we can only verify when raw.
    if (webhookSecret && isRaw) {
      const signature = req.headers['x-razorpay-signature'] as string;
      const expected = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (signature !== expected) {
        return res.status(400).json({ error: 'Invalid webhook signature' });
      }
    }

    const event = isRaw ? JSON.parse(rawBody.toString()) : rawBody;

    if (event.event === 'payment.captured' && supabase) {
      const orderId = event.payload.payment.entity.order_id;
      await supabase
        .from('registrations')
        .update({ payment_status: 'success' })
        .eq('razorpay_order_id', orderId)
        .eq('payment_status', 'pending');
    }

    res.json({ received: true });
  } catch (err) {
    console.error('[Webhook] error:', err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
