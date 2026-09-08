"use client";

import { useState } from "react";
import styled from "styled-components";
import { MESSAGE_TYPE } from "@/constants/Common";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import { useApiQuery } from "@/hooks/useApi";
import { api } from "@/utils/APIMethods";
import { useQueryClient } from "@tanstack/react-query";

const Wrap = styled.div`
  display: grid;
  gap: 0.45rem;
  min-width: 12rem;
`;
const Button = styled.button`
  background: #e8eee5;
  border: 0;
  border-radius: 0.25rem;
  color: #173c35;
  cursor: pointer;
  font: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.5rem 0.65rem;
`;
const Panel = styled.div`
  background: #f7f6ef;
  border: 1px solid #dfe3d8;
  border-radius: 0.25rem;
  display: grid;
  gap: 0.4rem;
  padding: 0.6rem;
`;
const Item = styled.div`
  align-items: center;
  display: flex;
  gap: 0.4rem;
  justify-content: space-between;
`;
const Text = styled.span`
  color: #52665b;
  font-size: 0.7rem;
`;
const Field = styled.label`
  color: #52665b;
  display: grid;
  font-size: 0.7rem;
  font-weight: 700;
  gap: 0.3rem;
  input,
  select {
    background: #fffdf8;
    border: 1px solid #dfe3d8;
    border-radius: 0.2rem;
    color: #173c35;
    font: inherit;
    min-height: 2rem;
    padding: 0.3rem;
  }
`;
const Select = styled.select`
  background: #fffdf8;
  border: 1px solid #dfe3d8;
  border-radius: 0.2rem;
  color: #173c35;
  font: inherit;
  font-size: 0.72rem;
  min-height: 2rem;
  padding: 0.3rem;
`;

