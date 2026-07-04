import { useEffect, useState } from 'react';
import defaultContent from '../data/content.json';
import { resolveContentImageUrl } from './contentImages';

export type SiteContent = typeof defaultContent;

function normalizeContent(data: SiteContent): SiteContent {
  return {
    ...data,
    comic: data.comic.map((panel) => ({
      ...panel,
      image: resolveContentImageUrl(panel.image),
    })),
  };
}

const fallbackContent = normalizeContent(defaultContent as SiteContent);

function isValidContent(data: unknown): data is SiteContent {
  if (!data || typeof data !== 'object') return false;
  const d = data as SiteContent;
  return Boolean(d.comic && d.experiences && d.bulletin);
}

/**
 * Loads site content from /api/content (Supabase in production).
 * Returns null content while loading — never flash bundled placeholder comics.
 */
export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/content', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('content fetch failed'))))
      .then((data) => {
        if (cancelled) return;
        setContent(isValidContent(data) ? normalizeContent(data) : fallbackContent);
      })
      .catch(() => {
        if (!cancelled) setContent(fallbackContent);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, isLoading };
}
