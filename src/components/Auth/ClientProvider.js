"use client";

import AdminShell from "@/components/admin/AdminShell";
import CustomerShell from "@/components/customer/CustomerShell";
import SuperAdminShell from "@/components/superadmin/SuperAdminShell";
import { useAuthContext } from "@/contexts/AuthContext";
import Providers from "@/contexts/Providers";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function RoleRouter({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { authConfig, isAuthenticated } = useAuthContext();
  const isLandingPage = pathname === "/";
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register");
  const isPublicPage = isLandingPage || isAuthPage;
  const section = pathname?.split("/")[1] || "dashboard";
  const role = String(authConfig?.role || "").toUpperCase();
  const Shell = role.includes("SUPERADMIN") ? SuperAdminShell : role.includes("CUSTOMER") ? CustomerShell : AdminShell;

  useEffect(() => {
    if (!isPublicPage && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isPublicPage, router]);

  if (!isPublicPage && !isAuthenticated) return null;
  if (isPublicPage) return children;
  return <Shell section={section}>{children}</Shell>;
}

export default function ClientProvider({ children }) {
  return <Providers><RoleRouter>{children}</RoleRouter></Providers>;
}
