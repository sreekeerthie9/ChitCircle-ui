"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
  const [documentType, setDocumentType] = useState("GOVERNMENT_ID");
  const [document, setDocument] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const documents = useApiQuery({ key: `kyc-documents-${username}`, url: APIConstants.kycDocuments, authConfig, enabled: Boolean(username) });
  const submit = async (event) => { event.preventDefault(); await api({ url: `${APIConstants.users}/${username}`, method: "PUT", body: form }, authConfig); await onSaved(); };
  const upload = async (event) => {
    event.preventDefault();
    if (!document) return;
    const formElement = event.currentTarget;
    setUploading(true);
    setMessage("");
    try {
      const body = new FormData();
      body.append("documentType", documentType);
      body.append("document", document);
      const uploadedDocument = await api({ url: APIConstants.kycDocuments, method: "POST", body, isFormData: true }, authConfig);
      setDocument(null);
      formElement.reset();
      setMessage("Document uploaded. An admin will review it.");
      queryClient.setQueryData([`kyc-documents-${username}`, undefined], (currentDocuments) => {
        const existingDocuments = Array.isArray(currentDocuments) ? currentDocuments : [];
        return uploadedDocument ? [uploadedDocument, ...existingDocuments] : existingDocuments;
      });
      await Promise.all([documents.refetch(), onSaved()]);
    } catch (error) {
      setMessage(error?.message || "We could not upload the document.");
    } finally {
      setUploading(false);
    }
  };
  return <><Form onSubmit={submit}><Kyc>KYC status: {profile.kycStatus || "NOT_STARTED"}</Kyc><Label>Display name<Input value={form.displayName} onChange={(event) => setForm({ ...form, displayName: event.target.value })} /></Label><Label>Email<Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></Label><Label>Phone<Input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></Label><Button type="submit">Save profile</Button></Form><Form onSubmit={upload}><Kyc>Upload a clear PDF, JPG, PNG, or WebP document. Maximum size: 10 MB.</Kyc><Label>Document type<select value={documentType} onChange={(event) => setDocumentType(event.target.value)}><option value="GOVERNMENT_ID">Government ID</option><option value="PAN">PAN</option><option value="PASSPORT">Passport</option><option value="DRIVING_LICENSE">Driving license</option><option value="ADDRESS_PROOF">Address proof</option></select></Label><Label>Document<Input required type="file" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={(event) => setDocument(event.target.files?.[0] || null)} /></Label><Button type="submit" disabled={uploading}>{uploading ? "Uploading..." : "Submit for KYC review"}</Button>{message && <Kyc>{message}</Kyc>}</Form><Form><Kyc>Submitted documents</Kyc>{documents.isLoading ? <Kyc>Loading documents...</Kyc> : documents.data?.length ? documents.data.map((item) => <div key={item.id}>{item.documentType} - {item.fileName} - {item.status}</div>) : <div>No documents submitted yet.</div>}</Form></>;
}
