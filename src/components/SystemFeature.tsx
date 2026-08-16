import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import type { System } from '@/data/systems';
import BrowserFrame from './BrowserFrame';

interface SystemFeatureProps {
  system: System & { screenshot: StaticImageData };
  index: number;
}

/** Editorial treatment for the systems that have a real screenshot to show — never a
 *  fake-dashboard mockup. Explicitly labeled PERSONAL SYSTEM so it never reads as client work. */
export default function SystemFeature({ system, index }: SystemFeatureProps) {
  const indexLabel = String(index).padStart(2, '0');

  return (
    <a href={`/systems/${system.slug}`} className="group flex flex-col gap-5" data-reveal data-reveal-type="fade-up">
      <BrowserFrame label={system.routeLabel}>
        <Image
          src={system.screenshot}
          alt={`${system.name} screenshot`}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{ background: 'var(--paper-050)' }}
        />
      </BrowserFrame>
      <div className="flex flex-col gap-3">
        <span className="meta-index" style={{ color: 'var(--accent)' }}>
          PERSONAL SYSTEM / {indexLabel}
        </span>
        <h3 className="text-xl transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
          {system.name}
        </h3>
        <p className="meta-index" style={{ color: 'var(--ink-400)' }}>
          {system.techDirection}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
          {system.problem}
        </p>
      </div>
    </a>
  );
}
