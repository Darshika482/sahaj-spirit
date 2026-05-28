import { Router } from 'express';
import { razorpay } from '../lib/razorpay.js';
import { supabase } from '../lib/supabase.js';

const router = Router();

interface Member {
  name: string;
  gender: string;
  age: number;
}

interface CreateOrderBody {
  payerName: string;
  payerEmail: string;
  payerMobile: string;
  members: Member[];
}

router.post('/create-order', async (req, res) => {
  try {
    const { payerName, payerEmail, payerMobile, members }: CreateOrderBody = req.body;

    if (!payerName?.trim() || !payerEmail?.trim() || !payerMobile?.trim()) {
      return res.status(400).json({ error: 'Payer name, email, and mobile are required' });
    }
    if (!members || members.length === 0) {
      return res.status(400).json({ error: 'At least one member is required' });
    }
    for (const m of members) {
      if (!m.name?.trim() || !m.gender || !m.age) {
        return res.status(400).json({ error: 'Each member must have a name, gender, and age' });
      }
    }

    if (!razorpay) {
      return res.status(503).json({ error: 'Payment gateway not configured' });
    }

    const feePerPerson = parseInt(process.env.VITE_REGISTRATION_FEE || '1000', 10);
    const amountPaise = feePerPerson * members.length * 100;

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      notes: {
        payerEmail,
        payerMobile,
        memberCount: String(members.length),
      },
    });

    let registrationId: string | null = null;

    if (supabase) {
      const { data: reg, error: regErr } = await supabase
        .from('registrations')
        .insert({
          payer_name: payerName,
          payer_email: payerEmail,
          payer_mobile: payerMobile,
          member_count: members.length,
          amount_paid: feePerPerson * members.length,
          razorpay_order_id: order.id,
          payment_status: 'pending',
        })
        .select()
        .single();

      if (regErr) {
        console.error('[DB] Error creating registration:', regErr);
      } else {
        registrationId = reg.id;

        const { error: memErr } = await supabase.from('members').insert(
          members.map(m => ({
            registration_id: reg.id,
            name: m.name,
            gender: m.gender,
            age: m.age,
          }))
        );
        if (memErr) console.error('[DB] Error creating members:', memErr);
      }
    }

    res.json({ orderId: order.id, amount: amountPaise, currency: 'INR', registrationId });
  } catch (err) {
    console.error('[Registration] create-order error:', err);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

export default router;
