const PRODUCTION_ADMIN_URL = 'https://www.sahajspirit.com/admin';

/** OAuth callback URL — always use www in production to avoid apex→www redirects dropping auth params. */
export function getAdminRedirectUrl(): string {
  if (typeof window === 'undefined') return '/admin';

  const { hostname, origin } = window.location;
  if (hostname === 'sahajspirit.com' || hostname === 'www.sahajspirit.com') {
    return PRODUCTION_ADMIN_URL;
  }

  return `${origin}/admin`;
}

/** Send apex visitors to www before OAuth, preserving query/hash (server 307 strips hash). */
export function normalizeAdminOrigin(): void {
  if (typeof window === 'undefined') return;
  if (window.location.hostname !== 'sahajspirit.com') return;

  const target = `https://www.sahajspirit.com${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.location.replace(target);
}
