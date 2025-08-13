import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        {
          source: "/api/v1/:path*",
          destination: "http://localhost:3001/:path*",
        },
      ],
      fallback: [],
    };
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
