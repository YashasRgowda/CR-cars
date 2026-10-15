/**
 * The site's own absolute URL.
 *
 * Canonical links, Open Graph images and every structured-data block need
 * it. Vercel supplies VERCEL_URL on each deployment, but that is the
 * hostname of THAT deployment — crcars-7f3k9…vercel.app — which changes on
 * every push. Left to it, every canonical on the site points at a
 * throwaway address and Google indexes the wrong one.
 *
 * So set NEXT_PUBLIC_SITE_URL to the live domain, on the Production
 * environment only: a preview deployment that claims to be the production
 * site is worse than one that admits what it is. Next bakes
 * NEXT_PUBLIC_ values in at build time, so it takes a redeploy, not a save.
 */
const normalise = (url: string) => url.trim().replace(/\/+$/, '');

export const siteUrl = normalise(
  // `||`, not `??`. A host can define a variable with an EMPTY value, and
  // an empty string is not null, so `??` would keep the blank and every
  // absolute URL on the site would come out as a bare path.
  process.env.NEXT_PUBLIC_SITE_URL ||
    // The live domain, so production canonicals and link previews never
    // point at a throwaway *.vercel.app address even if the variable is unset.
    (process.env.VERCEL_ENV === 'production'
      ? 'https://www.crcarservicecenter.com'
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'),
);
