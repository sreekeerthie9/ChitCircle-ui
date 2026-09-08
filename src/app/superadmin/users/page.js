"use client";

import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";

const Shell = styled.main`color: #242d2b; max-width: 1180px; margin: 0 auto;`;
const Title = styled.h1`font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); margin: 0 0 1.5rem;`;
const TableWrap = styled.div`background: #fff; border: 1px solid #dfe3d8; border-radius: 0.35rem; overflow-x: auto;`;
const Table = styled.table`border-collapse: collapse; min-width: 720px; width: 100%; th, td { border-top: 1px solid #e8ebe2; padding: 0.9rem 1.1rem; text-align: left; } th { color: #68766f; font-size: 0.68rem; text-transform: uppercase; } td { color: #3f5149; font-size: 0.82rem; }`;

export default function SuperAdminUsersPage() {
  const { authConfig } = useAuthContext();
  const { data, isLoading } = useApiQuery({ key: "platform-users", url: APIConstants.platformUsers, authConfig });
  return <Shell><Title>User access</Title><TableWrap><Table><thead><tr><th>Name</th><th>Username</th><th>Role</th><th>KYC</th><th>Status</th></tr></thead><tbody>{isLoading ? <tr><td colSpan="5">Loading users...</td></tr> : (data || []).map((user) => <tr key={user.id}><td>{user.displayName}</td><td>{user.username}</td><td>{user.role || "CUSTOMER"}</td><td>{user.kycStatus}</td><td>{user.active ? "Active" : "Suspended"}</td></tr>)}</tbody></Table></TableWrap></Shell>;
}
