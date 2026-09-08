"use client";

import { themes } from "@/constants/Themes";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: ${themes.pageHeadingFontWeight};
  color: ${themes.tertiaryColor} !important;
`;

const PageTitle = () => {
  const pathname = usePathname();

  const sentenceCase = (text) =>
    text ? text[0].toUpperCase() + text.substring(1) : null;

  const getTitle = () => {
    switch (pathname) {
      case "/device":
        return "All Devices";
      case "/dashboard":
        return "Dashboard";
      case "/media":
        return "Media";
      case "/playlist":
        return "All Playlists";
      case "/policy":
        return "Policy";
      case "/schedules":
        return "All Schedules";
      case "/schedules/new":
        return "Schedule Details";
      case "/tags":
        return "Tags";
      case "/apps":
        return "All Applications";
      case "/profile":
        return "Profile";
      case "/location":
        return "All Locations";
      case "/users":
        return "All Users";
      case "/subscriptions":
        return "All Subscriptions";
      case "/report":
        return "Report";
      case "/layout":
        return "Layouts";
      case "/role":
        return "Role";
      case "/screenshots":
        return "Screenshots";
      case "/group":
        return "Group";
      case "/approval":
        return "Pending Approvals";
      case "/approval/history":
        return "Approval History";
      case "/live":
        return "Live";
      default: {
        let pathSplit = pathname.split("/");
        let city = sentenceCase(pathSplit[2]);
        return (
          pathname.startsWith("/group/") ? "Group"
          : pathname.startsWith("/tags/") ? "Tags"
          : pathname.startsWith("/schedules/") ? "Schedule Details"
          : pathname.startsWith("/screenshots/") ? "Images"
          : pathname.startsWith("/device/") ?
            pathSplit.length == 3 ?
              "Device Details"
            : "Remote Screen View"
          : pathname.startsWith("/users/") ? "User Details"
          : city
        );
      }
    }
  };

  return <Title>{getTitle()}</Title>;
};

export default PageTitle;
