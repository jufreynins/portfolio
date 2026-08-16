const yearsExperience = 5;

export const siteConfig = {
  name: 'Jufrey Niño Bayog',
  title: 'WordPress Developer & Website Technical Specialist',
  shortTitle: 'WordPress Developer',
  description: `WordPress Developer with ${yearsExperience}+ years of experience building, managing, and troubleshooting production WordPress websites — plus the hosting, domain, DNS, and technical operations needed to keep them running.`,
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

  // reCAPTCHA v3 (invisible) site key — public by design, safe to ship client-side. The
  // matching secret key lives only in the gitignored public/contact-config.php on the
  // server; see that file's .example template.
  recaptchaSiteKey: '6LfJV4gtAAAAACbCXDhWEay-Ol9zJtxlh9kG3DOo',

  social: {
    // Add links here when available
  },

  nav: [
    { label: 'Work', href: '/work' },
    { label: 'Expertise', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Tools', href: '/tools' },
    { label: 'Contact', href: '/contact' },
  ],

  initials: 'JB',
} as const;
