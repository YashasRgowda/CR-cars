import type { Metadata } from 'next';
import { SERVICING } from '@/lib/services';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Car Service & Repair in Bommasandra',
  description:
    'General service, engine work, AC, brakes, suspension, denting and painting, electrical and more. All makes and models. Price told before work starts.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <ServicePage
      group={SERVICING}
      gallery={[
        { src: '/images/service/bay-bright.jpg', alt: 'A technician working on an engine in a bright workshop' },
        { src: '/images/service/suspension-work.jpg', alt: 'Suspension and brake work on a raised car' },
        { src: '/images/service/bay-red-car.jpg', alt: 'A car on a workshop lift above a second car' },
        { src: '/images/service/hands-engine.jpg', alt: 'Close-up of hands working on an engine' },
        { src: '/images/service/tools.jpg', alt: 'A tray of spanners and sockets on a workbench' },
        { src: '/images/service/lift-wide.jpg', alt: 'A car raised on a workshop lift' },
      ]}
    />
  );
}
