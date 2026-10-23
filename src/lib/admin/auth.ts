import { createHmac, timingSafeEqual } from "node:crypto";

export const adminSessionCookie = "fv_admin_session";
export const adminSessionMaxAge = 60 * 60 * 8;

export function isAdminAuthConfigured(): boolean {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  return Boolean(password && password.length >= 16 && secret && Buffer.byteLength(secret) >= 32);
}

export function verifyAdminPassword(candidate: string): boolean {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return false;

  const candidateBuffer = Buffer.from(candidate);
  const configuredBuffer = Buffer.from(configured);
  return candidateBuffer.length === configuredBuffer.length
    && timingSafeEqual(candidateBuffer, configuredBuffer);
}

export function createAdminSessionToken(now = Date.now()): string {
  const expiresAt = Math.floor(now / 1000) + adminSessionMaxAge;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token: string | undefined, now = Date.now()): boolean {
  if (!token || !process.env.ADMIN_SESSION_SECRET) return false;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra || !/^\d+$/.test(payload)) return false;

  const expiresAt = Number(payload);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(now / 1000)) return false;

  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function sign(payload: string): string {
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET ?? "")
    .update(payload)
    .digest("base64url");
}