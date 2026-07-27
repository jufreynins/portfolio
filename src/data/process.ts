export interface ProcessStep {
  title: string;
  description: string;
  type: 'discover' | 'plan' | 'design-build' | 'test-refine';
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Understand the Project',
    description: "Understanding the client's goals, target audience, and website requirements.",
    type: 'discover',
  },
  {
    title: 'Define the Build',
    description: 'Creating the sitemap, page structure, content hierarchy, and user journey.',
    type: 'plan',
  },
  {
    title: 'Develop and Review',
    description: 'Building the site in WordPress with Elementor, dynamic content, and custom functionality where needed.',
    type: 'design-build',
  },
  {
    title: 'Test and Deliver',
    description: 'Testing responsiveness, performance, and functionality before launch — with support available after.',
    type: 'test-refine',
  },
];
