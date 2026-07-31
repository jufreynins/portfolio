export interface HandoffFieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea';
  placeholder?: string;
  hint?: string;
}

export interface HandoffSectionDef {
  id: string;
  title: string;
  fields: HandoffFieldDef[];
}

export const HANDOFF_SECTIONS: HandoffSectionDef[] = [
  {
    id: 'overview',
    title: 'Project Overview',
    fields: [
      { key: 'projectName', label: 'Project name', type: 'text' },
      { key: 'clientName', label: 'Client or business name', type: 'text' },
      { key: 'projectType', label: 'Project type', type: 'text', placeholder: 'New build, redesign, migration…' },
      { key: 'summary', label: 'Summary', type: 'textarea' },
    ],
  },
  {
    id: 'urls',
    title: 'Website URLs',
    fields: [
      { key: 'production', label: 'Production URL', type: 'text' },
      { key: 'staging', label: 'Staging URL', type: 'text' },
      { key: 'admin', label: 'Admin/login URL', type: 'text' },
    ],
  },
  {
    id: 'cms',
    title: 'CMS and Builder',
    fields: [
      { key: 'cms', label: 'CMS', type: 'text', placeholder: 'WordPress' },
      { key: 'builder', label: 'Page builder / theme', type: 'text', placeholder: 'Elementor Pro, custom theme…' },
      { key: 'notes', label: 'Version notes', type: 'textarea' },
    ],
  },
  {
    id: 'hosting',
    title: 'Hosting Provider',
    fields: [
      { key: 'provider', label: 'Provider', type: 'text', placeholder: 'Cloudways, Hostinger…' },
      { key: 'plan', label: 'Plan / tier', type: 'text' },
      { key: 'accessStoredAt', label: 'Where access is stored', type: 'text', hint: 'Never enter the actual password or key here — just where it lives, e.g. "Client\'s 1Password vault".' },
    ],
  },
  {
    id: 'domain',
    title: 'Domain Provider',
    fields: [
      { key: 'registrar', label: 'Registrar', type: 'text', placeholder: 'GoDaddy, Namecheap…' },
      { key: 'renewal', label: 'Renewal date', type: 'text' },
      { key: 'accessStoredAt', label: 'Where access is stored', type: 'text' },
    ],
  },
  {
    id: 'dns',
    title: 'DNS Provider',
    fields: [
      { key: 'provider', label: 'DNS host (if different from registrar)', type: 'text' },
      { key: 'records', label: 'Key records overview', type: 'textarea', placeholder: 'MX records for email, CNAME for subdomain, etc.' },
    ],
  },
  {
    id: 'staging',
    title: 'Staging Environment',
    fields: [
      { key: 'url', label: 'Staging URL', type: 'text' },
      { key: 'syncProcess', label: 'Sync process', type: 'textarea', placeholder: 'How staging and production stay in sync.' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    fields: [
      { key: 'platform', label: 'Platform', type: 'text', placeholder: 'GA4, Plausible…' },
      { key: 'propertyId', label: 'Tracking / property ID', type: 'text' },
      { key: 'accessStoredAt', label: 'Where access is stored', type: 'text' },
    ],
  },
  {
    id: 'forms',
    title: 'Forms',
    fields: [
      { key: 'platform', label: 'Form plugin / service', type: 'text' },
      { key: 'recipients', label: 'Notification recipient(s)', type: 'text' },
      { key: 'spam', label: 'Spam protection notes', type: 'text' },
    ],
  },
  {
    id: 'email',
    title: 'Email / SMTP Platform',
    fields: [
      { key: 'provider', label: 'SMTP provider', type: 'text', placeholder: 'WP Mail SMTP, Post SMTP…' },
      { key: 'sendingDomain', label: 'Sending domain', type: 'text' },
      { key: 'accessStoredAt', label: 'Where access is stored', type: 'text' },
    ],
  },
  {
    id: 'backups',
    title: 'Backup System',
    fields: [
      { key: 'service', label: 'Backup plugin / service', type: 'text', placeholder: 'WPVivid, host-level backups…' },
      { key: 'schedule', label: 'Schedule', type: 'text' },
      { key: 'retention', label: 'Retention', type: 'text' },
    ],
  },
  {
    id: 'caching',
    title: 'Caching',
    fields: [
      { key: 'service', label: 'Caching plugin / service', type: 'text' },
      { key: 'cdn', label: 'CDN (if any)', type: 'text' },
      { key: 'notes', label: 'Notes', type: 'textarea' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    fields: [
      { key: 'service', label: 'Security plugin / service', type: 'text' },
      { key: 'twoFactor', label: 'Two-factor authentication in place?', type: 'text' },
      { key: 'notes', label: 'Notes', type: 'textarea' },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations',
    fields: [{ key: 'list', label: 'Third-party integrations', type: 'textarea', placeholder: 'CRM, payment processor, marketing tools…' }],
  },
  {
    id: 'maintenance',
    title: 'Maintenance Schedule',
    fields: [
      { key: 'frequency', label: 'Frequency', type: 'text' },
      { key: 'scope', label: 'Scope', type: 'textarea' },
    ],
  },
  {
    id: 'knownIssues',
    title: 'Known Issues',
    fields: [{ key: 'notes', label: 'Known issues or limitations', type: 'textarea' }],
  },
  {
    id: 'launchNotes',
    title: 'Launch Notes',
    fields: [{ key: 'notes', label: 'Notes specific to this launch', type: 'textarea' }],
  },
];
