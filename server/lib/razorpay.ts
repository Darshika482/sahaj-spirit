import Razorpay from 'razorpay';
import 'dotenv/config';

const keyId = process.env.VITE_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  console.warn('[Razorpay] VITE_RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set');
}

export const razorpay = keyId && keySecret
  ? new Razorpay({ key_id: keyId, key_secret: keySecret })
  : null;
