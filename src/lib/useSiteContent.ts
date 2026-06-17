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

/** Loads site content from the API, falling back to bundled defaults. */
export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(fallbackContent);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.comic || !data?.experiences || !data?.bulletin) return;
        setContent(normalizeContent(data as SiteContent));
      })
      .catch(() => {
        /* keep bundled fallback */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
