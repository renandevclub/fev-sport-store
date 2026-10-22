export type StoreEventName =
  | "store_view"
  | "category_select"
  | "search_submit"
  | "product_view"
  | "affiliate_click";

export type StoreEvent = {
  name: StoreEventName;
  timestamp: string;
  productId?: string;
  category?: string;
  source?: string;
};

export function trackEvent(
  name: StoreEventName,
  details: Omit<StoreEvent, "name" | "timestamp"> = {},
): void {
  if (typeof window === "undefined") return;

  const event: StoreEvent = { name, timestamp: new Date().toISOString(), ...details };
  window.dispatchEvent(new CustomEvent<StoreEvent>("fv:analytics", { detail: event }));
}