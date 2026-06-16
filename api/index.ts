import app from '../server/app.js';

// All /api/* requests are rewritten to this function (see vercel.json). Vercel
// preserves the original request URL, so the Express app's /api/... routes match.
export default app;
