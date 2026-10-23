import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/admin/admin-panel";
import { adminSessionCookie, verifyAdminSession } from "@/lib/admin/auth";
import { createInitialCatalog } from "@/lib/admin/catalog";
import { getStoreProducts } from "@/lib/store-data";
import "./admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administração",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionCookie)?.value;
  if (!verifyAdminSession(token)) redirect("/admin/login");

  return <div className="admin-root"><AdminPanel initialCatalog={createInitialCatalog(getStoreProducts())} /></div>;
}