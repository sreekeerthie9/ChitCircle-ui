"use client";

import { Close, CloudUpload, Download } from "@mui/icons-material";
import { useState } from "react";
import * as XLSX from "xlsx";
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
  max-height: calc(100vh - 2rem);
  max-width: 58rem;
  overflow: auto;
  padding: 1.5rem;
  width: 100%;
`;

const Heading = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const Title = styled.h2`
  color: #173c35;
  font-size: 1.1rem;
  margin: 0;
`;

const Hint = styled.p`
  color: #76847b;
  font-size: 0.78rem;
  margin: 0.35rem 0 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 0;
  color: #65736c;
  cursor: pointer;
  padding: 0.2rem;
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

const StartRow = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(12rem, 18rem) 1fr;
  margin-bottom: 1.25rem;
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

const TableWrap = styled.div`
  border: 1px solid #e8ebe2;
  max-height: 24rem;
  overflow: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  min-width: 42rem;
  width: 100%;
  th, td { border-bottom: 1px solid #e8ebe2; padding: 0.55rem 0.65rem; text-align: left; }
  th { background: #f7f6ef; color: #7a887e; font-size: 0.66rem; position: sticky; text-transform: uppercase; top: 0; z-index: 1; }
  td { color: #36554a; font-size: 0.78rem; }
  input { background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.2rem; color: #173c35; min-height: 2rem; padding: 0.35rem; width: 8rem; }
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.7rem;
  justify-content: flex-end;
  margin-top: 1.25rem;
  @media (max-width: 620px) { align-items: stretch; flex-direction: column-reverse; }
`;

const Button = styled.button`
  align-items: center;
  background: ${(props) => props.$primary ? "#173c35" : "#e8eee5"};
  border: 0;
  border-radius: 0.25rem;
  color: ${(props) => props.$primary ? "#fffaf0" : "#173c35"};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  gap: 0.4rem;
  justify-content: center;
  padding: 0.7rem 1rem;
`;

const ErrorText = styled.p`
  color: #a34c2e;
  font-size: 0.78rem;
  margin: 0.8rem 0 0;
`;

const ordinal = (number) => {
  const remainder = number % 100;
  if (remainder >= 11 && remainder <= 13) return `${number}th`;
  const suffixes = { 1: "st", 2: "nd", 3: "rd" };
  return `${number}${suffixes[number % 10] || "th"}`;
};

const monthRows = (startDate, duration, defaults = []) => {
  const date = new Date(`${startDate}T00:00:00`);
  const scheduleByMonth = new Map((defaults || []).map((row) => [Number(row.monthNumber), row]));
  return Array.from({ length: Number(duration) || 0 }, (_, index) => {
    const existing = scheduleByMonth.get(index + 1) || {};
    const monthDate = new Date(date.getFullYear(), date.getMonth() + index, 1);
    return {
      monthNumber: index + 1,
      month: monthDate.toLocaleString("en-US", { month: "long" }),
      year: monthDate.getFullYear(),
      pitAmount: existing.pitAmount ?? "",
      memberPayment: existing.memberPayment ?? ""
    };
  });
};

export function AdvancedSchemeDialog({ open, scheme, onClose, onSubmit, pending }) {
  const startDate = scheme?.startDate || new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(startDate);
  const [rows, setRows] = useState(() => monthRows(startDate, scheme?.durationMonths, scheme?.schedule));
  if (!open || !scheme) return null;
  const regenerate = (value) => { setDate(value); setRows(monthRows(value, scheme.durationMonths, rows)); };
  const updateRow = (index, key, value) => setRows((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: value } : row));
  const submit = (event) => { event.preventDefault(); onSubmit({ startDate: date, schedule: rows.map(({ monthNumber, month, year, pitAmount, memberPayment }) => ({ monthNumber, month, year, pitAmount: Number(pitAmount), memberPayment: Number(memberPayment) })) }); };
  return <Backdrop onMouseDown={(event) => event.target === event.currentTarget && onClose()}><Dialog onSubmit={submit}><Heading><div><Title>Advanced schedule · {scheme.name}</Title><Hint>Set what members pay and the pit amount released for every month.</Hint></div><CloseButton type="button" onClick={onClose} aria-label="Close"><Close fontSize="small" /></CloseButton></Heading><StartRow><Field>First month<input type="date" value={date} onChange={(event) => regenerate(event.target.value)} required /></Field><Hint>Month labels are calculated automatically from this date.</Hint></StartRow><TableWrap><Table><thead><tr><th>Period</th><th>Month</th><th>Year</th><th>Pit amount</th><th>Member payment</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.monthNumber}><td>{ordinal(row.monthNumber)}</td><td>{row.month}</td><td>{row.year}</td><td><input aria-label={`Pit amount for month ${row.monthNumber}`} min="0" required type="number" value={row.pitAmount} onChange={(event) => updateRow(index, "pitAmount", event.target.value)} /></td><td><input aria-label={`Member payment for month ${row.monthNumber}`} min="0" required type="number" value={row.memberPayment} onChange={(event) => updateRow(index, "memberPayment", event.target.value)} /></td></tr>)}</tbody></Table></TableWrap><Footer><Button type="button" onClick={onClose}>Cancel</Button><Button $primary type="submit" disabled={pending}>{pending ? "Saving..." : "Save schedule"}</Button></Footer></Dialog></Backdrop>;
}

