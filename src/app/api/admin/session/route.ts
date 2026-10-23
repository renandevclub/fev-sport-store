import { NextResponse } from "next/server";
import {
  adminSessionCookie,
  adminSessionMaxAge,
  createAdminSessionToken,
  isAdminAuthConfigured,
  isSameOriginRequest,
  verifyAdminPassword,
} from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 403 });
  }

  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ error: "A autenticação administrativa ainda não foi configurada." }, { status: 503 });
  }

  let password: unknown;
  try {
    const body: unknown = await request.json();
    password = typeof body === "object" && body !== null && "password" in body
      ? body.password
      : undefined;
  } catch {
    return NextResponse.json({ error: "Solicitação inválida." }, { status: 400 });
  }

  if (typeof password !== "string" || !verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(adminSessionCookie, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: adminSessionMaxAge,
  });
  return response;
}

export async function DELETE(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 403 });
  }

  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(adminSessionCookie, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 0,
  });
  return response;
}