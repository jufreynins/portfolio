import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import QrCodeGenerator from '@/components/tools/QrCodeGenerator';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `QR Code Generator | ${siteConfig.name}`,
  description: 'Create a QR code for a URL, text, email, phone number, or Wi-Fi network, styled and ready to download as PNG or SVG.',
  canonical: `${siteConfig.url}/tools/qr-code-generator`,
});

const tool = getToolById('qr-code-generator')!;

const guideTips = [
  'Higher error correction lets a QR code still scan if part of it is damaged or covered — useful if you plan to add branding around it.',
  'Very low contrast between foreground and background colors can make a code unreliable to scan — keep it high-contrast.',
  'SVG downloads stay crisp at any print size; PNG is simpler for quick digital use.',
  'The Wi-Fi format follows the standard used by phone camera apps to auto-join a network.',
];

export default function QrCodeGeneratorPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Create a QR code for a URL, text, email, phone number, or Wi-Fi network, styled and ready to download."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Need this on printed materials?',
        title: 'Need branded assets or print materials designed?',
        description: 'I can build branded landing pages and assets to pair with print and marketing materials.',
      }}
    >
      <QrCodeGenerator />
    </ToolPageChrome>
  );
}
