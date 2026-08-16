const yearsExperience = 5;

export const siteConfig = {
  name: 'Jufrey Niño Bayog',
  title: 'WordPress and Web Systems Developer',
  shortTitle: 'WordPress developer',
  description: `WordPress developer with ${yearsExperience}+ years of experience building business websites, practical web systems, and browser tools — plus the hosting, domain, DNS, and technical setup needed to launch and maintain them.`,
  url: 'https://jufreyninobayogportfolio.com',
  locale: 'en-US',
  yearsExperience,

  email: 'jufreyninsbayog@gmail.com',
  phone: '+639652100539',
  phoneDisplay: '+63 965 210 0539',

  cvPath: '/documents/Jufrey-Bayog-CV.pdf',

  // Google Apps Script Web App that appends contact-form submissions to a Google Sheet
  // (in addition to the contact.php email notification). Write-only endpoint — safe to
  // expose client-side, since there's no way to read the sheet's contents back through it.
  sheetsWebhookUrl: 'https://script.google.com/macros/s/AKfycbwmbNGKav9VNBtbabGY1a2TfR8iVdrw0QKmX-8h6WvWhPi-kUMqgx_moN0Z2CMqWVRM/exec',

  social: {
    // Add links here when available
  },

  nav: [
    { label: 'Work', href: '/work' },
    { label: 'Systems', href: '/systems' },
    { label: 'About', href: '/about' },
    { label: 'Tools', href: '/tools' },
    { label: 'Contact', href: '/contact' },
  ],

  initials: 'JB',
} as const;
