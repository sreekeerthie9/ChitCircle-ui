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
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register");
  const section = pathname?.split("/")[1] || "dashboard";
  const role = String(authConfig?.role || "").toUpperCase();
  const Shell = role.includes("SUPERADMIN") ? SuperAdminShell : role.includes("CUSTOMER") ? CustomerShell : AdminShell;

  useEffect(() => {
    if (!isAuthPage && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isAuthPage, router]);

  if (!isAuthPage && !isAuthenticated) return null;
  return isAuthPage ? children : <Shell section={section}>{children}</Shell>;
}

export default function ClientProvider({ children }) {
  return <Providers><RoleRouter>{children}</RoleRouter></Providers>;
}
