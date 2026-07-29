import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Tools — ${siteConfig.name}`,
  description: 'Free, privacy-focused browser tools — convert and compress images, build CSS gradients, preview SEO meta tags, generate favicons, format JSON, and more, with no uploads, accounts, or permanent storage.',
  canonical: `${siteConfig.url}/tools`,
});

interface Tool {
  title: string;
  status: 'Live' | 'Planned';
  purpose: string;
  detail: string;
  href?: string;
}

const tools: Tool[] = [
  {
    title: 'Image Format Converter',
    status: 'Live',
    purpose: 'Convert images between JPG, PNG, and WebP in either direction, compare size savings, and download individually or as a ZIP.',
    detail: 'No uploads — converted locally in your browser.',
    href: '/tools/image-format-converter',
  },
  {
    title: 'CSS Gradient Generator',
    status: 'Live',
    purpose: 'Create custom linear, radial, and conic gradients with a live preview, then copy the production-ready CSS instantly.',
    detail: 'No uploads — runs entirely in your browser.',
    href: '/tools/css-gradient-generator',
  },
  {
    title: 'Image Compressor',
    status: 'Live',
    purpose: 'Reduce image file size while preserving the original format, and compare before/after size.',
    detail: 'No uploads — runs entirely in your browser.',
    href: '/tools/image-compressor',
  },
  {
    title: 'SEO Meta Preview',
    status: 'Live',
    purpose: 'Preview how a page title and meta description will appear in search results, on desktop and mobile, then copy ready-to-use meta tags.',
    detail: 'No uploads — runs entirely in your browser.',
    href: '/tools/seo-meta-preview',
  },
  {
    title: 'Favicon Generator',
    status: 'Live',
    purpose: 'Generate a full favicon set — favicon.ico plus Apple touch and Android/PWA icons — from a single source image.',
    detail: 'No uploads — runs entirely in your browser.',
    href: '/tools/favicon-generator',
  },
  {
    title: 'JSON Formatter',
    status: 'Live',
    purpose: 'Format, validate, and minify JSON directly in the browser, with line/column error reporting.',
    detail: 'No uploads — runs entirely in your browser.',
    href: '/tools/json-formatter',
  },
  {
    title: 'Image Resizer & Cropper',
    status: 'Live',
    purpose: 'Resize and crop images by custom dimensions, percentage, or social media preset, with an anchor grid to control cropping.',
    detail: 'No uploads — runs entirely in your browser.',
    href: '/tools/image-resizer',
  },
  {
    title: 'Social Media Image Resizer',
    status: 'Live',
    purpose: 'Resize images to exact preset dimensions for Facebook, Instagram, LinkedIn, YouTube, and X/Twitter.',
    detail: 'No uploads — runs entirely in your browser.',
    href: '/tools/social-media-image-resizer',
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--surface-warm)' }}>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Free Browser Tools"
            title="Simple tools for everyday web tasks."
            description="Fast, privacy-focused utilities that run directly in your browser. No account, uploads, or permanent storage."
          />
        </Container>
      </section>

      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className={`flex flex-col gap-3 rounded-2xl border p-6 ${tool.status === 'Live' ? '' : 'opacity-70'}`}
                style={
                  tool.status === 'Live'
                    ? { borderColor: 'var(--brand-primary)', background: 'var(--brand-soft)', boxShadow: 'var(--shadow-brand)' }
                    : { borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }
                }
                data-reveal
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                    {tool.title}
                  </h3>
                  <span
                    className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide"
                    style={
                      tool.status === 'Live'
                        ? { borderColor: 'color-mix(in srgb, var(--color-success) 35%, white)', color: 'var(--color-success)', background: 'var(--color-success-soft)' }
                        : { borderColor: 'var(--border-color)', color: 'var(--text-muted)', background: 'var(--surface-white)' }
                    }
                  >
                    {tool.status}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {tool.purpose}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {tool.detail}
                </p>
                {tool.href && (
                  <div className="mt-1">
                    <Button href={tool.href} variant="primary">
                      Open Tool
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col items-start gap-5">
          <span className="eyebrow">Looking for WordPress work instead?</span>
          <p className="max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            This page is a look at what I build outside of client projects. For professional WordPress websites, see Services and Portfolio.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/services" variant="secondary">
              Explore WordPress Services
            </Button>
            <Button href="/portfolio" variant="primary">
              View WordPress Projects
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
