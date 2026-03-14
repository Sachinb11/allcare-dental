/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
    minimumCacheTTL: 86400, // 24 hours
  },

  // Strict security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",           value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-XSS-Protection",          value: "1; mode=block" },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // www → non-www (set your domain)
      // { source: "/(.*)", has: [{ type: "host", value: "www.allcaredental.in" }], destination: "https://allcaredental.in/:path*", permanent: true },
    ];
  },

  // Performance
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // Enable React strict mode for better dev warnings
  reactStrictMode: true,

  // Compress output
  compress: true,

  // Trailing slash consistency
  trailingSlash: false,
};

module.exports = nextConfig;
