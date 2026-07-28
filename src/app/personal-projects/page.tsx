import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import SystemPreview from '@/components/SystemPreview';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Personal Projects — ${siteConfig.name}`,
  description: 'Personal web system concepts — clearly labeled experiments outside client work, not existing production systems.',
  canonical: `${siteConfig.url}/personal-projects`,
});

interface ConceptSystem {
  name: string;
  category: string;
  problem: string;
  modules: string[];
  techDirection: string;
  routeLabel: string;
}

const conceptSystems: ConceptSystem[] = [
  {
    name: 'Task Management System',
    category: 'Business Productivity',
    problem: 'Tasks get lost across email, chat, and spreadsheets, making it hard to see what is actually in progress.',
    modules: ['Task assignment & due dates', 'Status tracking', 'Team member views', 'Activity history', 'Priority tagging'],
    techDirection: 'TypeScript, structured data model, role-based views',
    routeLabel: 'app.system/tasks/board',
  },
  {
    name: 'Retail & Inventory Management System',
    category: 'Operations & Inventory',
    problem: 'Manually tracking inventory in spreadsheets leads to overselling, stockouts, and inaccurate product counts.',
    modules: ['Stock level tracking', 'Low-stock alerts', 'Product catalog', 'Order history', 'Basic reporting'],
    techDirection: 'TypeScript, structured data model, dashboard UI',
    routeLabel: 'app.system/inventory/products',
  },
  {
    name: 'Dental Clinic Management System',
    category: 'Healthcare Practice',
    problem: 'Paper-based or disconnected scheduling makes it hard to track appointments, patient history, and daily clinic capacity.',
    modules: ['Appointment scheduling', 'Patient records', 'Treatment history', 'Staff calendar', 'Automated reminders'],
    techDirection: 'TypeScript, calendar/scheduling UI, structured records',
    routeLabel: 'app.system/clinic/schedule',
  },
  {
    name: 'Business Admin Dashboard',
    category: 'Internal Admin',
    problem: 'Important business information is scattered across separate tools, making it hard to get a clear, current picture.',
    modules: ['Data overview widgets', 'User & role management', 'Activity logs', 'Searchable records', 'Reporting views'],
    techDirection: 'TypeScript, dashboard UI, role-based access',
    routeLabel: 'app.system/admin/overview',
  },
  {
    name: 'Attendance Monitoring System',
    category: 'Workforce Management',
    problem: 'Manual time sheets or paper logs make it hard to verify attendance, calculate accurate hours, and catch patterns like tardiness or absenteeism.',
    modules: ['Clock in/out tracking', 'Attendance reports', 'Leave & absence logs', 'Late/undertime alerts', 'Employee schedules'],
    techDirection: 'TypeScript, structured data model, dashboard UI',
    routeLabel: 'app.system/attendance/log',
  },
];

export default function PersonalProjectsPage() {
  return (
    <>
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-14" style={{ background: 'var(--surface-warm)' }}>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Personal Projects"
            title="Personal system concepts, outside client work."
            description="Concept designs for internal tools — not existing client or production systems."
          />
        </Container>
      </section>

      <section className="py-14 sm:py-16" style={{ background: 'var(--surface-white)' }}>
        <Container className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {conceptSystems.map((system, i) => (
            <div key={system.name} className="concept-card flex flex-col gap-4 rounded-2xl border p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)', boxShadow: 'var(--shadow-sm)' }} data-reveal>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="eyebrow">{system.category}</span>
                  <h3 className="text-xl">{system.name}</h3>
                </div>
                <span
                  className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'var(--surface-white)' }}
                >
                  Personal Concept
                </span>
              </div>

              <SystemPreview routeLabel={system.routeLabel} activeNav={i % 4} />

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {system.problem}
              </p>

              <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                {system.modules.map((feature) => (
                  <li key={feature} className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-primary)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-bold uppercase tracking-wide">Tech direction:</span> {system.techDirection}
              </p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-14 sm:py-16" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col items-start gap-5">
          <span className="eyebrow">Looking for WordPress work instead?</span>
          <p className="max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            This page is a look at what I build outside of client projects. For professional WordPress websites, see Services and Portfolio.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/services" variant="secondary">
              Explore WordPress Services
            </Button>
            <Button href="/portfolio" variant="primary">
              View WordPress Projects
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
