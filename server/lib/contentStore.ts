import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from './supabase.js';
import bundledContent from '../../src/data/content.json' with { type: 'json' };

/**
 * Content persistence that works in both environments:
 *  • Local dev  → read/write the real src/data/content.json (keeps Vite HMR workflow).
 *  • Vercel     → filesystem is read-only, so persist to Supabase Storage instead,
 *                 falling back to the build-time bundled content on first load.
 */

const onVercel = Boolean(process.env.VERCEL);
const BUCKET = 'content-images';
const KEY = 'site-content.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localPath = path.join(__dirname, '../../src/data/content.json');

export async function readContent(): Promise<any> {
  if (onVercel) {
    if (supabase) {
      const { data, error } = await supabase.storage.from(BUCKET).download(KEY);
      if (!error && data) {
        try {
          return JSON.parse(await data.text());
        } catch {
          /* fall through to bundled content */
        }
      }
    }
    return bundledContent;
  }

  const raw = fs.readFileSync(localPath, 'utf8');
  return JSON.parse(raw);
}

export async function writeContent(data: any): Promise<void> {
  if (onVercel) {
    if (!supabase) throw new Error('Supabase Storage not configured');
    const buffer = Buffer.from(JSON.stringify(data, null, 2), 'utf8');
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(KEY, buffer, { upsert: true, contentType: 'application/json' });
    if (error) throw new Error(error.message);
    return;
  }

  fs.writeFileSync(localPath, JSON.stringify(data, null, 2), 'utf8');
}
