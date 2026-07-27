const yearStarted = 2019;
const yearsExperience = new Date().getFullYear() - yearStarted;

export const siteConfig = {
  name: 'Jufrey Niño Bayog',
  title: 'Web Systems, WordPress & Web Tools Developer',
  shortTitle: 'web developer',
  description: `Web developer with ${yearsExperience}+ years of experience creating responsive WordPress websites, custom web systems, business dashboards, and practical browser-based tools.`,
  url: 'https://jufreyninobayogportfolio.com',
  locale: 'en-US',
  yearStarted,
  yearsExperience,

  email: 'jufreyninobayog@gmail.com',
  phone: '+639652100539',
  phoneDisplay: '+63 965 210 0539',

  cvPath: '/documents/Jufrey-Bayog-CV.pdf',

  social: {
    // Add links here when available
  },

  nav: [
    { label: 'Home', href: '/' },
    {
      label: 'Solutions',
      href: '/services',
      children: [
        { label: 'All Solutions', href: '/services' },
        { label: 'Website Development', href: '/services/website-wordpress' },
        { label: 'Business Web Systems', href: '/systems' },
        { label: 'Custom Web Applications', href: '/services/custom-web-apps' },
        { label: 'UI Systems & Frontend Improvement', href: '/services#ui-systems' },
        { label: 'Automation & Integration', href: '/services#automation' },
      ],
    },
    { label: 'Web Systems', href: '/systems' },
    { label: 'Web Tools', href: '/tools' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  initials: 'JB',
} as const;
