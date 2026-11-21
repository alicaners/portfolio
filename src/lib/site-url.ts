// Canlı site Netlify'da. NEXT_PUBLIC_SITE_URL ayarlıysa o kullanılır,
// yoksa yayındaki adrese düşülür (sitemap, robots ve OG görselinin mutlak adresi için).
export const DEFAULT_SITE_URL = "https://alicanersezer.netlify.app";

export function getSiteUrl(
  env: Record<string, string | undefined> = process.env,
): URL {
  return new URL(env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);
}
