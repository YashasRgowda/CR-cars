import type { Metadata } from 'next';
import { MODIFICATION } from '@/lib/services';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Car Modification in Bengaluru',
  description:
    'Body wraps, paint protection film, body kits, alloy wheels, lighting, custom interiors, music systems and suspension. All types of car modification.',
  alternates: { canonical: '/modification' },
};

export default function ModificationPage() {
  return (
    <ServicePage
      group={MODIFICATION}
      gallery={[
        { src: '/images/modification/thar-modified.jpg', alt: 'A modified Mahindra Thar on a road' },
        { src: '/images/modification/alloy-caliper.jpg', alt: 'An alloy wheel with a yellow brake caliper behind it' },
        { src: '/images/modification/interior-red.jpg', alt: 'A cabin trimmed in red diamond-stitched leather' },
        { src: '/images/modification/wrap-applying.jpg', alt: 'Orange vinyl wrap being smoothed onto a wing' },
        { src: '/images/modification/headlight.jpg', alt: 'A headlight with a bright LED ring' },
        { src: '/images/modification/ppf-headlight.jpg', alt: 'Protective film being fitted around a headlight' },
      ]}
    />
  );
}
