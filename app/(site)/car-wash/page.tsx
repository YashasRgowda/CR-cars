import type { Metadata } from 'next';
import { WASH } from '@/lib/services';
import ServicePage from '@/components/ServicePage';
import { formatAddress, washBranch } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Car Wash & Detailing in Bommasandra',
  description:
    'Foam wash, underbody wash, interior cleaning, polishing, ceramic and teflon coating. On Thirupalya Main Road, a minute from our service centre.',
  alternates: { canonical: '/car-wash' },
};

export default function CarWashPage() {
  return (
    <ServicePage
      group={WASH}
      note={{
        title: 'Where the wash centre is',
        body: `${formatAddress(washBranch)}. It is a separate branch, a minute down the road from the service centre — or drop your car at the service centre and we will take it across.`,
      }}
      gallery={[
        { src: '/images/wash/foam-rear.jpg', alt: 'Foam being rinsed from the rear of a dark car' },
        { src: '/images/wash/wheel-brush.jpg', alt: 'A red alloy wheel being cleaned with a brush' },
        { src: '/images/wash/polishing.jpg', alt: 'A machine polisher being used on bodywork' },
        { src: '/images/wash/foam-wheel.jpg', alt: 'Foam covering the wheel and flank of a dark car' },
        { src: '/images/wash/interior-clean.jpg', alt: 'The inside of a car being cleaned' },
        { src: '/images/wash/coating.jpg', alt: 'Paint correction work around a masked headlight' },
      ]}
    />
  );
}
