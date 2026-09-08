"use client";

import APIConstants from "@/constants/APIConstants";
import { PERMISSIONS, ROLE, ROLE_CONFIG_KEYS } from "@/constants/Common";
import { themes } from "@/constants/Themes";
import { useAuthContext } from "@/contexts/AuthContext";
import { api } from "@/utils/APIMethods";
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  HistoryOutlined
} from "@ant-design/icons";
import {
  AddTaskOutlined,
  AppsOutlined,
  BadgeOutlined,
  BookmarksOutlined,
  CalendarMonthOutlined,
  CardMembershipOutlined,
  DashboardOutlined,
  DisplaySettings,
  LocationOnOutlined,
  LogoutOutlined,
  PersonOutlined,
  PlaylistPlayOutlined,
  SaveOutlined,
  ScreenshotMonitorOutlined,
  StreamOutlined,
  SummarizeOutlined,
  TvOutlined,
  ViewComfyOutlined,
  WorkspacesOutline
} from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { List, ListItemButton } from "@mui/joy";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import styled from "styled-components";
import Header from "./Header/Header";

const SiderLayout = styled.div`
  transition: width 0.25s ease;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  background-color: ${themes.secondaryColor};
`;

const DemoLogoVerticalDiv = styled.div`
  gap: 5px;
  display: flex !important;
  border: 1px solid ${themes.navBorderColor} !important;
  justify-content: center !important;
  padding: 0 !important;
  height: 45px !important;
  align-items: center !important;
  color: ${themes.tertiaryColor};
  transition: all 0.25s ease;
  &:hover {
    cursor: pointer;
  }
`;

const NavMenu = styled(List)`
  & .MuiListItemButton-root {
    transition: all 0.25s ease;
    color: ${themes.tertiaryColor};
    height: 40px;
  }

  & .MuiListItemButton-root.Mui-selected {
    background-color: ${themes.okHighlightColor} !important;
    color: #fff !important;
  }

  & .MuiListItemButton-root:hover {
    background-color: ${themes.okHighlightColor}20;
  }
`;

const NavMenuBot = styled(List)`
  position: absolute;
  bottom: 0;
  border: none;
  font-size: ${themes.baseFontSize};
  background-color: ${themes.secondaryColor};
  color: ${themes.darkPrimaryColor};
  border-top: 1px solid ${themes.navBorderColor};
  width: 100%;
  padding: 0;

  .MuiListItemButton-root {
    background-color: ${themes.secondaryColor};
    margin: 0;
    border-radius: 0;
    width: 100%;
    height: 43.2px;
    font-family: "Poppins";
    color: ${themes.darkPrimaryColor};
    border: none;
  }

  .MuiListItemButton-root:hover {
    background-color: ${themes.secondaryColor};
  }
`;

const NavLink = styled(Link)`
  color: inherit !important;
  font-family: "Poppins" !important;
  font-weight: 400 !important;
  font-size: 13px !important;
  text-decoration: none;
  cursor: "pointer";
`;

const LayoutRoot = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${themes.backgroundColor};
`;

const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MenuScroll = styled.div`
  height: 85vh;
  overflow-y: auto;
  scrollbar-width: none;
