"use client";

import { useState } from "react";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";
import { api } from "@/utils/APIMethods";

const Wrap = styled.div`display: grid; gap: 0.45rem; min-width: 13rem;`;
const Button = styled.button`background: #e8eee5; border: 0; border-radius: 0.25rem; color: #173c35; cursor: pointer; font: inherit; font-size: 0.72rem; font-weight: 700; padding: 0.5rem 0.65rem;`;
const Panel = styled.div`background: #f7f6ef; border: 1px solid #dfe3d8; border-radius: 0.25rem; display: grid; gap: 0.5rem; padding: 0.65rem;`;
const Item = styled.div`color: #52665b; display: grid; font-size: 0.7rem; gap: 0.25rem;`;
const Select = styled.select`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.2rem; color: #173c35; font: inherit; min-height: 2rem; padding: 0.3rem;`;
const Note = styled.input`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.2rem; color: #173c35; font: inherit; min-height: 2rem; padding: 0.3rem;`;

export default function KycReview({ username }) {
  const { authConfig } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("VERIFIED");
  const documents = useApiQuery({ key: `kyc-documents-${username}`, url: open && username ? `${APIConstants.kyc}/users/${encodeURIComponent(username)}/documents` : null, authConfig, enabled: Boolean(open && username) });
  const review = async (documentId) => {
    await api({ url: `${APIConstants.kycDocuments}/${documentId}/review`, method: "POST", body: { status, note } }, authConfig);
    await documents.refetch();
  };
  const download = async (item) => {
    const blob = await api({ url: `${APIConstants.kycDocuments}/${item.id}/download`, responseType: "blob" }, authConfig);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = item.fileName;
    link.click();
    URL.revokeObjectURL(url);
  };
  return <Wrap><Button type="button" onClick={() => setOpen((current) => !current)}>{open ? "Hide KYC" : "Review KYC"}</Button>{open && <Panel>{documents.isLoading ? <Item>Loading documents...</Item> : documents.isError ? <Item>Unable to load KYC documents: {documents.error?.message || "The admin may not have access to this member."}</Item> : documents.data?.length ? documents.data.map((item) => <Item key={item.id}><strong>{item.documentType} - {item.status}</strong><span>{item.fileName}</span><Button type="button" onClick={() => download(item)}>Download document</Button>{item.status === "PENDING" && <><Select value={status} onChange={(event) => setStatus(event.target.value)}><option value="VERIFIED">Verify</option><option value="REJECTED">Reject</option></Select><Note placeholder="Review note" value={note} onChange={(event) => setNote(event.target.value)} /><Button type="button" onClick={() => review(item.id)}>Save review</Button></>}</Item>) : <Item>No documents submitted for {username}.</Item>}</Panel>}</Wrap>;
}
