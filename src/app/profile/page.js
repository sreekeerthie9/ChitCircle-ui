"use client";

import { useState } from "react";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";
import { api } from "@/utils/APIMethods";

const Shell = styled.main`color: #173c35; max-width: 720px; margin: 0 auto;`;
const Title = styled.h1`font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); margin: 0 0 1.5rem;`;
const Form = styled.form`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.35rem; display: grid; gap: 0.8rem; padding: 1.2rem;`;
const Label = styled.label`color: #76847b; display: grid; font-size: 0.75rem; font-weight: 700; gap: 0.35rem; text-transform: uppercase;`;
const Input = styled.input`background: #f7f6ef; border: 1px solid #dfe3d8; border-radius: 0.3rem; color: #173c35; font: inherit; padding: 0.75rem;`;
const Button = styled.button`background: #173c35; border: 0; border-radius: 0.3rem; color: #fffaf0; cursor: pointer; font: inherit; font-weight: 700; padding: 0.75rem 1rem; width: fit-content;`;
const Kyc = styled.div`background: #e8eee5; border-radius: 0.3rem; color: #317052; font-size: 0.82rem; padding: 0.75rem;`;

export default function ProfilePage() {
  const { authConfig } = useAuthContext();
  const username = authConfig?.username;
  const query = useApiQuery({ key: "profile", url: username ? `${APIConstants.users}/${encodeURIComponent(username)}` : null, authConfig, enabled: Boolean(username) });
  return <Shell><Title>Profile & KYC</Title>{query.isLoading ? <Kyc>Loading profile...</Kyc> : query.isError ? <Kyc>We could not load your profile. Please try again.</Kyc> : query.data ? <ProfileForm username={username} authConfig={authConfig} profile={query.data} onSaved={query.refetch} /> : <Kyc>No profile is available for this account.</Kyc>}</Shell>;
}

function ProfileForm({ username, authConfig, profile, onSaved }) {
  const [form, setForm] = useState({ displayName: profile.displayName || "", email: profile.email || "", phone: profile.phone || "" });
  const submit = async (event) => { event.preventDefault(); await api({ url: `${APIConstants.users}/${username}`, method: "PUT", body: form }, authConfig); await onSaved(); };
  return <Form onSubmit={submit}><Kyc>KYC status: {profile.kycStatus || "NOT_STARTED"}</Kyc><Label>Display name<Input value={form.displayName} onChange={(event) => setForm({ ...form, displayName: event.target.value })} /></Label><Label>Email<Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></Label><Label>Phone<Input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></Label><Button type="submit">Save profile</Button></Form>;
}
