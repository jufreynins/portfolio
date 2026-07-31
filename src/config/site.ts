const yearStarted = 2019;
const yearsExperience = new Date().getFullYear() - yearStarted;

export const siteConfig = {
  name: 'Jufrey Niño Bayog',
  title: 'WordPress and Web Systems Developer',
  shortTitle: 'WordPress developer',
  description: `WordPress developer with ${yearsExperience}+ years of experience building business websites, practical web systems, and browser tools — plus the hosting, domain, DNS, and technical setup needed to launch and maintain them.`,
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
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Tools', href: '/tools' },
    { label: 'Web Systems', href: '/personal-projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  initials: 'JB',
} as const;
