import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Matches the old Astro build's <route>/index.html output structure, which Hostinger's
  // Apache already serves correctly via directory-index resolution.
  trailingSlash: true,
};

export default nextConfig;
