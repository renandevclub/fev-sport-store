import type { Product } from "./products.ts";

export const allowedAffiliateHosts: readonly string[] = [];

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