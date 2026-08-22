import type { StaticImageData } from 'next/image';
import revisiondeskScreenshot from '../assets/images/personal-projects/revisiondesk.png';
import stockflowScreenshot from '../assets/images/personal-projects/stockflow.png';
import laundryManagementScreenshot from '../assets/images/personal-projects/laundry-management-system.png';

export type SystemStatus = 'Live' | 'Prototype' | 'In Development' | 'Concept';

export interface System {
  slug: string;
  name: string;
  category: string;
  status: SystemStatus;
  /** Who the system is built for — kept descriptive, not a client claim. */
  users: string;
  problem: string;
  modules: string[];
  techDirection: string;
  /** Monospace route label shown in the mock browser chrome when no screenshot exists. */
  routeLabel: string;
  /** Set for systems that have moved beyond a concept mockup into a real, running deployment. */
  href?: string;
  screenshot?: StaticImageData;
  /** Optional case-study detail — only populated where there's something genuine to say; omitted (not padded) for concept-only systems. */
  caseStudy?: {
    scope?: string;
    implementation?: string;
    technicalChallenges?: string;
    outcome?: string;
  };
  /** Homepage "Beyond WordPress" picks — real screenshots only. */
  featured?: boolean;
}

export const systems: System[] = [
  {
    slug: 'revisiondesk',
    name: 'RevisionDesk',
    category: 'Web Agency Operations',
    status: 'Live',
    users: 'Web agencies and freelance developers managing revisions across multiple client sites.',
    problem: 'Managing revision requests, bug fixes, and content updates across multiple client websites over email and chat makes it hard to track ownership, status, and history.',
    modules: ['Task assignment & tracking', 'Role-based access (Admin/PM/Developer/Client)', 'Client-submitted revision requests', 'Activity log & notifications', 'Reports & time tracking'],
    techDirection: 'Laravel, React + TypeScript (Inertia.js), MySQL',
    routeLabel: 'revisiondesk.jufreyninobayogportfolio.com',
    href: 'https://revisiondesk.jufreyninobayogportfolio.com/',
    screenshot: revisiondeskScreenshot,
    featured: true,
    caseStudy: {
      scope: 'A role-based revision tracker: clients submit requests, PMs assign and prioritize them, developers update status, and everyone can see history in one place instead of scattered email threads.',
      implementation: 'Built on Laravel with an Inertia.js + React + TypeScript frontend and a MySQL data model for tasks, roles, and activity logs. Role-based access controls what each of Admin/PM/Developer/Client can see and do.',
      outcome: 'A working live demo that shows the full workflow end to end: request submission, assignment, status changes, and a time-stamped activity log per task.',
    },
  },
  {
    slug: 'stockflow',
    name: 'StockFlow',
    category: 'Operations & Inventory',
    status: 'Live',
    users: 'Small business owners and warehouse or storefront staff tracking stock levels.',
    problem: 'Manually tracking inventory in spreadsheets leads to overselling, stockouts, and inaccurate product counts.',
    modules: ['Stock level tracking', 'Low-stock alerts', 'Product catalog', 'Order history', 'Basic reporting'],
    techDirection: 'Laravel, React + TypeScript, MySQL',
    routeLabel: 'inventory-system.jufreyninobayogportfolio.com',
    href: 'https://inventory-system.jufreyninobayogportfolio.com/',
    screenshot: stockflowScreenshot,
    featured: true,
    caseStudy: {
      scope: 'A structured inventory system, replacing a spreadsheet-based process: a searchable product catalog, stock counts that update with orders, low-stock alerts, and basic reporting.',
      implementation: 'Built on Laravel with a React + TypeScript frontend and a MySQL schema for products, stock movements, and orders.',
      outcome: 'A working live demo covering the core inventory loop: catalog, stock level changes, and low-stock alerting.',
    },
  },
  {
    slug: 'task-management-system',
    name: 'Task Management System',
    category: 'Business Productivity',
    status: 'Concept',
    users: 'Small teams coordinating day-to-day work across email, chat, and spreadsheets.',
    problem: 'Tasks get lost across email, chat, and spreadsheets, making it hard to see what is actually in progress.',
    modules: ['Task assignment & due dates', 'Status tracking', 'Team member views', 'Activity history', 'Priority tagging'],
    techDirection: 'TypeScript, structured data model, role-based views',
    routeLabel: 'app.system/tasks/board',
  },
  {
    slug: 'dental-clinic-management-system',
    name: 'Dental Clinic Management System',
    category: 'Healthcare Practice',
    status: 'Concept',
    users: 'Dental clinic staff and front-desk schedulers.',
    problem: 'Paper-based or disconnected scheduling makes it hard to track appointments, patient history, and daily clinic capacity.',
    modules: ['Appointment scheduling', 'Patient records', 'Treatment history', 'Staff calendar', 'Automated reminders'],
    techDirection: 'TypeScript, calendar/scheduling UI, structured records',
    routeLabel: 'app.system/clinic/schedule',
  },
  {
    slug: 'laundry-management-system',
    name: 'Laundry Management System',
    category: 'AI-Assisted Web App',
    status: 'Live',
    users: 'Laundry shop owners and staff managing orders, customers, and day-to-day operations.',
    problem: 'Running a laundry business across paper logs, spreadsheets, and disconnected tools makes it hard to track order status, payments, deliveries, and stock in one place.',
    modules: ['Order pipeline (check-in through pickup/delivery)', 'Customer directory & records', 'Payments & expenses', 'Inventory & suppliers', 'Reports & role-based audit logs'],
    techDirection: 'Laravel, React + TypeScript, MySQL, built with AI-assisted development in Claude Code, human-reviewed',
    routeLabel: 'laundry-management-system.jufreyninobayogportfolio.com/dashboard',
    href: 'https://laundry-management-system.jufreyninobayogportfolio.com/',
    screenshot: laundryManagementScreenshot,
  },
  {
    slug: 'attendance-monitoring-system',
    name: 'Attendance Monitoring System',
    category: 'Workforce Management',
    status: 'Concept',
    users: 'HR staff and team managers tracking employee attendance.',
    problem: 'Manual time sheets or paper logs make it hard to verify attendance, calculate accurate hours, and catch patterns like tardiness or absenteeism.',
    modules: ['Clock in/out tracking', 'Attendance reports', 'Leave & absence logs', 'Late/undertime alerts', 'Employee schedules'],
    techDirection: 'TypeScript, structured data model, dashboard UI',
    routeLabel: 'app.system/attendance/log',
  },
  {
    slug: 'domain-dns-operations-dashboard',
    name: 'Domain and DNS Operations Dashboard',
    category: 'Web Operations / Agency Tooling',
    status: 'Concept',
    users: 'Agencies and website administrators managing domains and DNS across multiple providers.',
    problem: 'Agencies and website administrators managing multiple domains often track DNS records, website connections, and email verification manually across separate providers.',
    modules: ['Domain inventory', 'Nameservers & DNS records', 'Website connection status', 'Email verification (SPF/DKIM/DMARC)', 'Propagation checks', 'Activity log & configuration notes'],
    techDirection: 'Next.js, TypeScript, structured DNS data model, DNS lookup services, role-based access',
    routeLabel: 'app.system/dns/domains',
  },
];

export function getSystemBySlug(slug: string): System | undefined {
  return systems.find((system) => system.slug === slug);
}

export const systemStatusStyle: Record<SystemStatus, { color: string; border: string; bg: string }> = {
  Live: { color: 'var(--color-success)', border: 'color-mix(in srgb, var(--color-success) 35%, white)', bg: 'var(--color-success-soft)' },
  Prototype: { color: 'var(--color-warning)', border: 'color-mix(in srgb, var(--color-warning) 35%, white)', bg: 'var(--color-warning-soft)' },
  'In Development': { color: 'var(--color-warning)', border: 'color-mix(in srgb, var(--color-warning) 35%, white)', bg: 'var(--color-warning-soft)' },
  Concept: { color: 'var(--text-secondary)', border: 'var(--border-color)', bg: 'var(--surface-white)' },
};
