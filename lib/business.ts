/**
 * Every fact about CR Cars, in one file.
 *
 * The site has no CMS and no admin panel — that was the owner's call, so
 * that there is nothing for him to log into and nothing to go stale. The
 * trade-off is that this file IS the admin panel: changing a phone number
 * or an opening time means editing here and redeploying, which is a
 * two-minute job, and it means a developer can answer "what does the site
 * claim?" by reading one screen instead of grepping the components.
 *
 * Anything marked NEEDS CONFIRMATION is a placeholder standing in for
 * something the owner has not sent yet. They are deliberately grouped and
 * deliberately loud. Do not quietly spread them into the pages.
 */

/* ------------------------------------------------------------------ *
 *  NEEDS CONFIRMATION FROM THE OWNER
 *  ---------------------------------
 *  Each of these is a guess or a gap. Replace, then delete the flag.
 * ------------------------------------------------------------------ */
export const UNCONFIRMED = {
  /** Google shows "Closes 8:30 pm". The opening time is a guess. */
  openingTime: '9:30 am',
  /** No weekly off is listed on the profile. Assumed open daily. */
  weeklyOff: null as string | null,
  /** Whether the wash centre has a separate phone line. Its Google
   *  listing ("Cr Express Car Washing Centre") shows 095384 68778; the site
   *  still sends wash calls to the main line until the owner says which. */
  washBranchPhone: true,
  /** Years in business, cars serviced — nothing to cite yet. */
  trackRecord: true,
} as const;

export const BUSINESS = {
  name: 'CR Cars',
  /** As the Google Business Profile reads. Used in structured data. */
  legalName: 'CR Cars Service Center',
  tagline: 'Service, modification and car wash — all in one place.',

  /**
   * The public line, printed in the navbar and on every button.
   * Source: the Google Business Profile.
   */
  phone: '07022846611',
  phoneDisplay: '070228 46611',

  /**
   * Where WhatsApp enquiries land. Same number as the phone line until the
   * owner says otherwise — if the workshop line and the WhatsApp phone turn
   * out to be different handsets, change this one only.
   */
  whatsapp: '917022846611',

  /** Quoted wherever we cite Google. Keep in step with the live profile. */
  rating: 5.0,
  reviewCount: 6,
  googleReviewsUrl:
    'https://www.google.com/maps/place/CR+Cars+Service+Center/@12.8191749,77.6620209,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae156aefea5f59:0xe8e0bbbe11dcf09a!8m2!3d12.8191697!4d77.6645958!16s%2Fg%2F11h8x04k7x',

  city: 'Bengaluru',
  state: 'Karnataka',

  /**
   * The two branches.
   *
   * They are modelled as a list rather than as `branchA`/`branchB` because
   * the owner has mentioned wanting a third, and because every page that
   * shows a branch — the footer, the contact page, the two service pages —
   * should render whatever is here without being edited again.
   */
  branches: [
    {
      id: 'service',
      name: 'Service & Modification Centre',
      short: 'Service Centre',
      blurb: 'Full servicing, repairs, modification work and accessories.',
      street: 'Next to GM Infinity, near Indian Petrol Bunk, Thirupalya Main Road',
      locality: 'Thirupalya, Bommasandra',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560099',
      /** The listing's pin, not the map view's centre — the @-coordinates
       *  in a Maps link are where the screen was, about 270 m west of the
       *  workshop. Plus code RM97+MR Bommasandra is the same lot. */
      geo: { lat: 12.8191697, lng: 77.6645958 },
      plusCode: 'RM97+MR Bommasandra, Karnataka',
      /** The place link, with its place id, so it opens the listing. */
      mapsUrl:
        'https://www.google.com/maps/place/CR+Cars+Service+Center/@12.8191749,77.6620209,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae156aefea5f59:0xe8e0bbbe11dcf09a!8m2!3d12.8191697!4d77.6645958!16s%2Fg%2F11h8x04k7x',
      phone: '07022846611',
      phoneDisplay: '070228 46611',
    },
    {
      id: 'wash',
      name: 'Car Wash Centre',
      short: 'Wash Centre',
      blurb: 'Every kind of wash, polish and interior clean, for every car.',
      /* From its Google listing, "Cr Express Car Washing Centre" — about
         250 m along Thirupalya Main Road from the service centre. */
      street: 'Neo Town Phase 1, near GM Infinity, Hulimangala Main Road',
      locality: 'Thirupalya, Hebbagodi',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560100',
      geo: { lat: 12.819532, lng: 77.6625106 },
      plusCode: 'RM97+R2 Hebbagodi, Karnataka',
      mapsUrl:
        'https://www.google.com/maps/place/Cr+Express+Car+Washing+Centre/@12.819532,77.6625106,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae6c71a16db97d:0x38da3140bf4631b9!8m2!3d12.819532!4d77.6625106!16s%2Fg%2F11s3zcjh_2',
      phone: '07022846611',
      phoneDisplay: '070228 46611',
    },
  ],

  /** Structured for schema.org. The human string is built in lib/format. */
  openingHours: [
    {
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:30',
      closes: '20:30',
    },
  ],
  hoursDisplay: 'Open daily · 9:30 am – 8:30 pm',

  /** Used in the "we cover" line on the contact page. */
  servingAreas: [
    'Bommasandra',
    'Electronic City',
    'Attibele',
    'Chandapura',
    'Hebbagodi',
    'Anekal',
    'Jigani',
    'Hosur Road',
  ],
} as const;

export type Branch = (typeof BUSINESS.branches)[number];

export const serviceBranch = BUSINESS.branches[0];
export const washBranch = BUSINESS.branches[1];

/** "Next to GM Infinity…, Thirupalya, Bommasandra, Bengaluru, Karnataka 560099" */
export const formatAddress = (b: Branch) =>
  [b.street, b.locality, b.city, `${b.state} ${b.postalCode}`]
    .filter(Boolean)
    .join(', ');
