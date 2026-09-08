"use client";

import { useState } from "react";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";
import { api } from "@/utils/APIMethods";

const Section = styled.section`
  background: #fffdf8;
  border: 1px solid #dfe3d8;
  border-radius: 0.35rem;
  margin-bottom: 1.5rem;
  padding: 1.2rem 1.3rem;
`;
const Heading = styled.div`display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 1rem;`;
const Title = styled.h2`font-size: 1rem; margin: 0;`;
const Meta = styled.p`color: #76847b; font-size: 0.78rem; margin: 0.3rem 0 0;`;
const Rows = styled.div`display: grid; gap: 0.8rem;`;
const Row = styled.div`align-items: center; border-top: 1px solid #e8ebe2; display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: space-between; padding-top: 0.8rem;`;
const Field = styled.input`background: #f7f6ef; border: 1px solid #dfe3d8; border-radius: 0.25rem; color: #173c35; font: inherit; min-height: 2.3rem; padding: 0.5rem; width: 14rem;`;
const Button = styled.button`background: #173c35; border: 0; border-radius: 0.25rem; color: #fffaf0; cursor: pointer; font: inherit; font-size: 0.76rem; font-weight: 700; padding: 0.65rem 0.8rem;`;
const Status = styled.span`color: #317052; font-size: 0.75rem; font-weight: 700;`;

export default function CustomerCycleActions() {
  const { authConfig } = useAuthContext();
  const query = useApiQuery({ key: "customer-open-cycles", url: APIConstants.customerCycles, authConfig });
  const [notes, setNotes] = useState({});
  const openCycles = (query.data || []).filter((cycle) => cycle.status === "BIDDING_OPEN");

  const submitClaim = async (cycle) => {
    await api({ url: `${APIConstants.customerCycles}/${cycle.id}/claims`, method: "POST", body: { note: notes[cycle.id] || "" } }, authConfig);
    await query.refetch();
  };

  return <Section><Heading><div><Title>Open monthly chits</Title><Meta>{query.isLoading ? "Loading open claim windows..." : "Request this month's chit fund with an optional comment."}</Meta></div></Heading>{query.isError ? <Meta>Unable to load open cycles.</Meta> : openCycles.length === 0 ? <Meta>No claim windows are open right now.</Meta> : <Rows>{openCycles.map((cycle) => <Row key={cycle.id}><div><strong>{cycle.groupName}</strong><Meta>{cycle.schemeName} · Cycle {cycle.cycleNumber} · ₹{Number(cycle.potAmount).toLocaleString("en-IN")}</Meta></div><Field placeholder="Optional comment" disabled={cycle.hasClaim} value={notes[cycle.id] || ""} onChange={(event) => setNotes((current) => ({ ...current, [cycle.id]: event.target.value }))} />{cycle.hasClaim ? <Status>Claim submitted</Status> : <Button type="button" onClick={() => submitClaim(cycle)}>Request chit</Button>}</Row>)}</Rows>}</Section>;
}
