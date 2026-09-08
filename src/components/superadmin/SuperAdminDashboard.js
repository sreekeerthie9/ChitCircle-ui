"use client";

import { GroupsOutlined, PeopleOutlined, PaymentsOutlined, WarningAmberOutlined } from "@mui/icons-material";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";

const Shell = styled.main`color: #242d2b; max-width: 1180px; margin: 0 auto; padding: 0.5rem 0 3rem;`;
const Eyebrow = styled.div`color: #9b7121; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;`;
const Title = styled.h1`font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); line-height: 1; margin: 0.5rem 0 2rem;`;
const Grid = styled.div`display: grid; gap: 1rem; grid-template-columns: repeat(4, minmax(0, 1fr)); @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); } @media (max-width: 480px) { grid-template-columns: 1fr; }`;
const Stat = styled.section`background: #fff; border: 1px solid #dfe3d8; border-radius: 0.35rem; padding: 1.2rem;`;
const Label = styled.div`align-items: center; color: #68766f; display: flex; font-size: 0.72rem; font-weight: 700; gap: 0.5rem; text-transform: uppercase;`;
const Value = styled.strong`display: block; font-family: Georgia, serif; font-size: 1.8rem; margin-top: 0.85rem;`;
const Note = styled.p`color: #68766f; font-size: 0.82rem; line-height: 1.5; margin-top: 2rem; max-width: 42rem;`;

export default function SuperAdminDashboard() {
  const { authConfig } = useAuthContext();
  const { data, isLoading } = useApiQuery({ key: "platform-summary", url: APIConstants.platformSummary, authConfig });
  return <Shell><Eyebrow>Platform oversight</Eyebrow><Title>Control room</Title><Grid><Stat><Label><GroupsOutlined fontSize="small" /> Active groups</Label><Value>{isLoading ? "-" : data?.groups ?? 0}</Value></Stat><Stat><Label><PeopleOutlined fontSize="small" /> Members</Label><Value>{isLoading ? "-" : data?.memberships ?? 0}</Value></Stat><Stat><Label><PaymentsOutlined fontSize="small" /> Payments</Label><Value>{isLoading ? "-" : data?.payments ?? 0}</Value></Stat><Stat><Label><WarningAmberOutlined fontSize="small" /> Admins</Label><Value>{isLoading ? "-" : data?.admins ?? 0}</Value></Stat></Grid><Note>Platform-wide figures are read-only here. Operational changes remain owned by each organizer and are recorded in the audit log.</Note></Shell>;
}
