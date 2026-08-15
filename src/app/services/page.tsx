import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import SystemPreview from '@/components/SystemPreview';
import { siteConfig } from '@/config/site';
import { wordpressServices } from '@/data/services';
import { getProjectBySlug } from '@/data/projects';
import { getSystemBySlug } from '@/data/systems';
import { TOOLS } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Web Development & Technical Solutions — ${siteConfig.name}`,
  description:
    'WordPress websites, dynamic content, web systems, browser tools, and hosting/DNS/launch support — the full scope of what I build and maintain.',
  canonical: `${siteConfig.url}/services`,
});

const whyWorkWithMe = [
  'Comfortable working inside existing websites, not just building from scratch',
  'Can follow an existing design system instead of imposing my own',
  'Strong responsive troubleshooting across real devices and browsers',
  'Experience with dynamic content: ACF, JetEngine, custom post types',
  'Collaborates well with agencies, designers, and other developers',
  'Does not unnecessarily rebuild systems that are already working',
  'Uses AI tools to move faster — every change is still human-reviewed',
];

function WebsiteVisual({ slug }: { slug?: string }) {
  const project = slug ? getProjectBySlug(slug) : undefined;
  if (!project) return <ChecklistVisual items={['Homepage', 'Services', 'Contact']} />;
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-sm)] border" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
      <Image src={project.image} alt={`${project.name} website preview`} width={480} height={360} className="h-full w-full object-cover" />
    </div>
  );
}

function ContentModelVisual() {
  const chips = ['Post Type: Location', 'Taxonomy: Region', 'Field: Adoption Status', 'Listing: Filterable'];
  return (
    <div className="flex aspect-[4/3] flex-col justify-center gap-2 rounded-[var(--radius-sm)] border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
      {chips.map((chip) => (
        <span key={chip} className="rounded-lg border px-3 py-2 font-mono text-[10px]" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', color: 'var(--text-secondary)' }}>
          {chip}
        </span>
      ))}
    </div>
  );
}

function ToolVisual() {
  return (
    <div className="grid aspect-[4/3] grid-cols-2 gap-2 rounded-[var(--radius-sm)] border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
      {['image-toolkit', 'qr-code-generator', 'developer-data-toolkit', 'css-visual-generator']
        .map((id) => TOOLS.find((t) => t.id === id))
        .filter((tool): tool is (typeof TOOLS)[number] => !!tool)
        .map((tool) => (
        <div key={tool.id} className="flex flex-col items-center justify-center gap-1 rounded-lg border" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
          <span className="h-2 w-2 rounded-full" style={{ background: tool.accent }} />
          <span className="text-center text-[8px] font-bold leading-tight" style={{ color: 'var(--text-secondary)' }}>
            {tool.title}
          </span>
        </div>
      ))}
    </div>
  );
}

function ConnectionFlowVisual() {
  const nodes = ['Domain', 'DNS Records', 'Hosting', 'Website Live'];
  return (
    <div className="flex aspect-[4/3] flex-col justify-center gap-2 rounded-[var(--radius-sm)] border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
      {nodes.map((node, i) => (
        <div key={node} className="flex items-center gap-2">
          <span
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold"
            style={{ background: i === nodes.length - 1 ? 'var(--color-success)' : 'var(--brand-lavender)', color: i === nodes.length - 1 ? '#fff' : 'var(--brand-primary)' }}
          >
            {i + 1}
          </span>
          <span className="rounded-lg border px-2.5 py-1.5 text-[10px] font-medium" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', color: 'var(--text-primary)' }}>
            {node}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChecklistVisual({ items }: { items?: string[] }) {
  const list = items ?? ['Updates applied', 'Performance checked', 'Backups verified'];
  return (
    <div className="flex aspect-[4/3] flex-col justify-center gap-2.5 rounded-[var(--radius-sm)] border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
      {list.map((item) => (
        <div key={item} className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 rounded-full" style={{ color: 'var(--color-success)', background: 'var(--color-success-soft)' }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {item}
        </div>
      ))}
    </div>
  );
}

function DashboardVisual({ slug }: { slug?: string }) {
  const system = slug ? getSystemBySlug(slug) : undefined;
  return <SystemPreview routeLabel={system?.routeLabel ?? 'app.system/overview'} activeNav={1} />;
}

export default function ServicesPage() {
  return (
    <>
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-14" style={{ background: 'var(--surface-warm)' }}>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="Web Development and Technical Solutions"
            description="WordPress websites, dynamic content, web systems, browser tools, and the hosting, domain, and DNS setup behind them."
          />
        </Container>
      </section>

      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-col gap-10">
          {wordpressServices.map((service, i) => {
            const project = service.relatedProjectSlug ? getProjectBySlug(service.relatedProjectSlug) : undefined;
            const system = service.relatedSystemSlug ? getSystemBySlug(service.relatedSystemSlug) : undefined;

            return (
              <div key={service.title} className="grid grid-cols-1 gap-6 border-t pt-8 lg:grid-cols-12 lg:gap-8" style={{ borderColor: 'var(--border-color)' }} data-reveal>
                <div className="lg:col-span-3">
                  {service.visual === 'website' && <WebsiteVisual slug={service.relatedProjectSlug} />}
                  {service.visual === 'content-model' && <ContentModelVisual />}
                  {service.visual === 'dashboard' && <DashboardVisual slug={service.relatedSystemSlug} />}
                  {service.visual === 'tool' && <ToolVisual />}
                  {service.visual === 'connection-flow' && <ConnectionFlowVisual />}
                  {service.visual === 'checklist' && <ChecklistVisual />}
                </div>

                <div className="flex items-start gap-4 lg:col-span-4">
                  <span className="font-mono text-sm" style={{ color: 'var(--brand-primary)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl">{service.title}</h2>
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {service.outcome}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-5">
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                      Who it helps:
                    </span>{' '}
                    {service.whoFor}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {service.deliverables.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-3 py-1.5 text-xs font-medium" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-primary)' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span className="font-bold uppercase tracking-wide">Technology:</span> {service.technology}
                    </p>
                    {project && (
                      <a href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: 'var(--brand-primary)' }}>
                        Related project: {project.name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}
                    {system && (
                      <a href={`/personal-projects/${system.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: 'var(--brand-primary)' }}>
                        Related system: {system.name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Why work with me */}
      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Why Work With Me" title="A developer who fits into how you already work" description="Truthful differentiators, not sales language." />
          <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {whyWorkWithMe.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-[var(--radius-md)] border p-5" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', boxShadow: 'var(--shadow-sm)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col items-start gap-5 border-t pt-10" style={{ borderColor: 'var(--border-color)' }}>
          <span className="eyebrow">Beyond Client Work</span>
          <p className="max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            I also build{' '}
            <a href="/personal-projects" className="underline" style={{ color: 'var(--brand-primary)' }}>
              Personal Projects
            </a>{' '}
            and{' '}
            <a href="/tools" className="underline" style={{ color: 'var(--brand-primary)' }}>
              Tools
            </a>{' '}
            outside client projects.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/personal-projects" variant="secondary">
              Personal Projects
            </Button>
            <Button href="/tools" variant="secondary">
              Tools
            </Button>
          </div>
        </Container>
      </section>

      <section className="dark-grid-bg py-16 sm:py-20" style={{ background: 'var(--ink-canvas)' }}>
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Not sure which one you need?"
            title="Let's talk about your project"
            description="Tell me what you're building and I'll point you in the right direction — no pressure, no obligation."
            dark
          />
          <Button href="/contact" variant="primary" size="large" tone="dark">
            Start a Project
          </Button>
        </Container>
      </section>
    </>
  );
}
