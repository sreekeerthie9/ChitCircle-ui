"use client";

import { DownloadOutlined, ExpandLess, FactCheckOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { MESSAGE_TYPE } from "@/constants/Common";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import { useApiQuery } from "@/hooks/useApi";
import { api } from "@/utils/APIMethods";

const Wrap = styled.div`display: grid; gap: 0.5rem; min-width: 12.5rem;`;
const Button = styled.button`align-items: center; background: #e8eee5; border: 0; border-radius: 0.25rem; color: #173c35; cursor: pointer; display: inline-flex; font: inherit; font-size: 0.72rem; font-weight: 700; gap: 0.35rem; justify-content: center; min-height: 2.25rem; padding: 0.5rem 0.65rem; &:hover { background: #dce7dc; } &:disabled { cursor: wait; opacity: 0.6; }`;
const Panel = styled.div`background: #f7f6ef; border: 1px solid #dfe3d8; border-radius: 0.35rem; display: grid; gap: 0.65rem; padding: 0.7rem;`;
const Document = styled.article`background: #fffdf8; border: 1px solid #e2e7de; border-radius: 0.3rem; display: grid; gap: 0.55rem; padding: 0.7rem;`;
const DocumentHeader = styled.div`align-items: flex-start; display: flex; gap: 0.5rem; justify-content: space-between;`;
const DocumentName = styled.strong`color: #173c35; display: block; font-size: 0.76rem;`;
const Meta = styled.span`color: #6d7c73; font-size: 0.68rem; overflow-wrap: anywhere;`;
const Status = styled.span`background: ${(props) => props.$status === "VERIFIED" ? "#e5f0e6" : props.$status === "REJECTED" ? "#fbe8df" : "#f7efd7"}; border-radius: 99px; color: ${(props) => props.$status === "VERIFIED" ? "#317052" : props.$status === "REJECTED" ? "#a34c2e" : "#9a6a1b"}; font-size: 0.62rem; font-weight: 800; padding: 0.25rem 0.45rem; white-space: nowrap;`;
const ReviewForm = styled.div`border-top: 1px solid #e8ebe2; display: grid; gap: 0.5rem; padding-top: 0.6rem;`;
const ReviewFields = styled.div`display: grid; gap: 0.45rem; grid-template-columns: 6.5rem minmax(0, 1fr);`;
const Input = styled.input`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.2rem; color: #173c35; font: inherit; font-size: 0.7rem; min-height: 2rem; min-width: 0; padding: 0.35rem;`;
const Select = styled.select`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.2rem; color: #173c35; font: inherit; font-size: 0.7rem; min-height: 2rem; padding: 0.35rem;`;
const Message = styled.div`color: #52665b; font-size: 0.7rem; line-height: 1.4;`;

export default function KycReview({
  username,
  documentsUrl = `${APIConstants.kyc}/users/${encodeURIComponent(username)}/documents`,
  documentsParams,
  onReviewed,
}) {
  const { authConfig } = useAuthContext();
  const showSnackbar = useSnackbar();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("VERIFIED");
  const [reviewingId, setReviewingId] = useState(null);
  const documents = useApiQuery({ key: `kyc-documents-${username}`, url: open && username ? documentsUrl : null, params: documentsParams, authConfig, enabled: Boolean(open && username) });
  const userDocuments = (documents.data || []).filter(
    (item) => !item.username || item.username === username,
  );
  const review = async (documentId) => {
    setReviewingId(documentId);
    try {
      await api({ url: `${APIConstants.kycDocuments}/${documentId}/review`, method: "POST", body: { status, note } }, authConfig);
      await Promise.all([documents.refetch(), onReviewed?.()]);
      setNote("");
      showSnackbar("KYC review saved.", MESSAGE_TYPE.success);
    } catch (error) {
      showSnackbar(error?.message || "We could not save the KYC review.", MESSAGE_TYPE.error);
    } finally {
      setReviewingId(null);
    }
  };
  const download = async (item) => {
    try {
      const blob = await api({ url: `${APIConstants.kycDocuments}/${item.id}/download`, responseType: "blob" }, authConfig);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = item.fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      showSnackbar(error?.message || "We could not download this document.", MESSAGE_TYPE.error);
    }
  };
  return <Wrap><Button type="button" onClick={() => setOpen((current) => !current)}>{open ? <ExpandLess fontSize="small" /> : <FactCheckOutlined fontSize="small" />}{open ? "Hide KYC" : "Review KYC"}</Button>{open && <Panel>{documents.isLoading ? <Message>Loading documents...</Message> : documents.isError ? <Message>Unable to load KYC documents: {documents.error?.message || "The admin may not have access to this member."}</Message> : userDocuments.length ? userDocuments.map((item) => <Document key={item.id}><DocumentHeader><div><DocumentName>{String(item.documentType || "Document").replaceAll("_", " ")}</DocumentName><Meta>{item.fileName}</Meta></div><Status $status={item.status}>{item.status}</Status></DocumentHeader><Button type="button" onClick={() => download(item)}><DownloadOutlined fontSize="small" /> Download</Button>{item.status === "PENDING" && <ReviewForm><ReviewFields><Select aria-label="KYC decision" value={status} onChange={(event) => setStatus(event.target.value)}><option value="VERIFIED">Verify</option><option value="REJECTED">Reject</option></Select><Input placeholder="Review note (optional)" value={note} onChange={(event) => setNote(event.target.value)} /></ReviewFields><Button type="button" disabled={reviewingId === item.id} onClick={() => review(item.id)}>{reviewingId === item.id ? "Saving..." : "Save decision"}</Button></ReviewForm>}</Document>) : <Message>No documents submitted for {username}.</Message>}</Panel>}</Wrap>;
}
