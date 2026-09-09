import CustomerCycleActions from "@/components/customer/CustomerCycleActions";
import CustomerRecords from "@/components/customer/CustomerRecords";
import styled from "styled-components";

const Shell = styled.main`color: #173c35; max-width: 1180px; margin: 0 auto; padding: 0.5rem 0 3rem;`;
const PageEyebrow = styled.div`color: #b27625; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;`;
const PageTitle = styled.h1`font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); line-height: 1; margin: 0.5rem 0 2rem;`;

export default function ClaimsHistoryPage() {
  return (
    <Shell>
      <PageEyebrow>Member portal</PageEyebrow>
      <PageTitle>Claims &amp; history</PageTitle>
      <CustomerCycleActions />
      <CustomerRecords type="claims" />
      <CustomerRecords type="payouts" />
    </Shell>
  );
}
