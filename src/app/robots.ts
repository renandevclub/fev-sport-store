import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/store-data";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(baseUrl ? { sitemap: new URL("/sitemap.xml", baseUrl).toString() } : {}),
  };
}