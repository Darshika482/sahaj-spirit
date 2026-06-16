import comicPanel1 from '../assets/comic_panel_1.png';
import comicPanel2 from '../assets/comic_panel_2.png';
import comicPanel3 from '../assets/comic_panel_3.png';
import comicPanel4 from '../assets/comic_panel_4.png';

/** Maps legacy content.json paths and keys to Vite-resolved asset URLs. */
const LOCAL_IMAGE_MAP: Record<string, string> = {
  comicPanel1: comicPanel1,
  comicPanel2: comicPanel2,
  comicPanel3: comicPanel3,
  comicPanel4: comicPanel4,
  '/src/assets/comic_panel_1.png': comicPanel1,
  '/src/assets/comic_panel_2.png': comicPanel2,
  '/src/assets/comic_panel_3.png': comicPanel3,
  '/src/assets/comic_panel_4.png': comicPanel4,
};

/** Resolve a stored image path/URL for use in <img src>. */
export function resolveContentImageUrl(url?: string | null): string {
  if (!url) return '';
  return LOCAL_IMAGE_MAP[url] ?? url;
}
