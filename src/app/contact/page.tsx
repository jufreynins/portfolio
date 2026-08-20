import type { Metadata } from 'next';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Contact — ${siteConfig.name}`,
  description: 'Get in touch about a remote WordPress development role, WordPress support position, website management opportunity, or a technical web project.',
  canonical: `${siteConfig.url}/contact`,
});

const trustIndicators = ['Replies within one business day', 'Open to remote WordPress roles and contract work', 'Remote collaboration', 'Clear, honest next steps'];

const nextSteps = [
  {
    title: 'Send a Message',
    description: 'Fill out the form with a bit about the role or project, and how I can help.',
  },
  {
    title: 'Review',
    description: 'I review the details and get back to you with any follow-up questions.',
  },
  {
    title: 'Next Step',
    description: "You'll get a clear response — whether that's a call, a resume request, or a project scope.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="dark-grid-bg pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--ink-canvas)' }}>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <SectionHeading
              as="h1"
              eyebrow="Contact"
              title="Let's connect."
              description="I'm currently open to remote WordPress development, WordPress support, website management, and technical web opportunities. I'm also open to selected development collaborations."
              titleClass="max-w-none"
              dark
            />
            <Reveal className="flex flex-col gap-4">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition-colors" style={{ color: 'rgba(247,245,242,0.85)' }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border" style={{ borderColor: 'rgba(247,245,242,0.2)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 6 10-6" />
                  </svg>
                </span>
                {siteConfig.email}
              </a>
              <a href={siteConfig.cvPath} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors" style={{ color: 'rgba(247,245,242,0.85)' }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border" style={{ borderColor: 'rgba(247,245,242,0.2)' }}>
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
              <ul className="flex flex-col gap-2.5 border-t pt-6" style={{ borderColor: 'rgba(247,245,242,0.15)' }}>
                {trustIndicators.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(247,245,242,0.75)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ color: 'var(--accent)' }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="reveal rounded-[var(--radius-md)] p-6 sm:p-8" style={{ background: 'var(--paper-000)' }} data-reveal>
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* What Happens Next */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="What Happens Next" title="A simple, no-pressure process" description="Here's what happens after you send a message." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3" data-reveal data-reveal-type="stagger">
            {nextSteps.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-3">
                <span className="font-mono text-sm" style={{ color: 'var(--line-strong)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg" style={{ color: 'var(--ink-950)' }}>
                  {step.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--ink-700)' }}>
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
