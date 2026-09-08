"use client";

import { Close } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  align-items: center;
  background: rgba(23, 60, 53, 0.35);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: 1rem;
  position: fixed;
  z-index: 20;
`;
const Dialog = styled.form`
  background: #fffdf8;
  border: 1px solid #dfe3d8;
  border-radius: 0.4rem;
  box-shadow: 0 20px 60px rgba(23, 60, 53, 0.2);
  max-width: 34rem;
  padding: 1.5rem;
  width: 100%;
`;
const Heading = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;
const Title = styled.h2`color: #173c35; font-size: 1.1rem; margin: 0;`;
const CloseButton = styled.button`background: transparent; border: 0; color: #65736c; cursor: pointer; padding: 0.2rem;`;
const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;
const Field = styled.label`
  color: #52665b;
  display: flex;
  flex-direction: column;
  font-size: 0.72rem;
  font-weight: 700;
  gap: 0.4rem;
  input, select { background: #f7f6ef; border: 1px solid #dfe3d8; border-radius: 0.25rem; color: #173c35; font: inherit; min-height: 2.5rem; padding: 0.55rem; }
`;
const Footer = styled.div`display: flex; gap: 0.7rem; justify-content: flex-end; margin-top: 1.5rem;`;
const Button = styled.button`
  background: ${(props) => (props.$primary ? "#173c35" : "#e8eee5")};
  border: 0;
  border-radius: 0.25rem;
  color: ${(props) => (props.$primary ? "#fffaf0" : "#173c35")};
  cursor: pointer;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.7rem 1rem;
`;

export default function PaymentDialog({ open, onClose, onSubmit, pending, cycleOptions, customerOptions }) {
  const [values, setValues] = useState({ method: "MANUAL", dueDate: new Date().toISOString().slice(0, 10) });
  if (!open) return null;
  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    onSubmit({ ...values, cycleId: Number(values.cycleId), amount: Number(values.amount) });
  };
  return (
    <Backdrop onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <Dialog onSubmit={submit}>
        <Heading>
          <Title>Record member contribution</Title>
          <CloseButton type="button" onClick={onClose} aria-label="Close"><Close fontSize="small" /></CloseButton>
        </Heading>
        <Grid>
          <Field>Cycle<select required value={values.cycleId || ""} onChange={update("cycleId")}><option value="">Select a cycle</option>{cycleOptions.map((cycle) => <option key={cycle.id} value={cycle.id}>{cycle.groupName || `Group #${cycle.groupId}`} - Cycle {cycle.cycleNumber}</option>)}</select></Field>
          <Field>Member<select required value={values.username || ""} onChange={update("username")}><option value="">Select a member</option>{customerOptions.map((customer) => <option key={customer.id} value={customer.username}>{customer.displayName || customer.username}</option>)}</select></Field>
          <Field>Amount<input required min="0.01" step="0.01" type="number" value={values.amount || ""} onChange={update("amount")} /></Field>
          <Field>Due date<input required type="date" value={values.dueDate || ""} onChange={update("dueDate")} /></Field>
          <Field>Payment method<select value={values.method} onChange={update("method")}><option value="MANUAL">Manual</option><option value="CASH">Cash</option><option value="UPI">UPI</option><option value="BANK_TRANSFER">Bank transfer</option></select></Field>
        </Grid>
        <Footer><Button type="button" onClick={onClose}>Cancel</Button><Button $primary type="submit" disabled={pending}>{pending ? "Saving..." : "Record payment"}</Button></Footer>
      </Dialog>
    </Backdrop>
  );
}
