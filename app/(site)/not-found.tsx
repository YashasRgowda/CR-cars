import Link from 'next/link';
import { CallButton } from '@/components/ui/buttons';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 pt-[72px]">
      <div className="max-w-md text-center">
        <span className="text-[11px] font-500 uppercase tracking-eyebrow text-brass-ink">
          404
        </span>
        <h1 className="mt-4 font-display text-display-sm text-ink-900">
          Page not found
          <span className="text-brass">.</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          That page does not exist. Go back home, or just call us.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <CallButton />
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-line-strong px-7 py-3.5 text-sm font-500 text-ink-900 transition-colors hover:border-ink-900"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
