import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import registrationRouter from './routes/registration.js';
import paymentRouter from './routes/payment.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://sahajspirit.org', 'https://www.sahajspirit.org']
    : 'http://localhost:3000',
  credentials: true,
}));

// Raw body needed for webhook signature verification — must be before express.json()
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());

app.use('/api/registration', registrationRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});