const expectedHeaders = ["month number", "pit amount", "member payment"];
const normaliseHeader = (header) => String(header).trim().toLowerCase().replaceAll("_", " ");

export function BulkSchemeUploadDialog({ open, schemes, onClose, onSubmit, pending }) {
  const [schemeId, setSchemeId] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  if (!open) return null;
  const downloadTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet([{ "month number": 1, "pit amount": 300000, "member payment": 13000 }]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Scheme schedule");
    XLSX.writeFile(workbook, "scheme-schedule-template.xlsx");
  };
  const readFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
      const records = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: "" });
      const headers = records.length ? Object.keys(records[0]).map(normaliseHeader) : [];
      const missing = expectedHeaders.filter((header) => !headers.includes(header));
      if (missing.length || !records.length) throw new Error(missing.length ? `Missing columns: ${missing.join(", ")}` : "The sheet has no rows.");
      const parsed = records.map((record, index) => ({ monthNumber: Number(record[Object.keys(record).find((key) => normaliseHeader(key) === "month number")]), pitAmount: Number(record[Object.keys(record).find((key) => normaliseHeader(key) === "pit amount")]), memberPayment: Number(record[Object.keys(record).find((key) => normaliseHeader(key) === "member payment")]), rowNumber: index + 2 }));
      if (parsed.some((row) => !row.monthNumber || row.monthNumber < 1 || !Number.isFinite(row.pitAmount) || !Number.isFinite(row.memberPayment))) throw new Error("Every row needs a valid month number, pit amount, and member payment.");
      setRows(parsed); setError("");
    } catch (fileError) { setRows([]); setError(fileError.message || "Unable to read this workbook."); }
  };
  const submit = (event) => { event.preventDefault(); if (!schemeId || !rows.length) { setError("Choose a scheme and upload a sheet before saving."); return; } onSubmit({ schemeId: Number(schemeId), schedule: rows.map(({ rowNumber, ...row }) => row) }); };
  return <Backdrop onMouseDown={(event) => event.target === event.currentTarget && onClose()}><Dialog onSubmit={submit}><Heading><div><Title>Bulk upload schedule</Title><Hint>Upload month number, pit amount, and member payment columns.</Hint></div><CloseButton type="button" onClick={onClose} aria-label="Close"><Close fontSize="small" /></CloseButton></Heading><StartRow><Field>Scheme<select required value={schemeId} onChange={(event) => setSchemeId(event.target.value)}><option value="">Select a scheme</option>{schemes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></Field><Button type="button" onClick={downloadTemplate}><Download fontSize="small" /> Download template</Button></StartRow><Field>Excel or CSV file<input accept=".csv,.xls,.xlsx" onChange={readFile} required type="file" /></Field>{error && <ErrorText>{error}</ErrorText>}{rows.length > 0 && <TableWrap><Table><thead><tr><th>Month</th><th>Pit amount</th><th>Member payment</th></tr></thead><tbody>{rows.slice(0, 8).map((row) => <tr key={row.rowNumber}><td>{ordinal(row.monthNumber)} month</td><td>{row.pitAmount.toLocaleString("en-IN")}</td><td>{row.memberPayment.toLocaleString("en-IN")}</td></tr>)}</tbody></Table></TableWrap>}{rows.length > 8 && <Hint>Showing first 8 of {rows.length} uploaded months.</Hint>}<Footer><Button type="button" onClick={onClose}>Cancel</Button><Button $primary type="submit" disabled={pending}><CloudUpload fontSize="small" />{pending ? "Uploading..." : "Upload schedule"}</Button></Footer></Dialog></Backdrop>;
}
