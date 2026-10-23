import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { adminSessionCookie, isAdminAuthConfigured, verifyAdminSession } from "@/lib/admin/auth";
import "../admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acesso administrativo",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  if (verifyAdminSession(cookieStore.get(adminSessionCookie)?.value)) redirect("/admin");
  return <AdminLoginForm configured={isAdminAuthConfigured()} />;
}