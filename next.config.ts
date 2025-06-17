import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.183.162"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      },
      {
        protocol: "http",
        hostname: "*"
      }
    ]
  }
};

export default nextConfig;