`;

const MenuItem = styled(ListItemButton)`
  display: flex !important;
  align-items: center !important;
  transition: all 0.25s ease !important;
  .menu-text {
    overflow: hidden;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
`;

const expandedMenuItemStyles = {
  justifyContent: "flex-start",
  gap: "12px",
  padding: "0 16px",
  fontSize: themes.baseFontSize
};

const collapsedMenuItemStyles = {
  justifyContent: "center",
  gap: "0",
  padding: "0",
  fontSize: "16px"
};

const expandedTextStyles = {
  opacity: 1,
  width: "auto"
};

const collapsedTextStyles = {
  opacity: 0,
  width: 0
};

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PageContent = styled.div`
  flex: 1;
  overflow: auto;
  background-color: ${themes.backgroundColor};
  padding: 24px;
`;

const NavContainer = styled.div`
  position: relative;
`;

const MenuRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  cursor: pointer;
`;

const SubMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const items = [
  {
    key: "iam",
    icon: <BadgeOutlined />,
    label: "IAM",
    children: [
      {
        key: "/users",
        icon: <PersonOutlined />,
        label: <NavLink href="/users">Users</NavLink>,
        href: "/users",
        config: ROLE_CONFIG_KEYS.USER,
        permission: PERMISSIONS.read
      },
      {
        key: "/role",
        icon: <AddTaskOutlined />,
        label: <NavLink href="/role">Role</NavLink>,
        href: "/role",
        config: ROLE_CONFIG_KEYS.ROLE,
        permission: PERMISSIONS.read
      }
    ]
  },
  {
    key: "approval hub",
    icon: <AppstoreOutlined />,
    label: "Approval Hub",
    children: [
      {
        key: "/approval",
        icon: <ClockCircleOutlined />,
        label: <NavLink href="/approval">To Review</NavLink>,
        href: "/approval",
        config: ROLE_CONFIG_KEYS.APPROVAL,
        permission: PERMISSIONS.read
      },
      {
        key: "/approval/history",
        icon: <HistoryOutlined />,
        label: <NavLink href="/approval/history">History</NavLink>,
        href: "/approval/history",
        config: ROLE_CONFIG_KEYS.APPROVAL,
        permission: PERMISSIONS.read
      }
    ]
  },
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: <NavLink href="/dashboard">Dashboard</NavLink>,
    href: "/dashboard",
    config: ROLE_CONFIG_KEYS.DASHBOARD,
    permission: PERMISSIONS.read
  },
  {
    key: "/device",
    icon: <TvOutlined />,
    label: <NavLink href="/device">Device</NavLink>,
    href: "/device",
    config: ROLE_CONFIG_KEYS.DEVICE,
    permission: PERMISSIONS.read
  },
  {
    key: "/media",
    icon: <SaveOutlined />,
    label: <NavLink href="/media">Media</NavLink>,
    href: "/media",
    config: ROLE_CONFIG_KEYS.MEDIA,
    permission: PERMISSIONS.read
  },
  {
    key: "/playlist",
    icon: <PlaylistPlayOutlined />,
    label: <NavLink href="/playlist">Playlists</NavLink>,
    href: "/playlist",
    config: ROLE_CONFIG_KEYS.PLAYLIST,
    permission: PERMISSIONS.read
  },
  {
    key: "/tags",
    icon: <BookmarksOutlined />,
    label: <NavLink href="/tags">Tags</NavLink>,
    href: "/tag",
    config: ROLE_CONFIG_KEYS.TAG,
    permission: PERMISSIONS.read,
    hideForRoles: [ROLE.AUDIO_CUSTOMER]
  },
  {
    key: "/layout",
    icon: <ViewComfyOutlined />,
    label: <NavLink href="/layout">Layout</NavLink>,
    href: "/layout",
    config: ROLE_CONFIG_KEYS.LAYOUT,
    permission: PERMISSIONS.read
  },
  {
    key: "/schedules",
    icon: <CalendarMonthOutlined />,
    label: <NavLink href="/schedules">Schedules</NavLink>,
    href: "/schedules",
    config: ROLE_CONFIG_KEYS.SCHEDULE,
    permission: PERMISSIONS.read
  },
  {
    key: "/policy",
    icon: <DisplaySettings />,
    label: <NavLink href="/policy">Policy</NavLink>,
    href: "/policy",
    config: ROLE_CONFIG_KEYS.POLICY,
    permission: PERMISSIONS.read,
    hideForRoles: [ROLE.AUDIO_CUSTOMER]
  },
  {
    key: "/group",
    icon: <WorkspacesOutline />,
    label: <NavLink href="/group">Group</NavLink>,
    href: "/group",
    config: ROLE_CONFIG_KEYS.GROUP,
    permission: PERMISSIONS.read
  },
  {
    key: "/apps",
    icon: <AppsOutlined />,
    label: <NavLink href="/apps">Applications</NavLink>,
    href: "/apps",
    config: ROLE_CONFIG_KEYS.CUSTOM_APP,
    permission: PERMISSIONS.read
  },
  {
    key: "/location",
    icon: <LocationOnOutlined />,
    label: <NavLink href="/location">Location</NavLink>,
    href: "/location",
    config: ROLE_CONFIG_KEYS.LOCATION,
    permission: PERMISSIONS.read,
    hideForRoles: [ROLE.AUDIO_CUSTOMER]
  },
  {
    key: "/subscriptions",
    icon: <CardMembershipOutlined />,
    label: <NavLink href="/subscriptions">Subscriptions</NavLink>,
    href: "/subscriptions",
    config: ROLE_CONFIG_KEYS.SUBSCRIPTION,
    permission: PERMISSIONS.read
  },
  {
    key: "/report",
    icon: <SummarizeOutlined />,
    label: <NavLink href="/report">Report</NavLink>,
    href: "/report",
    config: ROLE_CONFIG_KEYS.REPORT,
    permission: PERMISSIONS.read
  },
  {
    key: "/screenshots",
    icon: <ScreenshotMonitorOutlined />,
    label: <NavLink href="/screenshots">Screenshots</NavLink>,
    href: "/screenshots",
    config: ROLE_CONFIG_KEYS.SCREENSHOTS,
    permission: PERMISSIONS.read
  },
  {
    key: "/live",
    icon: <StreamOutlined />,
    label: <NavLink href="/live">Live</NavLink>,
    href: "/live",
    config: ROLE_CONFIG_KEYS.LIVE,
    permission: PERMISSIONS.read
  }
];

const bottomItems = [
  {
    key: "/login",
    icon: <LogoutOutlined />,
    label: <NavLink href="/login">Logout</NavLink>,
    href: "/login"
  }
];

