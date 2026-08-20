import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
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
    description: 'Custom WordPress builds, Elementor Pro, Gutenberg, responsive layouts, frontend customization, ACF, JetEngine, and WooCommerce.',
  },
  {
    icon: icons.settings,
    title: 'Website Management',
    description: 'Content updates, plugin and theme maintenance, backups, monitoring, production support, and ongoing website improvements.',
  },
  {
    icon: icons.alert,
    title: 'Troubleshooting & Support',
    description: 'Plugin conflicts, PHP errors, broken layouts, form issues, frontend bugs, WP_DEBUG, error logs, FTP, and cPanel fixes.',
  },
  {
    icon: icons.server,
    title: 'Hosting, Deployment & Migrations',
    description: 'Cloudways, Hostinger, GoDaddy, WHM/cPanel, staging environments, backups, WordPress migrations, and production deployment.',
  },
  {
    icon: icons.globe,
    title: 'Domains, DNS, SSL & Email',
    description: 'Nameservers, A, CNAME, MX and TXT records, subdomain connections, SSL, SPF, DKIM, DMARC, and email-delivery troubleshooting.',
  },
  {
    icon: icons.trending,
    title: 'Performance & Technical SEO',
    description: 'Caching, image optimization, redirects, Core Web Vitals improvements, GA4, Google Search Console, and technical SEO fundamentals.',
  },
];

const toolGroups = [
  {
    label: 'WordPress',
    items: ['WordPress', 'Elementor Pro', 'ACF Pro', 'JetEngine', 'Gutenberg', 'WooCommerce'],
  },
  {
    label: 'Development',
    items: ['PHP', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'MySQL'],
  },
  {
    label: 'Hosting & Operations',
    items: ['Cloudways', 'Hostinger', 'cPanel', 'WHM', 'Cloudflare'],
  },
  {
    label: 'Workflow',
    items: ['GitHub', 'Claude Code', 'ChatGPT', 'Cursor'],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section id="home" className="grid-overlay relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14" style={{ background: 'var(--paper-000)' }} data-hero-section>
        <div className="pointer-events-none absolute inset-0 -z-10" data-hero-bg />

        <Container>
          <div className="flex max-w-2xl flex-col items-start gap-5" data-hero-content>
            <span className="eyebrow" data-hero-eyebrow>
              WordPress Developer &amp; Website Technical Specialist
            </span>

            <h1 className="text-balance">
              <span className="block overflow-hidden">
                <span className="block" data-hero-line>
                  I build and support WordPress websites that businesses can rely on.
                </span>
              </span>
            </h1>

            <p className="leading-relaxed" style={{ color: 'var(--ink-700)', fontSize: 'var(--text-lead)' }} data-hero-support>
              I help agencies and businesses build, manage, troubleshoot, and maintain production WordPress websites—including hosting, domains, DNS, migrations, performance, and ongoing technical
              support.
            </p>

            <p className="meta-index" style={{ color: 'var(--accent)' }} data-hero-support>
              {yearsExperience}+ Years of Web Development Experience
            </p>

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
        </Container>
      </section>

      {/* Core Expertise */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="What I Do"
            title="WordPress development and complete website support."
            description="From building responsive WordPress websites to resolving technical issues and managing the infrastructure behind them, I support the complete website lifecycle."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
              <div key={item.title} className="card-surface flex h-full flex-col gap-3 p-5" style={{ background: 'var(--paper-000)' }} data-reveal>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)', borderColor: 'var(--line)' }}
                >
                  {item.icon}
                </span>
                <h3 className="text-base" style={{ color: 'var(--ink-950)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tools & Platforms */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Stack" title="Tools I work with." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {toolGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-3" data-reveal>
                <span className="eyebrow" style={{ color: 'var(--ink-400)' }}>
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="meta-index rounded-full border px-2.5 py-1 normal-case"
                      style={{ borderColor: 'var(--line)', color: 'var(--ink-700)' }}
                    >
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
      <section id="about" className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-5">
          <SectionHeading eyebrow="About" title="A developer who handles more than the build." />
          <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--ink-700)' }} data-reveal>
            I&apos;m {siteConfig.name}, a WordPress developer with {yearsExperience}+ years of experience working with agencies and businesses across the United States, Canada, and the Philippines.
            Beyond page building, I handle the technical work required to keep websites stable, secure, updated, and ready for production.
          </p>
          <div data-reveal>
            <Button href="/about" variant="secondary">
              More About Me
            </Button>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <ContactCTA
        title="Need help with a WordPress website?"
        description="I'm open to remote WordPress development, website management, technical support, and long-term agency opportunities."
        primaryLabel="Contact Me"
        primaryHref="/contact"
        secondaryLabel="Download CV"
        secondaryHref={siteConfig.cvPath}
        secondaryExternal
      />
    </>
  );
}
