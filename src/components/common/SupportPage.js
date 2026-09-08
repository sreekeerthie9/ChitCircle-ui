"use client";

import { useState } from "react";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";

const Shell = styled.main`color: #173c35; max-width: 900px; margin: 0 auto;`;
const Title = styled.h1`font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); margin: 0 0 1.5rem;`;
const Form = styled.form`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.35rem; display: grid; gap: 0.8rem; padding: 1.2rem; margin-bottom: 1.5rem;`;
const Input = styled.input`background: #f7f6ef; border: 1px solid #dfe3d8; border-radius: 0.3rem; color: #173c35; font: inherit; padding: 0.75rem;`;
const Textarea = styled.textarea`${Input}; min-height: 7rem; resize: vertical;`;
const Button = styled.button`background: #173c35; border: 0; border-radius: 0.3rem; color: #fffaf0; cursor: pointer; font: inherit; font-weight: 700; padding: 0.75rem 1rem; width: fit-content;`;
const Ticket = styled.article`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.35rem; padding: 1rem 1.2rem; margin-bottom: 0.75rem;`;
const Meta = styled.div`color: #76847b; font-size: 0.78rem; margin-top: 0.4rem;`;

export default function SupportPage() {
  const { authConfig } = useAuthContext();
  const [form, setForm] = useState({ subject: "", description: "" });
  const query = useApiQuery({ key: "support-tickets", url: APIConstants.support, authConfig });
  const mutation = useApiMutation({ key: "support-tickets", url: APIConstants.support, authConfig, onSuccess: () => setForm({ subject: "", description: "" }) });
  const submit = (event) => { event.preventDefault(); mutation.mutate(form); };
  return <Shell><Title>Support</Title><Form onSubmit={submit}><Input required placeholder="Subject" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} /><Textarea required placeholder="Describe the issue" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /><Button type="submit">Raise ticket</Button></Form>{(query.data || []).map((ticket) => <Ticket key={ticket.id}><strong>{ticket.subject}</strong><Meta>{ticket.status} · {ticket.priority}</Meta><p>{ticket.description}</p></Ticket>)}</Shell>;
}