const getSelectedKey = (pathname) => {
  if (pathname.lastIndexOf("/") === 0) return pathname;
  if (pathname.includes("users")) return "/users";
  if (pathname.includes("approval/history")) return "/approval/history";
  if (pathname.includes("approval")) return "/approval";
  if (pathname.includes("location")) return "/location";
  if (pathname.includes("schedules")) return "/schedules";
  if (pathname.includes("group")) return "/group";
  if (pathname.includes("tags")) return "/tags";
  if (pathname.includes("screenshots")) return "/screenshots";
  return pathname.substring(0, 7);
};

const Navbar = ({ children }) => {
  const queryClient = useQueryClient();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { parsedRoleConfig, authConfig, dispatch } = useAuthContext();
  const { name: roleName } = authConfig?.role || {};
  const [openMenus, setOpenMenus] = useState(new Set());
  const router = useRouter();

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

  const handleLogoClick = () => {
    setCollapsed((prev) => !prev);
  };

  const filteredItems = useMemo(() => {
    return items
      .map((item) => {
        if (item.children) {
          const filteredChildren = item.children.filter((child) => {
            const { hideForRoles: childHideRoles = [], config: childConfig } =
              child;
            const roleConfig = parsedRoleConfig?.[childConfig];
            const hideForCurrentRole =
              childHideRoles.length > 0 && childHideRoles.includes(roleName);

            return (
              roleConfig
              && Array.isArray(roleConfig)
              && roleConfig.includes(child.permission)
              && !hideForCurrentRole
            );
          });

          if (filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }

          return null;
        }
        const { hideForRoles = [], config } = item;
        const roleConfig = parsedRoleConfig?.[config];
        const hideForCurrentRole =
          hideForRoles.length > 0 && hideForRoles.includes(roleName);

        if (
          roleConfig
          && Array.isArray(roleConfig)
          && roleConfig.includes(item.permission)
          && !hideForCurrentRole
        ) {
          return item;
        }

        return null;
      })
      .filter(Boolean);
  }, [parsedRoleConfig, roleName]);
  const selectedKey = getSelectedKey(pathname);

  const toggleMenu = (key) => {
    setOpenMenus((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const menuItemStyle =
    collapsed ? collapsedMenuItemStyles : expandedMenuItemStyles;

  const textStyle = collapsed ? collapsedTextStyles : expandedTextStyles;

  return (
    <LayoutRoot>
      <SiderLayout style={{ width: collapsed ? "80px" : "220px" }}>
        <SidebarContainer>
          <DemoLogoVerticalDiv onClick={handleLogoClick}>
            <Image
              src={"/logo/Logo-parts/SignageMonk.svg"}
              width={30}
              height={30}
              alt=""
            />

            {!collapsed && (
              <Image
                src={"/logo/Logo-parts/SM-logo-s.svg"}
                width={120}
                height={100}
                alt=""
                priority
              />
            )}
          </DemoLogoVerticalDiv>

          <MenuScroll>
            <NavMenu>
              {filteredItems.map((item) => {
                const hasChildren = item.children?.length > 0;
                const isOpen = openMenus.has(item.key);
                return (
                  <NavContainer key={item.key}>
                    <MenuItem
                      key={item.key}
                      selected={selectedKey === item.key}
                      onClick={() => {
                        if (hasChildren) {
                          toggleMenu(item.key);
                        } else {
                          router.replace(item.key);
                        }
                      }}
                      style={menuItemStyle}
                    >
                      <MenuRow
                        style={{
                          justifyContent: collapsed ? "center" : "space-between"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10
                          }}
                        >
                          {item.icon}
                          <span className="menu-text" style={textStyle}>
                            {item.label}
                          </span>
                        </div>

                        {hasChildren && <ArrowDropDownIcon />}
                      </MenuRow>
                    </MenuItem>

                    {hasChildren && isOpen && (
                      <SubMenuWrapper>
                        {item.children.map((child) => (
                          <MenuItem
                            key={child.key}
                            selected={child.key === selectedKey}
                            onClick={() => {
                              router.replace(child.key);
                            }}
                            style={menuItemStyle}
                          >
                            {child.icon}
                            <span className="menu-text" style={textStyle}>
                              {child.label}
                            </span>
                          </MenuItem>
                        ))}
                      </SubMenuWrapper>
                    )}
                  </NavContainer>
                );
              })}
            </NavMenu>
          </MenuScroll>

          <NavMenuBot className="nav-menu-bot">
            {bottomItems.map((item) => (
              <MenuItem
                key={item.key}
                onClick={logout}
                style={menuItemStyle}
                role="button"
                aria-label="Log out"
                title="Log out"
              >
                {item.icon}
                <span className="menu-text" style={textStyle}>
                  {item.label}
                </span>
              </MenuItem>
            ))}
          </NavMenuBot>
        </SidebarContainer>
      </SiderLayout>

      <MainContent>
        <Header />
        <PageContent>{children}</PageContent>
      </MainContent>
    </LayoutRoot>
  );
};
export default Navbar;
