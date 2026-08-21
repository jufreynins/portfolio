import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import DnsEmailChecker from '@/components/tools/DnsEmailChecker';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `DNS & Email Record Checker | ${siteConfig.name}`,
  description: 'Inspect public DNS, mail-routing, and email-authentication records (A, MX, SPF, DKIM, DMARC) in one organized report.',
  canonical: `${siteConfig.url}/tools/dns-email-record-checker`,
});

const tool = getToolById('dns-email-record-checker')!;

const guideTips = [
  'A missing DKIM row usually means the selector wasn’t provided. Check your email provider’s setup guide for the exact selector name (e.g. “google” for Google Workspace).',
  'Multiple SPF records at the same host is invalid and can break mail delivery; merge them into one record.',
  'DMARC lives at _dmarc.yourdomain.com, not at the root. This tool queries that automatically.',
  'Results come from a public DNS resolver (Cloudflare), so they reflect what the internet currently sees, not your registrar’s dashboard.',
];

export default function DnsEmailCheckerPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Inspect public DNS, mail-routing, and email-authentication records for a domain in one organized report."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Need this fixed, not just checked?',
        title: 'Need help configuring DNS, email, or SSL?',
        description: 'I handle domain, DNS, and business-email setup as part of website launches and migrations.',
      }}
    >
      <DnsEmailChecker />
    </ToolPageChrome>
  );
}
