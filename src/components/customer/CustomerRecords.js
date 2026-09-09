"use client";

import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";

const Shell = styled.main`color: #173c35; max-width: 1180px; margin: 0 auto; padding: 0.5rem 0 3rem;`;
const Eyebrow = styled.div`color: #b27625; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 0.3rem;`;
const Title = styled.h2`font-family: Georgia, serif; font-size: clamp(1.4rem, 3vw, 2rem); line-height: 1; margin: 0 0 1.2rem;`;
const Section = styled.section`background: #fffdf8; border: 1px solid #dfe3d8; border-radius: 0.35rem; overflow: hidden; margin-bottom: 2rem;`;
const Meta = styled.div`border-bottom: 1px solid #e8ebe2; color: #76847b; font-size: 0.82rem; padding: 1rem 1.3rem;`;
const TableWrap = styled.div`overflow-x: auto;`;
const Table = styled.table`border-collapse: collapse; min-width: 500px; width: 100%; th, td { border-top: 1px solid #e8ebe2; padding: 0.95rem 1.3rem; text-align: left; } th { color: #7a887e; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; } td { color: #36554a; font-size: 0.82rem; }`;
const Badge = styled.span`
  background: ${(p) => p.$won ? "#d4edda" : p.$warning ? "#f7efd7" : p.$danger ? "#fde8e8" : "#e5f0e6"};
  border-radius: 99px;
  color: ${(p) => p.$won ? "#1a6b35" : p.$warning ? "#9a6a1b" : p.$danger ? "#a33" : "#317052"};
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.35rem 0.6rem;
`;

const fmt = (amount) => `\u20B9${Number(amount).toLocaleString("en-IN")}`;

const badgeProps = (status) => ({
  $won: status === "WON" || status === "APPROVED" || status === "PAID",
  $warning: status === "PENDING",
  $danger: status === "LOST" || status === "REJECTED",
});

const configs = {
  claims: {
    eyebrow: "Claim history",
    title: "My submitted claims",
    url: APIConstants.customerClaims,
    columns: ["Cycle", "Group", "Submitted", "Note", "Status"],
    cells: (row) => [
      `Cycle ${row.cycleNumber}`,
      row.groupName || `Group #${row.groupId}`,
      row.submittedAt ? new Date(row.submittedAt).toLocaleDateString("en-IN") : "-",
      row.note || "-",
      row.status,
    ],
  },
  payouts: {
    eyebrow: "Chit fund winnings",
    title: "Payouts I received",
    url: APIConstants.customerPayouts,
    columns: ["Cycle", "Group", "Amount", "Method", "Paid on"],
    cells: (row) => [
      `Cycle ${row.cycleNumber}`,
      row.groupName || `Group #${row.groupId}`,
      fmt(row.amount),
      row.method || "-",
      row.paidAt ? new Date(row.paidAt).toLocaleDateString("en-IN") : "-",
    ],
    noStatus: true,
  },
  payments: {
    eyebrow: "Contributions and payouts",
    title: "My payments",
    url: APIConstants.customerPayments,
    columns: ["Type", "Cycle", "Group", "Amount", "Method", "Due / Paid", "Status"],
    cells: (row) => [
      row.recordType === "PAYOUT" ? "Payout \uD83C\uDF89" : "Contribution",
      row.cycleNumber ? `Cycle ${row.cycleNumber}` : `#${row.cycleId}`,
      row.groupName || `Group #${row.groupId}`,
      fmt(row.amount),
      row.method || "Manual",
      row.paidAt || row.dueDate || "-",
      row.status,
    ],
  },
};

export default function CustomerRecords({ type }) {
  const { authConfig } = useAuthContext();
  const config = configs[type];
  const { data, isLoading, error } = useApiQuery({
    key: `customer-${type}`,
    url: config.url,
    authConfig,
  });
  const rows = data || [];
  const count = rows.length;

  return (
    <div>
      <Eyebrow>{config.eyebrow}</Eyebrow>
      <Title>{config.title}</Title>
      <Section>
        <Meta>
          {isLoading
            ? "Loading..."
            : error
            ? "Unable to load records"
            : `${count} record${count === 1 ? "" : "s"}`}
        </Meta>
        <TableWrap>
          <Table>
            <thead>
              <tr>{config.columns.map((col) => <th key={col}>{col}</th>)}</tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.id}>
                    {config.cells(row).map((cell, index) => {
                      const isLast = index === config.columns.length - 1;
                      return (
                        <td key={`${row.id}-${index}`}>
                          {isLast && !config.noStatus
                            ? <Badge {...badgeProps(cell)}>{cell}</Badge>
                            : cell}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={config.columns.length} style={{ color: "#76847b" }}>
                    {isLoading ? "Loading..." : error ? "Unable to load records." : `No ${type} yet.`}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableWrap>
      </Section>
    </div>
  );
}
