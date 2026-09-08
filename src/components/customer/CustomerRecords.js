"use client";

import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";

const Shell = styled.main`color: #173c35; max-width: 1180px; margin: 0 auto; padding: 0.5rem 0 3rem;`;
const Eyebrow = styled.div`color: #b27625; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;`;
const Title = styled.h1`font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); line-height: 1; margin: 0.5rem 0 2rem;`;
const Section = styled.section`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.35rem; overflow: hidden;`;
const Meta = styled.div`border-bottom: 1px solid #e8ebe2; color: #76847b; font-size: 0.82rem; padding: 1rem 1.3rem;`;
const TableWrap = styled.div`overflow-x: auto;`;
const Table = styled.table`border-collapse: collapse; min-width: 650px; width: 100%; th, td { border-top: 1px solid #e8ebe2; padding: 0.95rem 1.3rem; text-align: left; } th { color: #7a887e; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; } td { color: #36554a; font-size: 0.82rem; }`;
const Status = styled.span`background: ${(props) => props.$warning ? "#f7efd7" : "#e5f0e6"}; border-radius: 99px; color: ${(props) => props.$warning ? "#9a6a1b" : "#317052"}; font-size: 0.68rem; font-weight: 800; padding: 0.35rem 0.6rem;`;

const configs = {
  bids: { title: "My bids", eyebrow: "Bidding history", url: APIConstants.customerBids, columns: ["Cycle", "Group", "Discount", "Status"], cells: (row) => [row.cycleNumber, row.groupId, `₹${Number(row.discountAmount).toLocaleString("en-IN")}`, row.status] },
  claims: { title: "My claims", eyebrow: "Payout claims", url: APIConstants.customerClaims, columns: ["Cycle", "Group", "Note", "Status"], cells: (row) => [row.cycleNumber, row.groupId, row.note || "-", row.status] },
  payments: { title: "My payments", eyebrow: "Contribution history", url: APIConstants.customerPayments, columns: ["Due date", "Group", "Amount", "Method", "Status"], cells: (row) => [row.dueDate, row.groupId, `₹${Number(row.amount).toLocaleString("en-IN")}`, row.method || "Manual", row.status] }
};

export default function CustomerRecords({ type }) {
  const { authConfig } = useAuthContext();
  const config = configs[type];
  const { data, isLoading, error } = useApiQuery({ key: `customer-${type}`, url: config.url, authConfig });
  const rows = data || [];
  return <Shell><Eyebrow>{config.eyebrow}</Eyebrow><Title>{config.title}</Title><Section><Meta>{isLoading ? "Loading records..." : error ? "Unable to load records" : `${rows.length} records`}</Meta><TableWrap><Table><thead><tr>{config.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id}>{config.cells(row).map((cell, index) => <td key={`${row.id}-${index}`}>{index === config.columns.length - 1 ? <Status $warning={cell === "PENDING"}>{cell}</Status> : cell}</td>)}</tr>)}</tbody></Table></TableWrap></Section></Shell>;
}
