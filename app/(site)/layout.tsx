import { siteUrl } from '@/lib/site';
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactDock from '@/components/ContactDock';
import ScrollProgress from '@/components/ScrollProgress';

/**
 * Chrome for every public page.
 *
 * One AutoRepair block for the whole site, emitted here rather than per
 * page — a business whose customers all arrive via local search should
 * describe itself once, consistently, on every URL.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper-100">
      <LocalBusinessJsonLd siteUrl={siteUrl} />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ContactDock />
    </div>
  );
}
