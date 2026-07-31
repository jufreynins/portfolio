import type { Metadata } from 'next';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Start a Project | ${siteConfig.name}`,
  description: 'Discuss a new WordPress website, web system, browser tool, or technical support need — hosting, migrations, domain and DNS, or business email delivery.',
  canonical: `${siteConfig.url}/contact`,
});

const trustIndicators = ['Replies within one business day', 'Available for project-based and agency support', 'Remote collaboration', 'Clear scope and next-step recommendations'];

const nextSteps = [
  {
    title: 'Send Your Requirements',
    description: 'Fill out the project form with what you need, your goals, and any existing website or system involved.',
  },
  {
    title: 'Project Review',
    description: 'I review the details and assess scope, feasibility, and the right approach for your situation.',
  },
  {
    title: 'Next-Step Recommendation',
    description: "You'll get a clear, honest recommendation for the most practical next step — no pressure, no obligation.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="dark-grid-bg pt-24 pb-12 sm:pt-28 sm:pb-16" style={{ background: 'var(--brand-dark)' }}>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <SectionHeading
              as="h1"
              eyebrow="Contact"
              title="Need a Website, Web System, or Technical Web Support?"
              description="Tell me whether you need a new website, a web system, a browser tool, or technical support — hosting, migrations, domain and DNS, or business email delivery."
              titleClass="max-w-none"
              dark
            />
            <Reveal className="flex flex-col gap-4">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition-colors" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 6 10-6" />
                  </svg>
                </span>
                {siteConfig.email}
              </a>
              <a href={siteConfig.cvPath} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </span>
                Download CV
              </a>
            </Reveal>
            <Reveal>
              <ul className="flex flex-col gap-2.5 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                {trustIndicators.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ color: 'var(--brand-lavender)' }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="reveal rounded-3xl p-6 sm:p-8" style={{ background: 'var(--surface-white)' }} data-reveal>
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* What Happens Next */}
      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="What Happens Next" title="A simple, no-pressure process" description="Here's what happens after you send your project details." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3" data-reveal data-reveal-type="stagger">
            {nextSteps.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm font-bold" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  {step.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
