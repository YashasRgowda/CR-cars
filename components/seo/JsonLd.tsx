import { BUSINESS, formatAddress, serviceBranch, washBranch } from '@/lib/business';

/**
 * Structured data for the knowledge panel.
 *
 * Almost every customer this site gets will arrive through local search,
 * so the schema is not an SEO garnish here — it is how Google learns that
 * the two addresses are one business, what the hours are, and that the
 * rating it already holds belongs to this domain.
 *
 * AutoRepair rather than the generic LocalBusiness: it is the type Google
 * documents for a garage, and it is what makes "car service near me"
 * eligible to surface the place.
 *
 * Two things this deliberately does NOT claim:
 *
 *  - aggregateRating is emitted only because the figures in lib/business
 *    are copied from the live Google profile. If they ever drift, delete
 *    the block rather than let it go stale — a rating in schema that
 *    disagrees with the one Google holds is a manual-action risk, and it
 *    is the kind of thing nobody notices for a year.
 *  - Coordinates come from each branch's own Google listing pin, never
 *    from a map view's centre. An invented geo is worse than an absent
 *    one: it puts a pin on a map at a place the customer will drive to.
 */
export function LocalBusinessJsonLd({ siteUrl }: { siteUrl: string }) {
  const hours = BUSINESS.openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));

  const main = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${siteUrl}/#business`,
    name: BUSINESS.legalName,
    alternateName: BUSINESS.name,
    description: BUSINESS.tagline,
    url: siteUrl,
    telephone: `+91${BUSINESS.phone.replace(/^0/, '')}`,
    // The owner's own photograph of the frontage, signboard and all.
    image: `${siteUrl}/images/hero/showroom-hero-v2.jpg`,
    logo: `${siteUrl}/brand/icon-512.png`,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: serviceBranch.street,
      addressLocality: serviceBranch.locality,
      addressRegion: serviceBranch.state,
      postalCode: serviceBranch.postalCode,
      addressCountry: 'IN',
    },
    geo: serviceBranch.geo && {
      '@type': 'GeoCoordinates',
      latitude: serviceBranch.geo.lat,
      longitude: serviceBranch.geo.lng,
    },
    openingHoursSpecification: hours,
    areaServed: BUSINESS.servingAreas.map((a) => ({ '@type': 'Place', name: a })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS.rating,
      reviewCount: BUSINESS.reviewCount,
      bestRating: 5,
    },
    makesOffer: [
      'Car service and repair',
      'Car modification',
      'Car wash and detailing',
      'Car accessories',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    department: [
      {
        '@type': 'AutoWash',
        '@id': `${siteUrl}/#wash`,
        name: `${BUSINESS.name} — ${washBranch.name}`,
        description: washBranch.blurb,
        telephone: `+91${washBranch.phone.replace(/^0/, '')}`,
        url: `${siteUrl}/car-wash`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: washBranch.street,
          addressLocality: washBranch.locality,
          addressRegion: washBranch.state,
          postalCode: washBranch.postalCode,
          addressCountry: 'IN',
        },
        geo: washBranch.geo && {
          '@type': 'GeoCoordinates',
          latitude: washBranch.geo.lat,
          longitude: washBranch.geo.lng,
        },
        hasMap: washBranch.mapsUrl,
        openingHoursSpecification: hours,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from a frozen local object — there is no user
      // input anywhere in it — and JSON.stringify escapes the quotes.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(main) }}
    />
  );
}

/** Breadcrumbs for the interior pages. */
export function BreadcrumbJsonLd({
  siteUrl,
  items,
}: {
  siteUrl: string;
  items: { name: string; path: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Unused for now, kept so the address block has one source. */
export const fullServiceAddress = () => formatAddress(serviceBranch);
