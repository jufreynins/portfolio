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

const process = [
  {
    title: 'Discover',
    description: 'Understand the business, the existing site if there is one, and what the project actually needs before writing anything.',
  },
  {
    title: 'Plan',
    description: 'Scope the build or fix, choose the right tools — Elementor Pro, ACF, JetEngine — and set a clear timeline.',
  },
  {
    title: 'Build',
    description: 'Develop, test, and refine. Clean implementation, responsive by default, reviewed before it ships.',
  },
  {
    title: 'Support',
    description: 'Stay available after launch for updates, fixes, hosting, and anything else the site needs to keep running.',
  },
];

const aboutPillars = [
  { title: 'WordPress-first', description: 'Specialized, not spread thin across every framework.' },
  { title: 'Full website support', description: 'Hosting, DNS, and troubleshooting — not just builds.' },
  { title: 'Direct communication', description: 'Clear updates and honest timelines, start to finish.' },
];

const toolGroups = [
  {
    title: 'WordPress',
    description: 'Page building and dynamic content.',
    items: ['WordPress', 'Elementor Pro', 'Bricks', 'WPBakery', 'Divi', 'ACF Pro', 'JetEngine', 'Gutenberg', 'WooCommerce'],
  },
  {
    title: 'Development',
    description: 'Core languages behind every build.',
    items: ['PHP', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'MySQL'],
  },
  {
    title: 'Hosting & Operations',
    description: "Where sites run and how they're managed.",
    items: ['Cloudways', 'Hostinger', 'cPanel', 'WHM', 'Cloudflare'],
  },
  {
    title: 'Workflow',
    description: 'Day-to-day development workflow.',
    items: ['GitHub', 'Claude Code', 'ChatGPT', 'Cursor'],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section id="home" className="grid-overlay relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20" style={{ background: 'var(--paper-000)' }} data-hero-section>
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" data-hero-bg>
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: 'var(--accent)', opacity: 0.12 }} />
          <div className="absolute top-1/3 -left-20 h-64 w-64 rounded-full blur-3xl" style={{ background: 'var(--accent-2)', opacity: 0.1 }} />
        </div>

        <Container>
          <div className="flex max-w-2xl flex-col items-start gap-5" data-hero-content>
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
      <section className="py-16 sm:py-20 lg:py-28" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            title="WordPress development and complete website support."
            description="From building responsive WordPress websites to resolving technical issues and managing the infrastructure behind them, I support the complete website lifecycle."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
              <SkillCard key={item.title} icon={item.icon} title={item.title} description={item.description} items={item.items} />
            ))}
          </div>
        </Container>
      </section>

      {/* How I Work */}
      <section className="py-16 sm:py-20 lg:py-28" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading title="How I work." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-2" data-reveal>
                <span className="font-mono text-sm" style={{ color: 'var(--accent)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base" style={{ color: 'var(--ink-950)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tools & Platforms */}
      <section className="py-16 sm:py-20 lg:py-28" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading title="Tools I work with." />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {toolGroups.map((group) => (
              <SkillCard key={group.title} title={group.title} description={group.description} items={group.items} />
            ))}
          </div>
        </Container>
      </section>

      {/* Short About */}
      <section id="about" className="py-16 sm:py-20 lg:py-28" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading title="A developer who handles more than the build." />
          <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--ink-700)' }} data-reveal>
            I&apos;m {siteConfig.name}, a WordPress developer with {yearsExperience}+ years of experience working with agencies and businesses across the United States, Canada, and the Philippines.
            Beyond page building, I handle the technical work required to keep websites stable, secure, updated, and ready for production.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3" data-reveal data-reveal-type="stagger">
            {aboutPillars.map((pillar) => (
              <div key={pillar.title} className="flex flex-col gap-1.5 border-l-2 pl-4" style={{ borderColor: 'var(--accent)' }}>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--ink-950)' }}>
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
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
