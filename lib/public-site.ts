/**
 * Where Cael is served, and which static files answer without a session.
 *
 * Set NEXT_PUBLIC_APP_URL to the app's public origin (https://cael.example.com).
 * It's used for absolute links: uploaded media, push notifications, the MCP
 * setup hint. Locally it defaults to http://localhost:3000.
 */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** The app's host, without the scheme. */
export const APP_HOST = new URL(APP_URL).host;

/**
 * Static files served straight out of `public/` — images and fonts only, at the
 * top level. next/image's optimizer fetches its source over HTTP without a session
 * cookie, so these have to answer before sign-in.
 */
const PUBLIC_ASSET_RE = /^\/[\w.-]+\.(?:jpg|jpeg|png|webp|avif|gif|svg|ico|woff2?)$/i;

/** A file in `public/` — an image or font, never a page or an API route. */
export function isPublicAsset(pathname: string): boolean {
  return PUBLIC_ASSET_RE.test(pathname);
}
