import type { NextConfig } from "next";

// Team photos and project screenshots uploaded in the admin are served from your Supabase storage bucket.
const supabaseHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').hostname
  } catch {
    return undefined
  }
})()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: 'https', hostname: supabaseHost, pathname: '/storage/v1/object/public/site-images/**' }]
      : [],
  },
  // The admin uploads images (up to 5 MB each) through server actions.
  experimental: { serverActions: { bodySizeLimit: '6mb' } },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Security headers sent with every page. The Content-Security-Policy here only covers framing, plugins and where forms may post:
  // a full script policy needs a fresh random value on every request, which does not suit mostly static pages.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
        ],
      },
    ]
  },
  async redirects() {
    // The privacy page moved from /privacy to /privacy-policy.
    return [{ source: '/privacy', destination: '/privacy-policy', permanent: true }]
  },
};

export default nextConfig;
