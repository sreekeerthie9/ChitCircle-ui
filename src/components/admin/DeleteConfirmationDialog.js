"use client";

import { Close } from "@mui/icons-material";
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
  max-width: 32rem;
  padding: 1.5rem;
  width: 100%;
`;

const Heading = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled.h2`
  color: #173c35;
  font-size: 1.1rem;
  margin: 0;
`;

const Message = styled.p`
  color: #52665b;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 1rem 0 0;
`;

const Warning = styled(Message)`
  background: #fbe8df;
  border-radius: 0.25rem;
  color: #8c3c24;
  padding: 0.7rem 0.8rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 0;
  color: #65736c;
  cursor: pointer;
  padding: 0.2rem;
`;

const Footer = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  background: #e8eee5;
  border: 0;
  border-radius: 0.25rem;
  color: #173c35;
  cursor: pointer;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.7rem 1rem;
`;

const DeleteButton = styled(Button)`
  background: #a34c2e;
  color: #fffaf0;
`;

export default function DeleteConfirmationDialog({ open, title, message, warning, blocked = false, pending, onClose, onConfirm }) {
  if (!open) return null;
  const submit = (event) => { event.preventDefault(); if (!blocked) onConfirm(); };
  return <Backdrop onMouseDown={(event) => event.target === event.currentTarget && onClose()}><Dialog onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="delete-confirmation-title"><Heading><Title id="delete-confirmation-title">{title}</Title><CloseButton type="button" onClick={onClose} aria-label="Close"><Close fontSize="small" /></CloseButton></Heading><Message>{message}</Message>{warning && <Warning>{warning}</Warning>}<Footer><Button type="button" onClick={onClose}>{blocked ? "Close" : "Cancel"}</Button>{!blocked && <DeleteButton type="submit" disabled={pending}>{pending ? "Deleting..." : "Delete"}</DeleteButton>}</Footer></Dialog></Backdrop>;
}
