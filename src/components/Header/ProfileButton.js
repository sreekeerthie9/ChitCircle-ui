"use client";

import { themes } from "@/constants/Themes";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: 0;
  color: ${themes.primaryColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
`;

const IconContainer = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? `${themes.primaryColor} !important` : "#bee3f8 !important"};
  cursor: ${(props) => (props.$active ? "default" : "pointer")};
`;

const Username = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
`;

const ProfileButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { authConfig } = useAuthContext();
  const isActive = pathname === "/profile";
  const username = authConfig?.username || "Profile";

  return (
    <div style={{ display: "flex", gap: "10px" }}>

      <Button
        type="button"
        aria-label="View profile"
        title="View profile"
        onClick={() => router.push("/profile")}
        disabled={isActive}
      >
        <IconContainer $active={isActive}>
          {username.slice(0, 1).toUpperCase() || <UserOutlined />}
        </IconContainer>
        <Username>{username}</Username>
      </Button>
    </div>
  );
};

export default ProfileButton;
