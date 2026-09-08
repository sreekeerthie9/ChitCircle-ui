"use client";

import { useState } from "react";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";
import { api } from "@/utils/APIMethods";
import { useQueryClient } from "@tanstack/react-query";

const Wrap = styled.div`display: grid; gap: 0.45rem; min-width: 12rem;`;
const Button = styled.button`background: #e8eee5; border: 0; border-radius: 0.25rem; color: #173c35; cursor: pointer; font: inherit; font-size: 0.72rem; font-weight: 700; padding: 0.5rem 0.65rem;`;
const Panel = styled.div`background: #f7f6ef; border: 1px solid #dfe3d8; border-radius: 0.25rem; display: grid; gap: 0.4rem; padding: 0.6rem;`;
const Item = styled.div`align-items: center; display: flex; gap: 0.4rem; justify-content: space-between;`;
const Text = styled.span`color: #52665b; font-size: 0.7rem;`;
const Select = styled.select`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.2rem; color: #173c35; font: inherit; font-size: 0.72rem; min-height: 2rem; padding: 0.3rem;`;

export default function AdminCycleReview({ cycleId, status }) {
  const { authConfig } = useAuthContext();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [membershipId, setMembershipId] = useState("");
  const cycle = useApiQuery({ key: `cycle-${cycleId}`, url: open ? `${APIConstants.cycles}/${cycleId}` : null, authConfig, enabled: open });
  const claims = useApiQuery({ key: `cycle-${cycleId}-claims`, url: open ? `${APIConstants.cycles}/${cycleId}/claims` : null, authConfig, enabled: open });
  const members = useApiQuery({ key: `cycle-${cycleId}-members`, url: open && cycle.data?.groupId ? `${APIConstants.groups}/${cycle.data.groupId}/memberships` : null, authConfig, enabled: Boolean(open && cycle.data?.groupId) });
  const select = async (path, body) => {
    await api({ url: path, method: "POST", body }, authConfig);
    await Promise.all([claims.refetch(), cycle.refetch(), members.refetch(), queryClient.invalidateQueries({ queryKey: ["cycles"] })]);
  };
  const changeBidding = async (action) => {
    await api({ url: `${APIConstants.cycles}/${cycleId}/${action}`, method: "POST" }, authConfig);
    await queryClient.invalidateQueries({ queryKey: ["cycles"] });
  };
  return <Wrap>{status === "SCHEDULED" && <Button type="button" onClick={() => changeBidding("open-bidding")}>Open claims</Button>}<Button type="button" onClick={() => setOpen((current) => !current)}>{open ? "Hide claims" : "Review claims"}</Button>{open && <Panel>{claims.data?.map((claim) => <Item key={`claim-${claim.id}`}><Text>{claim.username || claim.membershipId}{claim.note ? ` — ${claim.note}` : ""}</Text>{status === "BIDDING_OPEN" && <Button type="button" onClick={() => select(`${APIConstants.cycles}/${cycleId}/claims/${claim.id}/approve`)}>Select claimant</Button>}</Item>)}{!claims.data?.length && <Text>No member claims yet.</Text>}{status === "BIDDING_OPEN" && <Item><Select aria-label="Select group member" value={membershipId} onChange={(event) => setMembershipId(event.target.value)}><option value="">Select any active member</option>{(members.data || []).filter((member) => member.active).map((member) => <option key={member.id} value={member.id}>{member.displayName || member.username}</option>)}</Select><Button type="button" disabled={!membershipId} onClick={() => select(`${APIConstants.cycles}/${cycleId}/select-member`, { membershipId: Number(membershipId) })}>Select member</Button></Item>}</Panel>}</Wrap>;
}
