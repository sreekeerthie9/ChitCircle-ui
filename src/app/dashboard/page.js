"use client";

import AdminWorkspace from "@/components/admin/AdminWorkspace";
import CustomerDashboard from "@/components/customer/CustomerDashboard";
import SuperAdminDashboard from "@/components/superadmin/SuperAdminDashboard";
import { useAuthContext } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { authConfig } = useAuthContext();
  const role = String(authConfig?.role || "").toUpperCase();
  if (role.includes("SUPERADMIN")) return <SuperAdminDashboard />;
  if (role.includes("CUSTOMER")) return <CustomerDashboard />;
  return <AdminWorkspace section="dashboard" />;
}
