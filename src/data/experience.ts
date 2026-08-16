export interface ExperienceProject {
  client: string;
  period: string;
  detail: string;
}

export interface ExperienceEntry {
  period: string;
  role: string;
  org: string;
  summary: string;
  projects?: ExperienceProject[];
}

/** Real work history — dates and employers sourced directly from the CV. Do not invent or extend. */
export const experience: ExperienceEntry[] = [
  {
    period: 'Jan 2024 — Present',
    role: 'Freelance / Contract WordPress Developer',
    org: 'Independent — Philippines, United States, Canada',
    summary:
      'Working independently with agencies and direct clients on fixed-scope WordPress projects — site builds, ongoing maintenance, hosting & DNS support, and migrations.',
    projects: [
      {
        client: 'Spirit Media (United States) — AI Agency',
        period: 'Jan – Jun 2026',
        detail:
          'Returned as an AI-Assisted Developer after the agency’s pivot from WordPress web design to AI-driven books and websites; contributed to AI-generated book production and platform workflows.',
      },
      {
        client: 'Business Registry Corporation (Canada)',
        period: 'May – Nov 2025',
        detail: 'WordPress development for business registration services; custom Gravity Forms workflows for government filings, including logic, validation, and secure submission handling.',
      },
      {
        client: 'Neighborhood Plumbing and Drain (United States)',
        period: 'Aug – Sep 2025',
        detail: 'Ongoing maintenance, service pages, and conversion-focused landing pages; content and blog management.',
      },
      {
        client: 'Whitehead Agency Group (Canada)',
        period: 'Jul 2024 – Apr 2025',
        detail: 'Led development across multiple client sites with Elementor, Bricks, WPBakery, and Divi; managed hosting, domains, DNS, backups, and migrations.',
      },
      {
        client: 'Rava Digital (Philippines)',
        period: 'Apr – Jun 2024',
        detail: 'Agency-client WordPress development, layout updates, responsive fixes, and performance improvements.',
      },
      {
        client: 'Spirit Media (United States)',
        period: 'Jan – Apr 2024',
        detail:
          'Converted Figma designs into fully functional WordPress builds; WP Rocket optimization and responsive testing. Engagement concluded as the agency shifted its model from WordPress web design to AI-driven books and websites.',
      },
    ],
  },
  {
    period: '2021 — 2023',
    role: 'Website Developer',
    org: 'National Meat Inspection Service — Philippines',
    summary:
      'Built and customized WordPress websites alongside internal system development; backend customization, updates, maintenance, and bug fixing.',
  },
  {
    period: '2019 — 2020',
    role: 'Freelance WordPress CMS Designer',
    org: 'Independent — Philippines',
    summary:
      'Designed user-friendly WordPress themes and templates, implemented plugins and widgets, and optimized for mobile responsiveness and on-page SEO. Clients: Meler Production, Elopement Wedding Planner, United Realty Group, Randell Tiongson Personal Finance.',
  },
];
