"use client";

import {
  Add,
  ArrowForward,
  CheckCircle,
  Groups,
  Payments,
  People,
  QueryStats,
  ReceiptLong,
  Search,
  TrendingUp,
  WarningAmber
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";
import { useApiMutation } from "@/hooks/useApi";
import CrudDialog from "./CrudDialog";
import AdminCycleReview from "./AdminCycleReview";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { AdvancedSchemeDialog, BulkSchemeUploadDialog } from "./SchemeScheduleDialogs";

const pageCopy = {
  dashboard: { eyebrow: "Operations overview", title: "Good morning, Admin", description: "Here is the pulse of your circles today." },
  schemes: { eyebrow: "Products", title: "Schemes", description: "Define the contribution rules your circles run on." },
  groups: { eyebrow: "Live operations", title: "Chit groups", description: "Track every running group from enrollment to closure." },
  cycles: { eyebrow: "Monthly operations", title: "Cycle control", description: "Open bidding, review claims, and settle each monthly cycle." },
  customers: { eyebrow: "Member care", title: "Customers", description: "Keep profiles, KYC, dues, and follow-ups in one place." },
  payments: { eyebrow: "Money movement", title: "Payments & ledger", description: "Reconcile collections, payouts, and member receipts." },
  analytics: { eyebrow: "Decision support", title: "Analytics", description: "See collection health, payout planning, and defaulter trends." }
};

const schemes = [
  { name: "Lakshmi Growth 20", amount: "₹1,00,000", monthly: "₹5,000", duration: "20 months", members: "20 / 20", commission: "5%", status: "Active" },
  { name: "Sampada Starter 12", amount: "₹60,000", monthly: "₹5,000", duration: "12 months", members: "8 / 12", commission: "4%", status: "Draft" },
  { name: "Nidhi Plus 24", amount: "₹2,40,000", monthly: "₹10,000", duration: "24 months", members: "24 / 24", commission: "5%", status: "Active" }
];

const groups = [
  { name: "Lakshmi Growth / Apr 2026", scheme: "Lakshmi Growth 20", cycle: "Cycle 06 of 20", members: "20 / 20", collected: "₹94,000", due: "₹6,000", status: "Running" },
  { name: "Nidhi Plus / Mar 2026", scheme: "Nidhi Plus 24", cycle: "Cycle 07 of 24", members: "24 / 24", collected: "₹2,18,000", due: "₹22,000", status: "Bidding open" },
  { name: "Sampada Starter / Jun 2026", scheme: "Sampada Starter 12", cycle: "Forming", members: "8 / 12", collected: "₹0", due: "₹40,000", status: "Forming" }
];

const customers = [
  { name: "Ananya Rao", code: "CUS-1024", phone: "+91 98450 22114", groups: 2, kyc: "Verified", dues: "₹0", status: "Good standing" },
  { name: "Ravi Kumar", code: "CUS-1025", phone: "+91 99807 11842", groups: 1, kyc: "Pending", dues: "₹5,000", status: "Follow-up" },
  { name: "Meera Nair", code: "CUS-1026", phone: "+91 97411 30990", groups: 3, kyc: "Verified", dues: "₹10,000", status: "Overdue" },
  { name: "Suresh Babu", code: "CUS-1027", phone: "+91 99162 77730", groups: 1, kyc: "Verified", dues: "₹0", status: "Good standing" }
];

const payments = [
  { receipt: "RCT-00841", customer: "Ananya Rao", group: "Lakshmi Growth / Apr", amount: "₹5,000", mode: "UPI", date: "02 Sep 2026", status: "Settled" },
  { receipt: "RCT-00840", customer: "Ravi Kumar", group: "Lakshmi Growth / Apr", amount: "₹5,000", mode: "Cash", date: "01 Sep 2026", status: "Pending" },
  { receipt: "RCT-00839", customer: "Meera Nair", group: "Nidhi Plus / Mar", amount: "₹10,000", mode: "Bank transfer", date: "31 Aug 2026", status: "Settled" },
  { receipt: "RCT-00838", customer: "Suresh Babu", group: "Lakshmi Growth / Apr", amount: "₹5,000", mode: "UPI", date: "31 Aug 2026", status: "Settled" }
];

const cycles = [
  { group: "Nidhi Plus / Mar 2026", cycle: "Cycle 07", window: "01 - 05 Sep 2026", bids: 4, winner: "Pending decision", payout: "₹2,40,000", status: "Bidding open" },
  { group: "Lakshmi Growth / Apr 2026", cycle: "Cycle 06", window: "01 - 05 Sep 2026", bids: 2, winner: "Priya Shah", payout: "₹1,00,000", status: "Winner approved" },
  { group: "Lakshmi Growth / Apr 2026", cycle: "Cycle 05", window: "01 - 05 Aug 2026", bids: 0, winner: "Fixed rotation", payout: "₹1,00,000", status: "Completed" }
];

const money = ["₹12.4L", "₹9.8L", "₹2.6L"];

const Shell = styled.main`
  color: #173c35;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0.5rem 0 3rem;
`;

const PageHeader = styled.header`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (max-width: 720px) { align-items: flex-start; flex-direction: column; }
`;

const Eyebrow = styled.div`
  color: #b27625;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-family: Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1;
  margin: 0.5rem 0 0;
`;

const Description = styled.p`
  color: #66766d;
  font-size: 0.92rem;
  margin: 0.7rem 0 0;
`;

const PrimaryButton = styled.button`
  align-items: center;
  background: #173c35;
  border: 0;
  border-radius: 0.3rem;
  color: #fffaf0;
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  gap: 0.45rem;
  min-height: 2.7rem;
  padding: 0.7rem 1rem;
  &:hover { background: #24594d; }
`;

const SoftButton = styled(PrimaryButton)`
  background: #e8eee5;
  color: #173c35;
  &:hover { background: #dce7dc; }
`;

const StatGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-bottom: 2rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const Stat = styled.section`
  background: #fffdf8;
  border: 1px solid #dfe3d8;
  border-radius: 0.35rem;
  padding: 1.2rem;
`;

const StatTop = styled.div`
  align-items: center;
  color: #77877c;
  display: flex;
  font-size: 0.72rem;
  font-weight: 700;
  gap: 0.5rem;
  text-transform: uppercase;
`;

const StatValue = styled.strong`
  display: block;
  font-family: Georgia, serif;
  font-size: 1.75rem;
  margin: 0.9rem 0 0.35rem;
`;

const StatNote = styled.span`
  color: ${(props) => props.$warning ? "#ad5c2a" : "#3c8060"};
  font-size: 0.75rem;
  font-weight: 700;
`;

const Section = styled.section`
  background: #fffdf8;
  border: 1px solid #dfe3d8;
  border-radius: 0.35rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const SectionHeading = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem 1.3rem;
  @media (max-width: 600px) { align-items: flex-start; flex-direction: column; }
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  margin: 0;
`;

const SectionMeta = styled.p`
  color: #76847b;
  font-size: 0.78rem;
  margin: 0.25rem 0 0;
`;

const TableWrap = styled.div` overflow-x: auto; `;

const Table = styled.table`
  border-collapse: collapse;
  min-width: 760px;
  width: 100%;
  th, td { border-top: 1px solid #e8ebe2; padding: 0.95rem 1.3rem; text-align: left; }
  th { color: #7a887e; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
  td { color: #36554a; font-size: 0.82rem; }
  td strong { color: #173c35; display: block; font-size: 0.85rem; }
`;

const Status = styled.span`
  background: ${(props) => props.$status?.includes("Overdue") || props.$status?.includes("Follow") ? "#fbe8df" : props.$status?.includes("Pending") || props.$status?.includes("Draft") ? "#f7efd7" : "#e5f0e6"};
  border-radius: 99px;
  color: ${(props) => props.$status?.includes("Overdue") || props.$status?.includes("Follow") ? "#a34c2e" : props.$status?.includes("Pending") || props.$status?.includes("Draft") ? "#9a6a1b" : "#317052"};
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.35rem 0.6rem;
  white-space: nowrap;
`;

const Toolbar = styled.div`
  align-items: center;
  border-bottom: 1px solid #e8ebe2;
  display: flex;
  gap: 0.75rem;
  padding: 0 1.3rem 1rem;
  @media (max-width: 600px) { align-items: stretch; flex-direction: column; }
`;

const SearchBox = styled.label`
  align-items: center;
  background: #f7f6ef;
  border: 1px solid #e0e3d8;
  border-radius: 0.3rem;
  color: #7b8b80;
  display: flex;
  gap: 0.45rem;
  max-width: 20rem;
  padding: 0.55rem 0.7rem;
  width: 100%;
  input { background: transparent; border: 0; color: #173c35; min-width: 0; outline: 0; width: 100%; }
`;

const Select = styled.select`
  background: #f7f6ef;
  border: 1px solid #e0e3d8;
  border-radius: 0.3rem;
  color: #36554a;
  min-height: 2.3rem;
  padding: 0 0.7rem;
`;

const EmptySpace = styled.div`
  align-items: center;
  background: linear-gradient(135deg, #e8eee5 0%, #f7f1e3 100%);
  display: flex;
  min-height: 9rem;
  padding: 1.5rem;
`;

const Chart = styled.div`
  align-items: flex-end;
  display: flex;
  gap: 0.6rem;
  height: 10rem;
  padding: 1rem 1.3rem 1.5rem;
`;

const Bar = styled.div`
  background: ${(props) => props.$accent ? "#c08c35" : "#70a78b"};
  border-radius: 0.2rem 0.2rem 0 0;
  flex: 1;
  height: ${(props) => props.$height}%;
  min-width: 1rem;
`;

function Dashboard() {
  return <>
    <StatGrid>
      <Stat><StatTop><Payments fontSize="small" /> Collections this month</StatTop><StatValue>₹12.4L</StatValue><StatNote>↑ 8.4% vs last month</StatNote></Stat>
      <Stat><StatTop><TrendingUp fontSize="small" /> Active groups</StatTop><StatValue>18</StatValue><StatNote>3 need attention</StatNote></Stat>
      <Stat><StatTop><People fontSize="small" /> Enrolled members</StatTop><StatValue>342</StatValue><StatNote>26 new this month</StatNote></Stat>
      <Stat><StatTop><WarningAmber fontSize="small" /> Outstanding dues</StatTop><StatValue>₹2.6L</StatValue><StatNote $warning>42 members overdue</StatNote></Stat>
    </StatGrid>
    <Section><SectionHeading><div><SectionTitle>Today in your circles</SectionTitle><SectionMeta>Actions that need an admin decision</SectionMeta></div><SoftButton><ArrowForward fontSize="small" /> View activity</SoftButton></SectionHeading><TableWrap><Table><thead><tr><th>Item</th><th>Group</th><th>Owner</th><th>Status</th></tr></thead><tbody><tr><td><strong>Review 4 bids</strong>Cycle 07 payout decision</td><td>Nidhi Plus / Mar 2026</td><td>Due today</td><td><Status $status="Bidding open">Bidding open</Status></td></tr><tr><td><strong>Follow up with Ravi Kumar</strong>Payment due since 01 Sep</td><td>Lakshmi Growth / Apr 2026</td><td>Assigned to you</td><td><Status $status="Follow-up">Follow-up</Status></td></tr><tr><td><strong>Approve KYC documents</strong>2 profiles waiting</td><td>Across 2 groups</td><td>Due tomorrow</td><td><Status $status="Pending">Pending</Status></td></tr></tbody></Table></TableWrap></Section>
    <Section><SectionHeading><div><SectionTitle>Collection health</SectionTitle><SectionMeta>Collections across the last six cycles</SectionMeta></div><SoftButton>Open analytics <ArrowForward fontSize="small" /></SoftButton></SectionHeading><Chart><Bar $height={52} /><Bar $height={68} /><Bar $height={61} /><Bar $height={80} $accent /><Bar $height={76} /><Bar $height={94} $accent /></Chart></Section>
  </>;
}

function DataTable({ type }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [advancedScheme, setAdvancedScheme] = useState(null);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [uploadedSchedules, setUploadedSchedules] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { authConfig } = useAuthContext();
  const apiResource = type === "schemes" ? APIConstants.schemes : type === "groups" ? APIConstants.groups : type === "customers" ? APIConstants.users : type === "cycles" ? APIConstants.cycles : type === "payments" ? APIConstants.payments : null;
  const { data, isLoading, error } = useApiQuery({ key: type, url: apiResource, authConfig, enabled: Boolean(apiResource) });
  const { data: schemeOptions = [] } = useApiQuery({ key: "group-scheme-options", url: APIConstants.schemes, authConfig, enabled: type === "groups" });
  const { data: customerOptions = [] } = useApiQuery({ key: "group-customer-options", url: APIConstants.users, authConfig, enabled: type === "groups" });
  const { data: linkedGroups = [] } = useApiQuery({ key: "scheme-linked-groups", url: APIConstants.groups, authConfig, enabled: type === "schemes" });
  const resourceId = type === "customers" ? editing?.code : editing?.id;
  const mutation = useApiMutation({ key: type, url: editing ? `${apiResource}/${resourceId}` : apiResource, method: editing ? "PUT" : "POST", authConfig });
  const deleteMutation = useApiMutation({ key: type, url: type === "customers" ? (editing ? `${apiResource}/${resourceId}` : apiResource) : (deleteTarget ? `${apiResource}/${deleteTarget.id}` : null), method: type === "customers" ? "PUT" : "DELETE", authConfig });
  const scheduleMutation = useApiMutation({ key: "schemes", url: advancedScheme ? `${APIConstants.schemes}/${advancedScheme.id}/schedule` : `${APIConstants.schemes}/schedule/bulk`, method: "POST", authConfig });
  const liveRows = type === "schemes" ? (data || []).map((scheme) => ({ id: scheme.id, name: scheme.name, amount: `₹${Number(scheme.potAmount).toLocaleString("en-IN")}`, monthly: `₹${Math.round(scheme.potAmount / scheme.durationMonths).toLocaleString("en-IN")}`, duration: `${scheme.durationMonths} months`, members: `${scheme.memberCount} seats`, commission: `${scheme.commissionRate}%`, status: "Active", potAmount: scheme.potAmount, durationMonths: scheme.durationMonths, memberCount: scheme.memberCount, commissionRate: scheme.commissionRate, startDate: scheme.startDate, schedule: scheme.schedule || uploadedSchedules[scheme.id] || [] })) : type === "groups" ? (data || []).map((group) => ({ id: group.id, name: group.schemeName, scheme: `Group #${group.id}`, schemeId: group.schemeId, cycle: `Cycle ${group.currentCycleNumber || 0}`, members: "Not available", collected: "Not available", due: group.startDate || "Not scheduled", startDate: group.startDate || "", status: String(group.status || "Forming").replaceAll("_", " ") })) : type === "customers" ? (data || []).map((user) => ({ id: user.id, name: user.displayName || user.username, code: user.username, phone: user.phone || "Not provided", groups: "Not available", kyc: String(user.kycStatus || "NOT_STARTED").replaceAll("_", " "), dues: "Not available", status: user.active ? "Good standing" : "Inactive", displayName: user.displayName, email: user.email })) : type === "cycles" ? (data || []).map((cycle) => ({ id: cycle.id, group: `Group #${cycle.groupId}`, cycle: `Cycle ${cycle.cycleNumber}`, window: cycle.bidWindowOpenAt ? "Window configured" : "Not opened", bids: "Not available", winner: "Pending decision", payout: "Not available", status: String(cycle.status || "SCHEDULED").replaceAll("_", " ") })) : type === "payments" ? (data || []).map((payment) => ({ id: payment.id, receipt: `PAY-${payment.id}`, customer: payment.username, group: `Cycle #${payment.cycleId}`, amount: `₹${Number(payment.amount).toLocaleString("en-IN")}`, mode: payment.method || "Manual", date: payment.dueDate, status: String(payment.status || "PENDING").replaceAll("_", " ") })) : null;
  const rows = liveRows || (type === "payments" ? payments : cycles);
  const filtered = useMemo(() => rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()) && (filter === "All" || Object.values(row).includes(filter))), [filter, query, rows]);
  const labels = type === "schemes" ? ["Scheme", "Pot amount", "Monthly", "Duration", "Members", "Commission", "Status"] : type === "groups" ? ["Group", "Scheme", "Cycle", "Members", "Collected", "Due", "Status"] : type === "customers" ? ["Customer", "Contact", "Groups", "KYC", "Dues", "Standing"] : type === "payments" ? ["Receipt", "Customer", "Group", "Amount", "Mode", "Date", "Status"] : ["Group", "Cycle", "Bid window", "Bids", "Winner", "Payout", "Status"];
    const keys = type === "schemes" ? ["name", "amount", "monthly", "duration", "members", "commission", "status"] : type === "groups" ? ["name", "scheme", "cycle", "members", "collected", "due", "status"] : type === "customers" ? ["name", "phone", "groups", "kyc", "dues", "status"] : type === "payments" ? ["receipt", "customer", "group", "amount", "mode", "date", "status"] : ["group", "cycle", "window", "bids", "winner", "payout", "status"];
  const statusValues = [...new Set(rows.map((row) => row.status))];
  const crudSupported = ["schemes", "groups", "customers"].includes(type);
  const hasActions = crudSupported || type === "cycles";
  const openCreate = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (row) => { setEditing(row); setDialogOpen(true); };
  const save = (values) => mutation.mutate(values, { onSuccess: () => { setDialogOpen(false); setEditing(null); } });
  const saveAdvancedSchedule = (values) => scheduleMutation.mutate(values, { onSuccess: () => { setUploadedSchedules((current) => ({ ...current, [advancedScheme.id]: values.schedule })); setAdvancedScheme(null); } });
  const saveBulkSchedule = (values) => scheduleMutation.mutate(values, { onSuccess: () => { setUploadedSchedules((current) => ({ ...current, [values.schemeId]: values.schedule })); setBulkUploadOpen(false); } });
  const remove = (row) => { if (["schemes", "groups"].includes(type)) { setDeleteTarget(row); return; } if (window.confirm(`Deactivate ${row.name || row.code || "this record"}?`)) { setEditing(row); deleteMutation.mutate({ active: false }, { onSuccess: () => setEditing(null) }); } };
  const linkedGroupCount = deleteTarget && type === "schemes" ? linkedGroups.filter((group) => Number(group.schemeId) === Number(deleteTarget.id)).length : 0;
  const confirmDelete = () => deleteMutation.mutate(undefined, { onSuccess: () => setDeleteTarget(null) });
  const deleteDescription = type === "groups" ? `Delete ${deleteTarget?.name || "this chit group"}?` : `Delete ${deleteTarget?.name || "this scheme"}?`;
  const deleteWarning = type === "groups" ? "This permanently removes the group's member assignments, cycles, bids, claims, payments, and ledger entries." : linkedGroupCount ? `${linkedGroupCount} chit ${linkedGroupCount === 1 ? "group is" : "groups are"} still linked to this scheme. Delete the linked group${linkedGroupCount === 1 ? "" : "s"} before deleting the scheme.` : "This permanently removes the scheme and its schedule.";
  return <><Section><SectionHeading><div><SectionTitle>{type === "schemes" ? "All schemes" : type === "groups" ? "All groups" : type === "customers" ? "Member directory" : type === "payments" ? "Recent transactions" : "Cycle queue"}</SectionTitle><SectionMeta>{isLoading ? "Loading records..." : error ? "Unable to load records" : `${filtered.length} records visible`}</SectionMeta></div>{type === "schemes" && <SoftButton onClick={() => setBulkUploadOpen(true)}>Bulk upload</SoftButton>}{crudSupported && <PrimaryButton onClick={openCreate}><Add fontSize="small" /> {type === "schemes" ? "Create scheme" : type === "groups" ? "Create group" : "Add customer"}</PrimaryButton>}</SectionHeading><Toolbar><SearchBox><Search fontSize="small" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${type}`} /></SearchBox><Select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option>{statusValues.map((value) => <option key={value}>{value}</option>)}</Select>{type === "customers" && <Select><option>All KYC statuses</option><option>Verified</option><option>Pending</option></Select>}</Toolbar><TableWrap><Table><thead><tr>{labels.map((label) => <th key={label}>{label}</th>)}{hasActions && <th>Actions</th>}</tr></thead><tbody>{filtered.map((row) => <tr key={row.id || row.name || row.receipt || row.cycle}><td><strong>{row.name || row.receipt || row.group}</strong>{row.code || row.scheme || row.customer || row.cycle}</td>{keys.slice(1).map((key) => <td key={key}>{key === "status" ? <Status $status={row[key]}>{row[key]}</Status> : row[key]}</td>)}{crudSupported && <td><SoftButton onClick={() => openEdit(row)}>Edit</SoftButton>{type === "schemes" && <SoftButton onClick={() => setAdvancedScheme(row)}>Advanced</SoftButton>}{type === "customers" ? <SoftButton onClick={() => remove(row)}>Deactivate</SoftButton> : <SoftButton onClick={() => remove(row)}>Delete</SoftButton>}</td>}{type === "cycles" && <td><AdminCycleReview cycleId={row.id} status={String(row.status || "").replaceAll(" ", "_").toUpperCase()} /></td>}</tr>)}</tbody></Table></TableWrap></Section>{crudSupported && <CrudDialog key={`${type}-${editing?.id || editing?.code || "new"}`} type={type} open={dialogOpen} initialValue={editing} onClose={() => setDialogOpen(false)} onSubmit={save} pending={mutation.isPending} schemeOptions={schemeOptions} customerOptions={customerOptions} />}{["schemes", "groups"].includes(type) && <DeleteConfirmationDialog open={Boolean(deleteTarget)} title={linkedGroupCount ? "Scheme cannot be deleted" : `Delete ${type === "groups" ? "chit group" : "scheme"}`} message={deleteDescription} warning={deleteWarning} blocked={Boolean(linkedGroupCount)} pending={deleteMutation.isPending} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} />}{type === "schemes" && <><AdvancedSchemeDialog key={advancedScheme?.id || "advanced-closed"} open={Boolean(advancedScheme)} scheme={advancedScheme} onClose={() => setAdvancedScheme(null)} onSubmit={saveAdvancedSchedule} pending={scheduleMutation.isPending} /><BulkSchemeUploadDialog key={bulkUploadOpen ? "bulk-open" : "bulk-closed"} open={bulkUploadOpen} schemes={data || []} onClose={() => setBulkUploadOpen(false)} onSubmit={saveBulkSchedule} pending={scheduleMutation.isPending} /></>}</>;
}

function Analytics() {
  const { authConfig } = useAuthContext();
  const { data, isLoading } = useApiQuery({ key: "analytics", url: APIConstants.analytics, authConfig });
  return <><StatGrid><Stat><StatTop><QueryStats fontSize="small" /> Groups tracked</StatTop><StatValue>{isLoading ? "-" : data?.groups ?? 0}</StatValue><StatNote>Live from your groups</StatNote></Stat><Stat><StatTop><Payments fontSize="small" /> Cycles tracked</StatTop><StatValue>{isLoading ? "-" : data?.cycles ?? 0}</StatValue><StatNote>Monthly operations</StatNote></Stat><Stat><StatTop><People fontSize="small" /> Enrollments</StatTop><StatValue>{isLoading ? "-" : data?.memberships ?? 0}</StatValue><StatNote>Active member records</StatNote></Stat><Stat><StatTop><ReceiptLong fontSize="small" /> Payments</StatTop><StatValue>{isLoading ? "-" : data?.payments ?? 0}</StatValue><StatNote>Recorded transactions</StatNote></Stat></StatGrid><Section><SectionHeading><div><SectionTitle>Collections versus payout</SectionTitle><SectionMeta>Connect amount aggregates when ledger reporting is enabled</SectionMeta></div><Select><option>All groups</option></Select></SectionHeading><Chart><Bar $height={62} /><Bar $height={74} $accent /><Bar $height={68} /><Bar $height={86} $accent /><Bar $height={78} /><Bar $height={96} $accent /></Chart></Section></>;
}

export default function AdminWorkspace({ section }) {
  const copy = pageCopy[section] || pageCopy.dashboard;
  return <Shell><PageHeader><div><Eyebrow>{copy.eyebrow}</Eyebrow><Title>{copy.title}</Title><Description>{copy.description}</Description></div>{section === "dashboard" && <PrimaryButton><Add fontSize="small" /> New scheme</PrimaryButton>}</PageHeader>{section === "dashboard" ? <Dashboard /> : section === "analytics" ? <Analytics /> : <DataTable type={section} />}</Shell>;
}
