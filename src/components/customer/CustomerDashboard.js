"use client";

import {
  CheckCircleOutlined,
  EmojiEventsOutlined,
  GroupsOutlined,
  PaymentsOutlined,
  WarningAmberOutlined,
  EventNoteOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";

/* ── animations ─────────────────────────────────────────── */
const fadeUp = keyframes`from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }`;

/* ── layout ─────────────────────────────────────────────── */
const Shell = styled.main`
  color: #173c35;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 0 3rem;
  animation: ${fadeUp} 0.35s ease;
`;
const Header = styled.header`margin-bottom: 2rem;`;
const Eyebrow = styled.div`
  color: #b27625;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;
const Title = styled.h1`
  font-family: Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.1;
  margin: 0.4rem 0 0;
`;
const Subtitle = styled.p`color: #66766d; font-size: 0.9rem; margin: 0.5rem 0 0;`;

/* ── stat cards ─────────────────────────────────────────── */
const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-bottom: 2rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;
const Card = styled.section`
  background: #fffdf8;
  border: 1px solid #dfe3d8;
  border-left: 4px solid ${(p) => p.$accent || "#d6b36a"};
  border-radius: 0.35rem;
  padding: 1.25rem 1.3rem;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 4px 16px rgba(23,60,53,0.08); }
`;
const CardLabel = styled.div`
  align-items: center;
  color: #77877c;
  display: flex;
  font-size: 0.7rem;
  font-weight: 700;
  gap: 0.4rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;
const CardValue = styled.strong`
  display: block;
  font-family: Georgia, serif;
  font-size: 2rem;
  margin-top: 0.7rem;
  color: ${(p) => p.$color || "#173c35"};
`;
const CardNote = styled.div`color: #76847b; font-size: 0.72rem; margin-top: 0.25rem;`;

/* ── two-col layout ─────────────────────────────────────── */
const TwoCol = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

/* ── section panels ─────────────────────────────────────── */
const Panel = styled.section`
  background: #fffdf8;
  border: 1px solid #dfe3d8;
  border-radius: 0.35rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
`;
const PanelHead = styled.div`
  align-items: center;
  border-bottom: 1px solid #e8ebe2;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.3rem;
`;
const PanelTitle = styled.h2`font-size: 0.92rem; font-weight: 700; margin: 0;`;
const PanelLink = styled(Link)`
  align-items: center;
  color: #b27625;
  display: flex;
  font-size: 0.72rem;
  font-weight: 700;
  gap: 0.25rem;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;
const Empty = styled.p`color: #76847b; font-size: 0.82rem; padding: 1.2rem 1.3rem; margin: 0;`;

/* ── group cards ─────────────────────────────────────────── */
const GroupList = styled.div`display: flex; flex-direction: column;`;
const GroupRow = styled.div`
  align-items: center;
  border-top: 1px solid #e8ebe2;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 0.9rem 1.3rem;
  flex-wrap: wrap;
`;
const GroupName = styled.div`font-size: 0.88rem; font-weight: 700; color: #173c35;`;
const GroupMeta = styled.div`color: #76847b; font-size: 0.74rem; margin-top: 0.15rem;`;
const Badge = styled.span`
  background: ${(p) => p.$green ? "#e5f0e6" : p.$amber ? "#f7efd7" : p.$red ? "#fde8e8" : "#f0f0f0"};
  border-radius: 99px;
  color: ${(p) => p.$green ? "#317052" : p.$amber ? "#9a6a1b" : p.$red ? "#a33" : "#555"};
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.3rem 0.6rem;
  white-space: nowrap;
`;
const Won = styled.span`
  align-items: center;
  color: #b27625;
  display: flex;
  font-size: 0.7rem;
  font-weight: 800;
  gap: 0.2rem;
`;

/* ── cycle list ──────────────────────────────────────────── */
const CycleRow = styled.div`
  border-top: 1px solid #e8ebe2;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.3rem;
`;
const CycleNum = styled.div`
  background: #173c35;
  border-radius: 0.25rem;
  color: #d6b36a;
  font-size: 0.65rem;
  font-weight: 800;
  min-width: 2.2rem;
  padding: 0.3rem 0.4rem;
  text-align: center;
`;
const CycleName = styled.div`font-size: 0.82rem; font-weight: 600;`;
const CycleSub = styled.div`color: #76847b; font-size: 0.72rem;`;

/* ── claims list ─────────────────────────────────────────── */
const ClaimRow = styled.div`
  align-items: center;
  border-top: 1px solid #e8ebe2;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 0.85rem 1.3rem;
  flex-wrap: wrap;
`;
const ClaimInfo = styled.div`font-size: 0.82rem;`;
const ClaimSub = styled.div`color: #76847b; font-size: 0.72rem; margin-top: 0.1rem;`;

const fmt = (v) => `\u20B9${Number(v).toLocaleString("en-IN")}`;

const cycleStatusBadge = (status) => {
  if (status === "BIDDING_OPEN") return { $green: true, label: "Open" };
  if (status === "COMPLETED") return { $amber: true, label: "Completed" };
  return { label: String(status).replaceAll("_", " ") };
};

const claimBadge = (status) => {
  if (status === "APPROVED" || status === "WON") return { $green: true };
  if (status === "PENDING") return { $amber: true };
  if (status === "REJECTED" || status === "LOST") return { $red: true };
  return {};
};

export default function CustomerDashboard() {
  const { authConfig } = useAuthContext();
  const memberships = useApiQuery({ key: "customer-memberships", url: APIConstants.customerMemberships, authConfig });
  const payments    = useApiQuery({ key: "customer-payments",    url: APIConstants.customerPayments,    authConfig });
  const claims      = useApiQuery({ key: "customer-claims",      url: APIConstants.customerClaims,      authConfig });
  const payouts     = useApiQuery({ key: "customer-payouts",     url: APIConstants.customerPayouts,     authConfig });
  const cycles      = useApiQuery({ key: "customer-cycles",      url: APIConstants.customerCycles,      authConfig });

  const membershipRows = memberships.data || [];
  const paymentRows    = payments.data    || [];
  const claimRows      = claims.data      || [];
  const payoutRows     = payouts.data     || [];
  const cycleRows      = cycles.data      || [];

  const activeGroups  = membershipRows.filter((m) => m.active).length;
  const claimsCount   = claimRows.length;
  const wonsCount     = payoutRows.length;
  const overdue       = paymentRows.filter(
    (p) => p.recordType !== "PAYOUT" && p.status === "PENDING" && new Date(p.dueDate) < new Date()
  ).length;

  const recentCycles = cycleRows.slice(0, 5);
  const recentClaims = claimRows.slice(0, 5);

  return (
    <Shell>
      <Header>
        <Eyebrow>Member overview</Eyebrow>
        <Title>Welcome back, {authConfig?.username || "member"}</Title>
        <Subtitle>Here&apos;s a snapshot of your chit fund activity.</Subtitle>
      </Header>

      {/* ── stat row ── */}
      <Grid>
        <Card $accent="#2d7a5a">
          <CardLabel><GroupsOutlined fontSize="small" /> Active groups</CardLabel>
          <CardValue>{memberships.isLoading ? "—" : activeGroups}</CardValue>
          <CardNote>{membershipRows.length} total membership{membershipRows.length !== 1 ? "s" : ""}</CardNote>
        </Card>
        <Card $accent="#d6b36a">
          <CardLabel><EventNoteOutlined fontSize="small" /> Claims submitted</CardLabel>
          <CardValue>{claims.isLoading ? "—" : claimsCount}</CardValue>
          <CardNote>{claimRows.filter((c) => c.status === "APPROVED").length} approved</CardNote>
        </Card>
        <Card $accent="#b27625">
          <CardLabel><EmojiEventsOutlined fontSize="small" /> Chits won</CardLabel>
          <CardValue $color="#b27625">{payouts.isLoading ? "—" : wonsCount}</CardValue>
          <CardNote>
            {payoutRows.length
              ? fmt(payoutRows.reduce((sum, p) => sum + Number(p.amount), 0)) + " total received"
              : "No payouts yet"}
          </CardNote>
        </Card>
        <Card $accent={overdue > 0 ? "#c0392b" : "#2d7a5a"}>
          <CardLabel>
            {overdue > 0
              ? <><WarningAmberOutlined fontSize="small" /> Overdue payments</>
              : <><CheckCircleOutlined fontSize="small" /> Payments</>}
          </CardLabel>
          <CardValue $color={overdue > 0 ? "#c0392b" : "#173c35"}>{payments.isLoading ? "—" : overdue}</CardValue>
          <CardNote>{overdue > 0 ? "Please clear dues soon" : "All payments up to date"}</CardNote>
        </Card>
      </Grid>

      {/* ── two col: groups + cycles ── */}
      <TwoCol>
        {/* My groups */}
        <Panel>
          <PanelHead>
            <PanelTitle>My chit groups</PanelTitle>
            <PanelLink href="/payments">
              View payments <ArrowForwardIosOutlined sx={{ fontSize: "0.6rem" }} />
            </PanelLink>
          </PanelHead>
          <GroupList>
            {memberships.isLoading ? (
              <Empty>Loading groups…</Empty>
            ) : membershipRows.length === 0 ? (
              <Empty>You are not enrolled in any group yet.</Empty>
            ) : (
              membershipRows.map((m) => (
                <GroupRow key={m.id}>
                  <div>
                    <GroupName>{m.groupName}</GroupName>
                    <GroupMeta>
                      {m.schemeName || `Scheme #${m.schemeId}`}
                      {m.potAmount ? ` · ${fmt(m.potAmount)} pot` : ""}
                    </GroupMeta>
                    <GroupMeta>Joined {m.joinedAt ? new Date(m.joinedAt).toLocaleDateString("en-IN") : "—"}</GroupMeta>
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", flexWrap: "wrap" }}>
                    <Badge $green={m.active} $red={!m.active}>{m.active ? "Active" : "Inactive"}</Badge>
                    {m.hasWon && <Won><EmojiEventsOutlined sx={{ fontSize: "0.8rem" }} /> Won</Won>}
                  </div>
                </GroupRow>
              ))
            )}
          </GroupList>
        </Panel>

        {/* Recent cycles */}
        <Panel>
          <PanelHead>
            <PanelTitle>Recent cycles</PanelTitle>
            <PanelLink href="/bids">
              View claims <ArrowForwardIosOutlined sx={{ fontSize: "0.6rem" }} />
            </PanelLink>
          </PanelHead>
          {cycles.isLoading ? (
            <Empty>Loading cycles…</Empty>
          ) : recentCycles.length === 0 ? (
            <Empty>No cycles found for your active memberships.</Empty>
          ) : (
            recentCycles.map((c) => {
              const sb = cycleStatusBadge(c.status);
              return (
                <CycleRow key={c.id}>
                  <CycleNum>#{c.cycleNumber}</CycleNum>
                  <div>
                    <CycleName>{c.groupName || `Group #${c.groupId}`}</CycleName>
                    <CycleSub>{c.schemeName} · {fmt(c.potAmount)} pot</CycleSub>
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    <Badge {...sb}>{sb.label}</Badge>
                    {c.hasClaim && <Badge $green>Claimed</Badge>}
                  </div>
                </CycleRow>
              );
            })
          )}
        </Panel>
      </TwoCol>

      {/* ── recent claims ── */}
      <Panel>
        <PanelHead>
          <PanelTitle>Recent claims</PanelTitle>
          <PanelLink href="/bids">
            All claims &amp; history <ArrowForwardIosOutlined sx={{ fontSize: "0.6rem" }} />
          </PanelLink>
        </PanelHead>
        {claims.isLoading ? (
          <Empty>Loading claims…</Empty>
        ) : recentClaims.length === 0 ? (
          <Empty>No claims submitted yet. Go to &ldquo;Claims &amp; history&rdquo; to request a chit.</Empty>
        ) : (
          recentClaims.map((c) => (
            <ClaimRow key={c.id}>
              <div>
                <ClaimInfo><strong>Cycle {c.cycleNumber}</strong> — {c.groupName || `Group #${c.groupId}`}</ClaimInfo>
                <ClaimSub>
                  {c.submittedAt ? new Date(c.submittedAt).toLocaleDateString("en-IN") : "—"}
                  {c.note ? ` · "${c.note}"` : ""}
                </ClaimSub>
              </div>
              <Badge {...claimBadge(c.status)}>{c.status}</Badge>
            </ClaimRow>
          ))
        )}
      </Panel>

      {/* ── payouts won ── */}
      {payoutRows.length > 0 && (
        <Panel>
          <PanelHead>
            <PanelTitle>Payouts received</PanelTitle>
            <PanelLink href="/payments">View all payments <ArrowForwardIosOutlined sx={{ fontSize: "0.6rem" }} /></PanelLink>
          </PanelHead>
          {payoutRows.map((p) => (
            <ClaimRow key={p.id}>
              <div>
                <ClaimInfo><strong>Cycle {p.cycleNumber}</strong> — {p.groupName || `Group #${p.groupId}`}</ClaimInfo>
                <ClaimSub>{p.paidAt ? new Date(p.paidAt).toLocaleDateString("en-IN") : "—"} · {p.method || "Manual"}</ClaimSub>
              </div>
              <Badge $green>{fmt(p.amount)}</Badge>
            </ClaimRow>
          ))}
        </Panel>
      )}
    </Shell>
  );
}
