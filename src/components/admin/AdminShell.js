"use client";

import {
  AssessmentOutlined,
  DashboardOutlined,
  EventNoteOutlined,
  GroupsOutlined,
  LogoutOutlined,
  PaymentsOutlined,
  PeopleOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { api } from "@/utils/APIMethods";
import AdminWorkspace from "./AdminWorkspace";
import { Button } from "@mui/joy";

const navItems = [
  ["/dashboard", "Overview", DashboardOutlined],
  ["/schemes", "Schemes", ReceiptLongOutlined],
  ["/groups", "Chit groups", GroupsOutlined],
  ["/cycles", "Cycle control", EventNoteOutlined],
  ["/customers", "Customers", PeopleOutlined],
  ["/payments", "Payments & ledger", PaymentsOutlined],
  ["/analytics", "Analytics", AssessmentOutlined],
];

const Root = styled.div`
  background: #f5f1e8;
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  background: #173c35;
  color: #f9f4e8;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 1.3rem 0.8rem;
  width: 15.5rem;
  @media (max-width: 820px) {
    width: 4.7rem;
    padding-inline: 0.55rem;
  }
`;

const Brand = styled.div`
  border-bottom: 1px solid rgba(214, 179, 106, 0.3);
  color: #d6b36a;
  font-family: Georgia, serif;
  font-size: 1.25rem;
  line-height: 1.1;
  padding: 0.35rem 0.7rem 1.3rem;
  @media (max-width: 820px) {
    font-size: 0;
    text-align: center;
  }
`;

const BrandMark = styled.span`
  color: #f9f4e8;
  display: block;
  font-family: inherit;
  font-size: 0.64rem;
  letter-spacing: 0.14em;
  margin-top: 0.35rem;
  text-transform: uppercase;
  @media (max-width: 820px) {
    font-size: 0;
    &::after {
      content: "MC";
      font-size: 0.7rem;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 1.5rem;
`;

const NavLink = styled(Link)`
  align-items: center;
  border-radius: 0.3rem;
  color: #c8d8ca;
  display: flex;
  font-size: 0.78rem;
  gap: 0.75rem;
  min-height: 2.6rem;
  padding: 0 0.7rem;
  text-decoration: none;
  &[aria-current="page"] {
    background: #d6b36a;
    color: #173c35;
    font-weight: 800;
  }
  &:hover {
    background: rgba(214, 179, 106, 0.15);
    color: #fffaf0;
  }
  @media (max-width: 820px) {
    justify-content: center;
    padding: 0;
    span {
      display: none;
    }
  }
`;

const SideFooter = styled.div`
  border-top: 1px solid rgba(214, 179, 106, 0.3);
  color: #c8d8ca;
  font-size: 0.7rem;
  padding: 1rem 0.7rem 0;
  @media (max-width: 820px) {
    text-align: center;
    span {
      display: none;
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
`;

const Topbar = styled.header`
  align-items: center;
  background: #fffdf8;
  border-bottom: 1px solid #dfe3d8;
  display: flex;
  justify-content: space-between;
  min-height: 4.1rem;
  padding: 0 2rem;
  @media (max-width: 600px) {
    padding: 0 1rem;
  }
`;

const TopbarLabel = styled.div`
  color: #76847b;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const UserBadge = styled.div`
  align-items: center;
  color: #173c35;
  display: flex;
  font-size: 0.8rem;
  font-weight: 700;
  gap: 0.65rem;
`;

const ProfileButton = styled(Button)`
  && {
    align-items: center;
    background: transparent;
    border: 0;
    color: #173c35;
    cursor: pointer;
    display: flex;
    gap: 0.65rem;
    padding: 0;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      background: #e8eee5;
      color: #102b25;
    }

    &:focus-visible {
      outline: 2px solid #c08c35;
      outline-offset: 3px;
    }
  }
`;

const Avatar = styled.div`
  align-items: center;
  background: #e8eee5;
  border-radius: 50%;
  display: flex;
  height: 2.2rem;
  justify-content: center;
  width: 2.2rem;
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  padding: 2rem;
  @media (max-width: 600px) {
    padding: 1.25rem 0.8rem;
  }
`;

export default function AdminShell({ section, children }) {
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
  return (
    <Root>
      <Sidebar>
        <Brand>
          MS ChitCircle<BrandMark>Admin workspace</BrandMark>
        </Brand>
        <Nav>
          {navItems.map(([href, label, Icon]) => (
            <NavLink
              href={href}
              key={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon fontSize="small" />
              <span>{label}</span>
            </NavLink>
          ))}
        </Nav>
        <SideFooter>
          <SettingsOutlined fontSize="small" /> <span>Admin controls</span>
        </SideFooter>
      </Sidebar>
      <Main>
        <Topbar>
          <TopbarLabel>Admin workspace</TopbarLabel>
          <UserBadge>
            <ProfileButton
              type="button"
              aria-label="View profile"
              title="View profile"
              onClick={() => router.push("/profile")}
            >
              <Avatar>
                {authConfig?.username?.slice(0, 1)?.toUpperCase() || "A"}
              </Avatar>
              <span>{authConfig?.username || "Administrator"}</span>
            </ProfileButton>
            <button
              type="button"
              aria-label="Log out"
              title="Log out"
              onClick={(event) => {
                event.stopPropagation();
                logout();
              }}
            >
              <LogoutOutlined fontSize="small" />
            </button>
          </UserBadge>
        </Topbar>
        <Content>{children || <AdminWorkspace section={section} />}</Content>
      </Main>
    </Root>
  );
}
