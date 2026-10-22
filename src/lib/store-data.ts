import { createAmazonAffiliateUrl, validateAffiliateUrl } from "@/lib/affiliate";
import { demoProducts, publishedProducts } from "@/lib/products";

export const demoMode = process.env.NODE_ENV === "development" && publishedProducts.length === 0;
export const contactEmail = process.env.NEXT_PUBLIC_STORE_CONTACT_EMAIL?.trim() || null;

export function getStoreProducts() {
  const products = demoMode ? demoProducts : publishedProducts.filter((product) => product.active);
  return products.map((product) => ({
    ...product,
    affiliateUrl: createAmazonAffiliateUrl(product.amazonUrl ?? null, process.env.AMAZON_ASSOCIATE_TAG)
      ?? validateAffiliateUrl(product.affiliateUrl),
  }));
}

export function getSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}

export function getCanonicalPath(path: string): string | undefined {
  const siteUrl = getSiteUrl();
  return siteUrl ? new URL(path, siteUrl).toString() : undefined;
}