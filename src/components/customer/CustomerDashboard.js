"use client";

import { EventNoteOutlined, GroupsOutlined, PaymentsOutlined, WarningAmberOutlined } from "@mui/icons-material";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";

const Shell = styled.main`color: #173c35; max-width: 1180px; margin: 0 auto; padding: 0.5rem 0 3rem;`;
const Header = styled.header`margin-bottom: 2rem;`;
const Eyebrow = styled.div`color: #b27625; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;`;
const Title = styled.h1`font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); line-height: 1; margin: 0.5rem 0 0;`;
const Description = styled.p`color: #66766d; font-size: 0.92rem; margin: 0.7rem 0 0;`;
const Grid = styled.div`display: grid; gap: 1rem; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-bottom: 1.5rem; @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); } @media (max-width: 480px) { grid-template-columns: 1fr; }`;
const Stat = styled.section`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.35rem; padding: 1.2rem;`;
const StatLabel = styled.div`align-items: center; color: #77877c; display: flex; font-size: 0.72rem; font-weight: 700; gap: 0.5rem; text-transform: uppercase;`;
const StatValue = styled.strong`display: block; font-family: Georgia, serif; font-size: 1.8rem; margin-top: 0.85rem;`;
const Section = styled.section`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.35rem; margin-bottom: 1.5rem; overflow: hidden;`;
const Heading = styled.div`padding: 1.2rem 1.3rem;`;
const SectionTitle = styled.h2`font-size: 1rem; margin: 0;`;
const Meta = styled.p`color: #76847b; font-size: 0.78rem; margin: 0.25rem 0 0;`;
const TableWrap = styled.div`overflow-x: auto;`;
const Table = styled.table`border-collapse: collapse; min-width: 640px; width: 100%; th, td { border-top: 1px solid #e8ebe2; padding: 0.95rem 1.3rem; text-align: left; } th { color: #7a887e; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; } td { color: #36554a; font-size: 0.82rem; } td strong { color: #173c35; display: block; }`;
const Status = styled.span`background: ${(props) => props.$warning ? "#fbe8df" : "#e5f0e6"}; border-radius: 99px; color: ${(props) => props.$warning ? "#a34c2e" : "#317052"}; display: inline-block; font-size: 0.68rem; font-weight: 800; padding: 0.35rem 0.6rem;`;

export default function CustomerDashboard() {
  const { authConfig } = useAuthContext();
  const memberships = useApiQuery({ key: "customer-memberships", url: APIConstants.customerMemberships, authConfig });
  const payments = useApiQuery({ key: "customer-payments", url: APIConstants.customerPayments, authConfig });
  const bids = useApiQuery({ key: "customer-bids", url: APIConstants.customerBids, authConfig });
  const membershipRows = memberships.data || [];
  const paymentRows = payments.data || [];
  const overdue = paymentRows.filter((payment) => payment.status === "PENDING" && new Date(payment.dueDate) < new Date()).length;
  return <Shell><Header><Eyebrow>Member overview</Eyebrow><Title>Welcome, {authConfig?.username || "member"}</Title><Description>See your circles, upcoming dues, and bidding activity in one place.</Description></Header><Grid><Stat><StatLabel><GroupsOutlined fontSize="small" /> Active groups</StatLabel><StatValue>{memberships.isLoading ? "-" : membershipRows.filter((item) => item.active).length}</StatValue></Stat><Stat><StatLabel><PaymentsOutlined fontSize="small" /> Payments</StatLabel><StatValue>{payments.isLoading ? "-" : paymentRows.length}</StatValue></Stat><Stat><StatLabel><EventNoteOutlined fontSize="small" /> Bids submitted</StatLabel><StatValue>{bids.isLoading ? "-" : (bids.data || []).length}</StatValue></Stat><Stat><StatLabel><WarningAmberOutlined fontSize="small" /> Overdue dues</StatLabel><StatValue>{payments.isLoading ? "-" : overdue}</StatValue></Stat></Grid><Section><Heading><SectionTitle>My chit groups</SectionTitle><Meta>{memberships.isLoading ? "Loading memberships..." : `${membershipRows.length} memberships`}</Meta></Heading><TableWrap><Table><thead><tr><th>Group</th><th>Scheme</th><th>Joined</th><th>Status</th></tr></thead><tbody>{membershipRows.map((item) => <tr key={item.id}><td><strong>{item.groupName}</strong>Group #{item.groupId}</td><td>{item.schemeId}</td><td>{item.joinedAt ? new Date(item.joinedAt).toLocaleDateString("en-IN") : "-"}</td><td><Status>{item.active ? "Active" : "Inactive"}</Status></td></tr>)}</tbody></Table></TableWrap></Section></Shell>;
}
