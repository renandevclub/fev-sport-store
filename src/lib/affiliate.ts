import type { Product } from "./products.ts";

export const allowedAffiliateHosts: readonly string[] = ["www.amazon.com.br"];

export function createAmazonAffiliateUrl(productUrl: string | null, associateTag: string | undefined): string | null {
  if (!productUrl || !associateTag || !/^[A-Za-z0-9][A-Za-z0-9-]{1,39}-20$/.test(associateTag)) return null;

  try {
    const url = new URL(productUrl);
    const match = url.pathname.match(/^\/dp\/([A-Z0-9]{10})\/?$/);
    if (url.protocol !== "https:" || url.hostname !== "www.amazon.com.br" || !match) return null;

    const affiliateUrl = new URL(`https://www.amazon.com.br/dp/${match[1]}`);
    affiliateUrl.searchParams.set("tag", associateTag);
    return affiliateUrl.toString();
  } catch {
    return null;
  }
}

export function validateAffiliateUrl(
  value: string | null,
  allowedHosts: readonly string[] = allowedAffiliateHosts,
): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    const allowed = allowedHosts.some((allowedHost) => host === allowedHost.toLowerCase());

    if (url.protocol !== "https:" || url.username || url.password || !allowed) return null;
    return value;
  } catch {
    return null;
  }
}

export function getProductAffiliateUrl(product: Product): string | null {
  if (!product.active) return null;
  return validateAffiliateUrl(product.affiliateUrl);
}