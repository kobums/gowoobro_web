import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://gowoobro.com/api/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:8007/api/:path*",
      },
    ];
  },
};

export default nextConfig;
