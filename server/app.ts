import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'dotenv/config';
import registrationRouter from './routes/registration.js';
import paymentRouter from './routes/payment.js';
import adminRouter from './routes/admin.js';

const app = express();

app.use(
  cors({
    origin: [
      'https://sahajspirit.com',
      'https://www.sahajspirit.com',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
  })
);

// Raw body needed for webhook signature verification — must run before JSON parsing.
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

// Conditional JSON parsing: on Vercel the platform may have already populated req.body.
// Parsing again would consume an empty stream and wipe the body, so only parse when needed.
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.body !== undefined && req.body !== null) return next();
  express.json({ limit: '10mb' })(req, res, next);
});

app.use('/api/registration', registrationRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

export default app;
