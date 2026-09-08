"use client";

import LoginIcon from "@/components/icons/LoginIcon";
import APIConstants from "@/constants/APIConstants";
import { MESSAGE_TYPE } from "@/constants/Common";
import { themes } from "@/constants/Themes";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import useResponsive from "@/hooks/useResponsive";
import { api } from "@/utils/APIMethods";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, CircularProgress } from "@mui/joy";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f1e8;
  @media screen and (max-width: 768px) {
    min-height: 100vh;
  }
`;

const SignInImageWrapper = styled.div`
  width: 50vw;
  flex-shrink: 0;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 4.5rem 5rem;
  background: #173c35;
  color: #f9f4e8;
`;

const WelcomeText = styled.div`
  color: #173c35;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const ContentText = styled.div`
  color: #d6b36a;
  font-family: Georgia, serif;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  @media screen and (max-width: 768px) {
    font-size: 2.7rem;
  }
`;

const BrandPanel = styled.div`
  max-width: 25rem;
`;

const BrandEyebrow = styled.div`
  color: #d6b36a;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;

const BrandMessage = styled.p`
  color: #d9e5db;
  font-size: 1rem;
  line-height: 1.7;
  margin-top: 1.5rem;
`;

const TrustRow = styled.div`
  border-top: 1px solid rgba(214, 179, 106, 0.42);
  color: #f9f4e8;
  display: flex;
  gap: 1.25rem;
  padding-top: 1.1rem;
  width: 100%;
`;

const TrustItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const TrustValue = styled.strong`
  color: #d6b36a;
  font-size: 1.1rem;
`;

const TrustLabel = styled.span`
  color: #b8ccc0;
  font-size: 0.7rem;
  text-transform: uppercase;
`;

const LoginBodyContainer = styled.div`
  background: #f5f1e8;
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: left;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 100vh;
    padding: 2rem 1.25rem;
  }
`;

const LoginCard = styled.div`
  width: min(100%, 27rem);
`;

const LoginIntro = styled.p`
  color: #65736c;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0.75rem 0 2rem;
`;

const FormLabel = styled.label`
  color: #173c35;
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0 0 0.5rem 0.2rem;
  text-transform: uppercase;
`;

const PasswordIconContainer = styled.div`
  cursor: pointer;
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const LoginDetailsInputContainer = styled.div`
  width: 100%;
  min-height: 3.4rem;
  margin-bottom: 1.25rem;
  padding: 0.7rem 1rem;
  display: flex;
  column-gap: 0.85rem;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid #d6d8ce;
  border-radius: 0.35rem;
  background: #fffdf8;
  box-shadow: 0 6px 18px rgba(23, 60, 53, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus-within {
    border-color: #c08c35;
    box-shadow: 0 0 0 3px rgba(192, 140, 53, 0.14);
  }
`;

const InputElement = styled.input`
  border: 0;
  outline: none;
  color: #173c35;
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  min-width: 0;
  background: transparent;
  ::placeholder {
    color: ${(props) => (props?.error ? "#b44436" : "#89938b")};
  }
`;

const UserLoginButton = styled(Button)`
  && {
    width: 100%;
    min-height: 3.4rem;
    flex-shrink: 0;
    border-radius: 0.375rem;
    border: 1px solid #173c35;
    background: #173c35 !important;
    box-shadow: 0 8px 16px rgba(23, 60, 53, 0.16) !important;
    color: #fffaf0 !important;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    padding: 1.5rem;
    margin-top: 20px;
    transition: background 0.2s ease, transform 0.2s ease !important;

    &:hover,
    &:active,
    &:focus {
      color: #fffaf0 !important;
      border-color: #24594d !important;
      background: #24594d !important;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

export default function Login() {
  const router = useRouter();
  const message = useSnackbar();
  const { dispatch } = useAuthContext();
  const { login } = APIConstants;
  const [showPassword, setShowPassword] = useState(false);

  const { isMobile } = useResponsive();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) =>
      api({
        url: login,
        method: "POST",
        body: formData,
        checkAuth: false
      }),
    onSuccess: (response) => {
      message("User Login Successful", MESSAGE_TYPE.success);
      dispatch({ type: "onLogin", payload: response });
      router.replace("/dashboard");
    },
    onError: (error) => {
      message(error?.message ?? "check username password", MESSAGE_TYPE.error);
    }
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  const onChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MainContainer>
      {!isMobile && (
        <SignInImageWrapper>
          <BrandPanel>
            <BrandEyebrow>MS ChitCircle / Member portal</BrandEyebrow>
            <ContentText>Grow together.</ContentText>
            <BrandMessage>
              A simpler way to manage your chit schemes, member contributions,
              and shared financial goals.
            </BrandMessage>
            <TrustRow>
              <TrustItem>
                <TrustValue>01</TrustValue>
                <TrustLabel>Secure access</TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustValue>24/7</TrustValue>
                <TrustLabel>Circle visibility</TrustLabel>
              </TrustItem>
            </TrustRow>
          </BrandPanel>
        </SignInImageWrapper>
      )}
      <LoginBodyContainer>
        <LoginCard>
          <WelcomeText>Member sign in</WelcomeText>
          <ContentText>Welcome back.</ContentText>
          <LoginIntro>
            Sign in to view your schemes, payments, and circle activity.
          </LoginIntro>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <LoginDetailsInputContainer>
              <UserOutlined
                style={{ fontSize: "20px", color: "#c08c35" }}
              />
              <InputElement
                autoFocus
                id="username"
                {...register("username", {
                  required: "enter_your_username"
                })}
                placeholder="Enter your username"
                error={errors?.username}
                onBlur={(e) => setValue("username", e.target.value.trim())}
              />
            </LoginDetailsInputContainer>
            <FormLabel htmlFor="password">Password</FormLabel>
            <LoginDetailsInputContainer>
              <LockOutlined
                style={{ fontSize: "20px", color: "#c08c35" }}
              />
              <InputElement
                id="password"
                {...register("password", {
                  required: "enter_your_password"
                })}
                type={showPassword ? "text" : "password"}
                error={errors?.password}
                placeholder="Enter your password"
              />
              <PasswordIconContainer
                onClick={onChangeShowPassword}
                role="button"
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onChangeShowPassword();
                  }
                }}
              >
                {showPassword ?
                  <EyeOutlined
                    style={{
                      fontSize: "20px",
                      color: `${themes.primaryColor}`
                    }}
                  />
                : <EyeInvisibleOutlined
                    style={{
                      fontSize: "20px",
                      color: `${themes.primaryColor}`
                    }}
                  />
                }
              </PasswordIconContainer>
            </LoginDetailsInputContainer>
            <LoginButton
              type="submit"
              variant="solid"
              color="primary"
              loading={isPending}
              disabled={isPending}
            />
          </form>
        </LoginCard>
      </LoginBodyContainer>
    </MainContainer>
  );
}

export const LoginButton = ({ loading, disabled, onClick, type }) => {
  return (
    <UserLoginButton
      style={{ marginTop: "10px" }}
      variant="solid"
      color="primary"
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      <div>Login</div>
      {loading ?
        <CircularProgress size="sm" />
      : <LoginIcon />}
    </UserLoginButton>
  );
};
