import type { Metadata, Viewport } from 'next';
import { siteUrl } from '@/lib/site';
import { BUSINESS } from '@/lib/business';
import './globals.css';

const title = 'CR Cars — Car Service, Modification & Car Wash in Bommasandra, Bengaluru';
const description =
  'Full car service, all types of modification, and a separate car wash centre in Bommasandra, Bengaluru. All makes and models. Price told before work starts. Call 070228 46611.';

export const metadata: Metadata = {
  /* Absolute URLs for OG images and canonicals. Vercel supplies VERCEL_URL
     per deployment; set NEXT_PUBLIC_SITE_URL once the domain is live. */
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    /* Interior pages set only their own title; this frames it. */
    template: `%s — ${BUSINESS.name}`,
  },
  description,
  applicationName: BUSINESS.name,
  keywords: [
    'car service Bommasandra',
    'car service Electronic City',
    'car modification Bengaluru',
    'car wash Bommasandra',
    'car repair near me Bangalore',
    'denting painting Bommasandra',
    'car accessories Bengaluru',
    'CR Cars',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_IN',
    siteName: BUSINESS.name,
    images: [
      { url: '/images/hero/workshop-hero.jpg', width: 1200, height: 630, alt: title },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/hero/workshop-hero.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  /* Matches the page ground, so a phone's address bar blends into the top
     of the site instead of capping it with a bar of another colour. */
  themeColor: '#faf8f3',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
