"use client";

import { Close } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";

const Backdrop = styled.div`align-items: center; background: rgba(23, 60, 53, 0.35); display: flex; inset: 0; justify-content: center; padding: 1rem; position: fixed; z-index: 20;`;
const Dialog = styled.div`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.4rem; box-shadow: 0 20px 60px rgba(23, 60, 53, 0.2); max-width: 34rem; padding: 1.5rem; width: 100%;`;
const Heading = styled.div`align-items: center; display: flex; justify-content: space-between; margin-bottom: 1rem;`;
const Title = styled.h2`color: #173c35; font-size: 1.1rem; margin: 0;`;
const CloseButton = styled.button`background: transparent; border: 0; color: #65736c; cursor: pointer; padding: 0.2rem;`;
const Field = styled.label`color: #52665b; display: grid; font-size: 0.72rem; font-weight: 700; gap: 0.35rem; margin-bottom: 1rem; select { background: #f7f6ef; border: 1px solid #dfe3d8; border-radius: 0.25rem; color: #173c35; font: inherit; min-height: 2.5rem; padding: 0.55rem; }`;
const Result = styled.div`background: #f7f6ef; border: 1px solid #dfe3d8; border-radius: 0.3rem; display: grid; gap: 0.65rem; padding: 1rem;`;
const Risk = styled.strong`color: ${(props) => props.$risk === "HIGH" ? "#a34c2e" : props.$risk === "MEDIUM" ? "#9a6a1b" : "#317052"}; font-size: 1.25rem;`;
const Text = styled.p`color: #52665b; font-size: 0.8rem; margin: 0;`;
const Trigger = styled.button`background: #e8eee5; border: 0; border-radius: 0.25rem; color: #173c35; cursor: pointer; font: inherit; font-size: 0.72rem; font-weight: 700; padding: 0.5rem 0.65rem;`;

export function FinancialRiskButton({ username }) {
  const [open, setOpen] = useState(false);
  return <><Trigger type="button" onClick={() => setOpen(true)}>Analyse capacity</Trigger><FinancialRiskModal username={username} open={open} onClose={() => setOpen(false)} /></>;
}

export default function FinancialRiskModal({ username, open, onClose }) {
  const { authConfig } = useAuthContext();
  const [groupId, setGroupId] = useState("");
  const groups = useApiQuery({ key: "financial-risk-groups", url: open ? APIConstants.groups : null, authConfig, enabled: open });
  const risk = useApiQuery({ key: `financial-risk-${username}-${groupId}`, url: open && groupId ? `${APIConstants.financialRisk}/${encodeURIComponent(username)}/financial-risk?groupId=${groupId}` : null, authConfig, enabled: Boolean(open && username && groupId) });
  if (!open) return null;
  return <Backdrop onMouseDown={(event) => event.target === event.currentTarget && onClose()}><Dialog><Heading><Title>Financial capacity analysis</Title><CloseButton type="button" onClick={onClose} aria-label="Close"><Close fontSize="small" /></CloseButton></Heading><Field>Choose scheme group<select value={groupId} onChange={(event) => setGroupId(event.target.value)}><option value="">Select a group</option>{(groups.data || []).map((group) => <option key={group.id} value={group.id}>{group.name || `Group #${group.id}`}</option>)}</select></Field>{risk.isLoading && <Text>Analysing recorded payment history...</Text>}{risk.isError && <Text>Unable to analyse this member for the selected group.</Text>}{risk.data && <Result><Risk $risk={risk.data.risk}>{risk.data.risk} risk</Risk><Text>Capacity assessment: <strong>{risk.data.capacity}</strong></Text><Text>Monthly contribution: ₹{Number(risk.data.monthlyAmount || 0).toLocaleString("en-IN")}</Text><Text>Outstanding: ₹{Number(risk.data.outstanding || 0).toLocaleString("en-IN")}</Text><Text>Payments: {risk.data.paidPayments} / {risk.data.totalPayments} paid</Text><Text>Score: {risk.data.score}/100</Text><Text>Reasons:</Text><ul>{risk.data.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><Text>This is an advisory score based only on recorded contribution history.</Text></Result>}</Dialog></Backdrop>;
}
