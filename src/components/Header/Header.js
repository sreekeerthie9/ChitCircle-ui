"use client";

import { themes } from "@/constants/Themes";
import { LeftOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";
import PageTitle from "./PageTitle";
import ProfileButton from "./ProfileButton";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: ${themes.secondaryColor};
  border-bottom: 1px solid ${themes.navBorderColor} !important;
  height: 45px;
  padding: 0px 24px;
`;

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <HeaderContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        {pathname !== "/dashboard" && (
          <LeftOutlined
            style={{
              cursor: "pointer",
              fontSize: `1.2rem`,
              marginRight: "5px"
            }}
            onClick={() => router.back()}
          />
        )}
        <PageTitle />
      </div>

      <ProfileButton />
    </HeaderContainer>
  );
};

export default Header;
