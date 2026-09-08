"use client";

import AdminWorkspace from "@/components/admin/AdminWorkspace";
import CustomerRecords from "@/components/customer/CustomerRecords";
import { useAuthContext } from "@/contexts/AuthContext";

export default function PaymentsPage() {
  const { authConfig } = useAuthContext();
  if (String(authConfig?.role || "").toUpperCase().includes("CUSTOMER")) return <CustomerRecords type="payments" />;
  return <AdminWorkspace section="payments" />;
}
