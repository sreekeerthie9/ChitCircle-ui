"use client";

import { AssessmentOutlined, GavelOutlined, GroupsOutlined, LogoutOutlined, ManageAccountsOutlined, ReceiptLongOutlined } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { api } from "@/utils/APIMethods";

const items = [["/dashboard", "Platform overview", AssessmentOutlined], ["/superadmin/users", "User access", ManageAccountsOutlined], ["/audit", "Audit log", GavelOutlined], ["/superadmin/groups", "All groups", GroupsOutlined], ["/superadmin/policies", "Policies", ReceiptLongOutlined]];
const Root = styled.div`background: #f3f4f0; display: flex; min-height: 100vh;`;
const Sidebar = styled.aside`background: #242d2b; color: #f5f1e8; display: flex; flex-direction: column; flex-shrink: 0; padding: 1.3rem 0.8rem; width: 15.5rem; @media (max-width: 820px) { width: 4.7rem; padding-inline: 0.55rem; }`;
const Brand = styled.div`border-bottom: 1px solid rgba(255,255,255,0.18); color: #e7c77f; font-family: Georgia, serif; font-size: 1.25rem; padding: 0.35rem 0.7rem 1.3rem; @media (max-width: 820px) { font-size: 0; text-align: center; }`;
const Mark = styled.span`color: #fff; display: block; font-family: inherit; font-size: 0.64rem; letter-spacing: 0.14em; margin-top: 0.35rem; text-transform: uppercase; @media (max-width: 820px) { font-size: 0; &::after { content: "SA"; font-size: 0.7rem; } }`;
const Nav = styled.nav`display: flex; flex: 1; flex-direction: column; gap: 0.25rem; padding-top: 1.5rem;`;
const NavLink = styled(Link)`align-items: center; border-radius: 0.3rem; color: #cbd5cf; display: flex; font-size: 0.78rem; gap: 0.75rem; min-height: 2.6rem; padding: 0 0.7rem; text-decoration: none; &[aria-current="page"] { background: #e7c77f; color: #242d2b; font-weight: 800; } &:hover { background: rgba(231,199,127,0.15); color: #fff; } @media (max-width: 820px) { justify-content: center; padding: 0; span { display: none; } }`;
const Main = styled.div`display: flex; flex: 1; flex-direction: column; min-width: 0;`;
const Topbar = styled.header`align-items: center; background: #fff; border-bottom: 1px solid #dfe3d8; display: flex; justify-content: space-between; min-height: 4.1rem; padding: 0 2rem; @media (max-width: 600px) { padding: 0 1rem; }`;
const Label = styled.div`color: #68766f; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;`;
const User = styled.div`align-items: center; color: #242d2b; display: flex; font-size: 0.8rem; font-weight: 700; gap: 0.65rem;`;
const Avatar = styled.div`align-items: center; background: #e7eee7; border-radius: 50%; display: flex; height: 2.2rem; justify-content: center; width: 2.2rem;`;
const Content = styled.div`flex: 1; overflow: auto; padding: 2rem; @media (max-width: 600px) { padding: 1.25rem 0.8rem; }`;

export default function SuperAdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { authConfig, dispatch } = useAuthContext();
  const queryClient = useQueryClient();
  const logout = async () => {
    try {
      await api({ url: APIConstants.logout, method: "POST" }, authConfig);
    } catch (error) {
      void error;
    } finally {
      queryClient.clear();
      dispatch({ type: "onLogout" });
      router.replace("/login");
    }
  };
  return <Root><Sidebar><Brand>MS ChitCircle<Mark>Superadmin control</Mark></Brand><Nav>{items.map(([href, label, Icon]) => <NavLink href={href} key={href} aria-current={pathname === href ? "page" : undefined}><Icon fontSize="small" /><span>{label}</span></NavLink>)}</Nav></Sidebar><Main><Topbar><Label>Platform control</Label><User role="button" tabIndex={0} aria-label="View profile" title="View profile" onClick={() => router.push("/profile")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") router.push("/profile"); }}><Avatar>{authConfig?.username?.slice(0, 1)?.toUpperCase() || "S"}</Avatar><span>{authConfig?.username || "Superadmin"}</span><button type="button" aria-label="Log out" title="Log out" onClick={(event) => { event.stopPropagation(); logout(); }}><LogoutOutlined fontSize="small" /></button></User></Topbar><Content>{children}</Content></Main></Root>;
}
