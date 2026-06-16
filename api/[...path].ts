import app from '../server/app.js';

// Vercel maps this catch-all to every /api/* request and passes the original
// URL through, so the Express app's existing /api/... routes match unchanged.
export default app;
