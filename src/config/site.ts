const yearStarted = 2019;
const yearsExperience = new Date().getFullYear() - yearStarted;

export const siteConfig = {
  name: 'Jufrey Niño Bayog',
  title: 'WordPress Developer & Frontend Specialist',
  shortTitle: 'WordPress developer',
  description: `WordPress developer with ${yearsExperience}+ years of experience building polished, reliable business websites with Elementor, dynamic content, and custom functionality — plus practical web systems and browser-based tools.`,
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
    { label: 'WordPress Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Development Lab', href: '/lab' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  initials: 'JB',
} as const;
