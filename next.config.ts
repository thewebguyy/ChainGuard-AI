import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/v1/:path*",
        destination: "/api/index.py",
      },
    ];
  },
};

export default nextConfig;
