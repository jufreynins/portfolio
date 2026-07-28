import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollFX from '@/components/ScrollFX';
import { buildMetadata, personSchema } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  ...buildMetadata(),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout <head>, not pages/_document; App Router's supported pattern for non-next/font stylesheets */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollFX />
      </body>
    </html>
  );
}
