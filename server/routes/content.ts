import { Router } from 'express';
import { readContent } from '../lib/contentStore.js';

const router = Router();

/** Public read-only endpoint for live site content (saved via admin panel). */
router.get('/', async (_req, res) => {
  try {
    const data = await readContent();
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