export default function AdminCycleReview({ cycleId, status }) {
  const { authConfig } = useAuthContext();
  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [membershipId, setMembershipId] = useState("");
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("MANUAL");
  const [payoutNote, setPayoutNote] = useState("");
  const [payoutPending, setPayoutPending] = useState(false);
  const cycle = useApiQuery({
    key: `cycle-${cycleId}`,
    url: open ? `${APIConstants.cycles}/${cycleId}` : null,
    authConfig,
    enabled: open,
  });
  const claims = useApiQuery({
    key: `cycle-${cycleId}-claims`,
    url: open ? `${APIConstants.cycles}/${cycleId}/claims` : null,
    authConfig,
    enabled: open,
  });
  const members = useApiQuery({
    key: `cycle-${cycleId}-members`,
    url:
      open && cycle.data?.groupId
        ? `${APIConstants.groups}/${cycle.data.groupId}/memberships`
        : null,
    authConfig,
    enabled: Boolean(open && cycle.data?.groupId),
  });
  const select = async (path, body, winnerName) => {
    const response = await api({ url: path, method: "POST", body }, authConfig);
    await Promise.all([
      claims.refetch(),
      cycle.refetch(),
      members.refetch(),
      queryClient.invalidateQueries({ queryKey: ["cycles"] }),
    ]);
    const persistedWinner =
      response?.winnerName ||
      response?.winnerUsername ||
      response?.winner?.displayName ||
      response?.winner?.username;
    queryClient.setQueriesData({ queryKey: ["cycles"] }, (cycles) =>
      Array.isArray(cycles)
        ? cycles.map((item) =>
            Number(item.id) === Number(cycleId)
              ? { ...item, winnerName: persistedWinner || winnerName }
              : item,
          )
        : cycles,
    );
    showSnackbar("Winner selected successfully.", MESSAGE_TYPE.success);
  };
  const changeBidding = async (action) => {
    await api(
      { url: `${APIConstants.cycles}/${cycleId}/${action}`, method: "POST" },
      authConfig,
    );
    await queryClient.invalidateQueries({ queryKey: ["cycles"] });
  };
  const recordPayout = async (event) => {
    event.preventDefault();
    setPayoutPending(true);
    const body = new FormData(event.currentTarget);
    try {
      await api({
        url: `${APIConstants.cycles}/${cycleId}/payout`,
        method: "POST",
        body,
        isFormData: true,
      }, authConfig);
      await Promise.all([
        cycle.refetch(),
        queryClient.invalidateQueries({ queryKey: ["cycles"] }),
        queryClient.invalidateQueries({ queryKey: ["payments"] }),
        queryClient.invalidateQueries({ queryKey: ["customer-payments"] }),
      ]);
      setPayoutOpen(false);
      showSnackbar("Payout recorded successfully.", MESSAGE_TYPE.success);
    } finally {
      setPayoutPending(false);
    }
  };
  return (
    <Wrap>
      {status === "SCHEDULED" && (
        <Button type="button" onClick={() => changeBidding("open-bidding")}>
          Open claims
        </Button>
      )}
      <Button type="button" onClick={() => setOpen((current) => !current)}>
        {open ? "Hide claims" : "Review claims"}
      </Button>
      {open && (
        <Panel>
          {cycle.data?.winnerMembershipId && !cycle.data?.payoutRecorded && (
            <>
              <Button type="button" onClick={() => setPayoutOpen((current) => !current)}>
                {payoutOpen ? "Hide payout form" : "Record full payout"}
              </Button>
              {payoutOpen && (
                <form onSubmit={recordPayout}>
                  <Panel>
                    <Field>Amount<input name="amount" required min="0.01" step="0.01" type="number" value={payoutAmount} onChange={(event) => setPayoutAmount(event.target.value)} /></Field>
                    <Field>Method<select name="method" value={payoutMethod} onChange={(event) => setPayoutMethod(event.target.value)}><option value="MANUAL">Manual</option><option value="BANK_TRANSFER">Bank transfer</option><option value="UPI">UPI</option><option value="CASH">Cash</option></select></Field>
                    <Field>Note<input name="note" value={payoutNote} onChange={(event) => setPayoutNote(event.target.value)} /></Field>
                    <Button type="submit" disabled={payoutPending}>{payoutPending ? "Saving..." : "Confirm payout"}</Button>
                  </Panel>
                </form>
              )}
            </>
          )}
          {cycle.data?.payoutRecorded && <Text>Payout recorded for the selected member.</Text>}
          {claims.data?.map((claim) => (
            <Item key={`claim-${claim.id}`}>
              <Text>
                {claim.username || claim.membershipId}
                {claim.note ? ` — ${claim.note}` : ""}
              </Text>
              {status === "BIDDING_OPEN" && (
                <Button
                  type="button"
                  onClick={() =>
                    select(
                      `${APIConstants.cycles}/${cycleId}/claims/${claim.id}/approve`,
                      undefined,
                      claim.username || claim.displayName || claim.name || `Member #${claim.membershipId}`,
                    )
                  }
                >
                  Select claimant
                </Button>
              )}
            </Item>
          ))}
          {!claims.data?.length && <Text>No member claims yet.</Text>}
          {status === "BIDDING_OPEN" && (
            <Item>
              <Select
                aria-label="Select group member"
                value={membershipId}
                onChange={(event) => setMembershipId(event.target.value)}
              >
                <option value="">Select any active member</option>
                {(members.data || [])
                  .filter((member) => member.active)
                  .map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.displayName || member.username}
                    </option>
                  ))}
              </Select>
              <Button
                type="button"
                disabled={!membershipId}
                onClick={() =>
                  select(
                    `${APIConstants.cycles}/${cycleId}/select-member`,
                    { membershipId: Number(membershipId) },
                    (() => {
                      const member = (members.data || []).find(
                        (item) => Number(item.id) === Number(membershipId),
                      );
                      return (
                        member?.displayName ||
                        member?.username ||
                        `Member #${membershipId}`
                      );
                    })(),
                  )
                }
              >
                Select member
              </Button>
            </Item>
          )}
        </Panel>
      )}
    </Wrap>
  );
}
