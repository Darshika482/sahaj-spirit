import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from './supabase.js';
import bundledContent from '../../src/data/content.json' with { type: 'json' };

/**
 * Single source of truth for editable site content:
 *  • Supabase Storage (when configured) — shared by local dev and production.
 *  • Local src/data/content.json — fallback when Supabase is unavailable.
 *  • Bundled content.json — last-resort default baked into the build.
 */

const onVercel = Boolean(process.env.VERCEL);
const BUCKET = 'content-images';
const KEY = 'site-content.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localPath = path.join(__dirname, '../../src/data/content.json');

async function readFromSupabase(): Promise<any | null> {
  if (!supabase) return null;

  const { data, error } = await supabase.storage.from(BUCKET).download(KEY);
  if (error || !data) return null;

  try {
    return JSON.parse(await data.text());
  } catch {
    return null;
  }
}

async function writeToSupabase(data: any): Promise<void> {
  if (!supabase) throw new Error('Supabase Storage not configured');
  const buffer = Buffer.from(JSON.stringify(data, null, 2), 'utf8');
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(KEY, buffer, { upsert: true, contentType: 'application/json' });
  if (error) throw new Error(error.message);
}

function readLocalFile(): any | null {
  if (!fs.existsSync(localPath)) return null;
  return JSON.parse(fs.readFileSync(localPath, 'utf8'));
}

function writeLocalFile(data: any): void {
  fs.writeFileSync(localPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function readContent(): Promise<any> {
  const remote = await readFromSupabase();
  if (remote) return remote;

  const local = readLocalFile();
  if (local) return local;

  return bundledContent;
}

export async function writeContent(data: any): Promise<void> {
  if (supabase) {
    await writeToSupabase(data);
    // Keep local file in sync during dev so git/content.json stays readable.
    if (!onVercel) {
      try {
        writeLocalFile(data);
      } catch {
        /* non-fatal */
      }
    }
    return;
  }

  if (onVercel) throw new Error('Supabase Storage not configured');
  writeLocalFile(data);
}
