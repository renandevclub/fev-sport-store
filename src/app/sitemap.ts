import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/store-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  if (!baseUrl) return [];

  return ["/", "/futebol", "/volei", "/privacidade"].map((path) => ({
    url: new URL(path, baseUrl).toString(),
    lastModified: new Date(),
  }));
}