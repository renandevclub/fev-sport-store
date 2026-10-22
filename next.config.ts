import type { NextConfig } from "next";
import { allowedProductImageHosts } from "@/lib/products";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: allowedProductImageHosts.map((hostname) => ({ protocol: "https" as const, hostname })),
  },
};

export default nextConfig;