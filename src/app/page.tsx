import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import SkillCard from '@/components/SkillCard';
import ContactCTA from '@/components/ContactCTA';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | WordPress Developer & Website Technical Specialist`,
  description: siteConfig.description,
  canonical: siteConfig.url,
});

const { yearsExperience } = siteConfig;

const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const icons = {
  code: (
    <svg {...iconProps}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  settings: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5v2M12 17v2M5 12h2M17 12h2M7.05 7.05l1.41 1.41M15.54 15.54l1.41 1.41M16.95 7.05l-1.41 1.41M8.46 15.54l-1.41 1.41" />
    </svg>
  ),
  alert: (
    <svg {...iconProps}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  server: (
    <svg {...iconProps}>
      <rect x="2" y="3" width="20" height="7" rx="1.5" />
      <rect x="2" y="14" width="20" height="7" rx="1.5" />
      <line x1="6" y1="6.5" x2="6.01" y2="6.5" />
      <line x1="6" y1="17.5" x2="6.01" y2="17.5" />
    </svg>
  ),
  globe: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" />
    </svg>
  ),
  trending: (
    <svg {...iconProps}>
      <polyline points="3 17 9 11 13 15 21 6" />
      <polyline points="15 6 21 6 21 12" />
    </svg>
  ),
} satisfies Record<string, ReactNode>;

const expertise = [
  {
    icon: icons.code,
    title: 'WordPress Development',
    description: 'Custom builds and responsive frontend development.',
    items: ['Elementor Pro & Gutenberg', 'ACF & JetEngine', 'WooCommerce', 'Frontend customization'],
  },
  {
    icon: icons.settings,
    title: 'Website Management',
    description: 'Ongoing maintenance and production support.',
    items: ['Content updates', 'Plugin & theme maintenance', 'Backups & monitoring', 'Ongoing improvements'],
  },
  {
    icon: icons.alert,
    title: 'Troubleshooting & Support',
    description: 'Diagnosing and fixing production issues fast.',
    items: ['Plugin conflicts', 'PHP & frontend errors', 'Form issues', 'WP_DEBUG & error logs', 'FTP / cPanel fixes'],
  },
  {
    icon: icons.server,
    title: 'Hosting, Deployment & Migrations',
    description: 'Getting sites hosted, staged, and deployed correctly.',
    items: ['Cloudways, Hostinger, GoDaddy', 'WHM & cPanel', 'Staging environments', 'WordPress migrations'],
  },
  {
    icon: icons.globe,
    title: 'Domains, DNS, SSL & Email',
    description: 'Domain, DNS, and email configuration.',
    items: ['Nameservers & DNS records', 'Subdomain connections', 'SSL setup', 'SPF, DKIM & DMARC'],
  },
  {
    icon: icons.trending,
    title: 'Performance & Technical SEO',
    description: 'Faster sites and stronger technical SEO.',
    items: ['Caching & image optimization', 'Core Web Vitals', 'Redirects', 'GA4 & Search Console'],
  },
];

const capabilityStrip = ['WordPress Development', 'Website Management', 'Hosting & Deployment', 'DNS & SSL', 'Troubleshooting', 'Performance'];

const toolGroups = [
  {
    title: 'WordPress',
    items: ['WordPress', 'Elementor Pro', 'Bricks', 'WPBakery', 'Divi', 'ACF Pro', 'JetEngine', 'Gutenberg', 'WooCommerce'],
  },
  {
    title: 'Development',
    items: ['PHP', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'MySQL'],
  },
  {
    title: 'Hosting & Operations',
    items: ['Cloudways', 'Hostinger', 'Cloudflare', 'cPanel', 'WHM'],
  },
  {
    title: 'Workflow',
    items: ['GitHub', 'Claude Code', 'ChatGPT', 'Cursor'],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section id="home" className="grid-overlay relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20" style={{ background: 'var(--paper-000)' }} data-hero-section>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10" data-hero-content>
            <div className="flex flex-col items-start gap-5 lg:col-span-7">
              <span className="eyebrow" data-hero-eyebrow>
                WordPress Developer &amp; Website Technical Specialist
              </span>

              <h1 className="max-w-2xl text-balance">
                <span className="block overflow-hidden">
                  <span className="block" data-hero-line>
                    I build and support <span className="text-gradient-accent">WordPress websites</span> businesses can rely on.
                  </span>
                </span>
              </h1>

              <p className="max-w-lg leading-relaxed" style={{ color: 'var(--ink-700)', fontSize: 'var(--text-lead)' }} data-hero-support>
                I help agencies and businesses build, manage, troubleshoot, and maintain production WordPress websites—from custom development and ongoing updates to hosting, domains, DNS,
                migrations, and technical support.
              </p>

              <div className="flex flex-col gap-2" data-hero-support>
                <span className="meta-index" style={{ color: 'var(--accent)' }}>
                  {yearsExperience}+ Years of Web Development Experience
                </span>
                <span className="meta-index flex items-center gap-2" style={{ color: 'var(--ink-400)' }}>
                  <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  Open to remote WordPress opportunities
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-x-7 gap-y-4" data-hero-support>
                <Button href="/services" variant="primary" size="large">
                  View My Expertise
                </Button>
                <Button href="/contact" variant="secondary">
                  Contact Me
                </Button>
                <Button href={siteConfig.cvPath} variant="ghost" target="_blank" rel="noopener noreferrer">
                  Download CV
                </Button>
              </div>
            </div>

            {/* Placeholder hero visual — swap for public/images/home/hero-web-operations.png
                (next/image, object-contain) once that asset is provided. */}
            <div className="lg:col-span-5" data-hero-support>
              <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-xs lg:max-w-none">
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl" style={{ background: 'var(--accent)', opacity: 0.14 }} />
                <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-[var(--radius-xl)]" style={{ background: 'var(--paper-050)', border: '1px solid var(--line)' }}>
                  <span
                    className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-lg)] font-mono text-xl font-semibold sm:h-24 sm:w-24 sm:text-2xl"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                  >
                    {siteConfig.initials}
                  </span>
                  <div className="flex flex-col items-center gap-2">
                    <span className="h-1.5 w-28 rounded-full sm:w-32" style={{ background: 'var(--line)' }} />
                    <span className="h-1.5 w-20 rounded-full sm:w-24" style={{ background: 'var(--line)' }} />
                    <span className="h-1.5 w-16 rounded-full sm:w-20" style={{ background: 'var(--accent-soft)' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Expertise */}
      <section className="py-16 sm:py-20 lg:py-28" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Core Expertise"
            title="Complete WordPress development and website support."
            description="I handle both the website build and the technical work required to keep it stable, updated, and ready for production."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
              <SkillCard key={item.title} icon={item.icon} title={item.title} description={item.description} items={item.items} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-6" style={{ borderColor: 'var(--line)' }} data-reveal>
            {capabilityStrip.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                <span className="text-sm font-medium" style={{ color: 'var(--ink-700)' }}>
                  {item}
                </span>
                {i < capabilityStrip.length - 1 && (
                  <span className="inline-flex h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--line-strong)' }} />
                )}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Tools & Technology */}
      <section className="py-16 sm:py-20 lg:py-28" style={{ background: 'var(--paper-000)' }}>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <span className="eyebrow">Stack</span>
            <h2 className="mt-3 max-w-sm">Tools and technologies.</h2>
            <p className="mt-4 max-w-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              WordPress is my primary focus — these are the supporting development and infrastructure tools I use alongside it.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {toolGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-2.5" data-reveal>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--ink-950)' }}>
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((tool) => (
                    <span key={tool} className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: 'var(--line)', color: 'var(--ink-700)' }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Short About */}
      <section id="about" className="py-16 sm:py-20 lg:py-28" style={{ background: 'var(--paper-050)' }}>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5" data-reveal data-reveal-type="fade-up">
            <div
              className="relative mx-auto flex aspect-square max-w-[240px] items-center justify-center rounded-[var(--radius-xl)] lg:max-w-none"
              style={{ background: 'var(--paper-000)', border: '1px solid var(--line)' }}
            >
              <span
                className="flex h-24 w-24 items-center justify-center rounded-full font-mono text-2xl font-semibold"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
              >
                {siteConfig.initials}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-7" data-reveal data-reveal-type="fade-up">
            <SectionHeading eyebrow="About Me" title="More than a WordPress page builder." />
            <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              I&apos;m {siteConfig.name}, a WordPress developer with {yearsExperience}+ years of experience working with agencies and businesses across the United States, Canada, and the Philippines.
              I handle development, website management, hosting, domains, DNS, migrations, and production troubleshooting.
            </p>
            <div>
              <Button href="/about" variant="secondary">
                More About Me
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <ContactCTA
        title="Need reliable WordPress support?"
        description="I'm available for WordPress development, website management, technical support, and long-term remote opportunities."
        primaryLabel="Contact Me"
        primaryHref="/contact"
        secondaryLabel="Download CV"
        secondaryHref={siteConfig.cvPath}
        secondaryExternal
      />
    </>
  );
}
