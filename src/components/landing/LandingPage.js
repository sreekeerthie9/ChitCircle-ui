"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  AccountBalance,
  ArrowForward,
  AutoAwesome,
  CheckCircle,
  Close,
  ContentCopy,
  Email,
  Gavel,
  Groups,
  HelpOutline,
  Menu,
  OpenInNew,
  Payments,
  Psychology,
  RocketLaunch,
  Savings,
  Security,
  Shield,
  Speed,
  TrendingDown,
  TrendingUp,
  VerifiedUser,
  WarningAmber,
} from "@mui/icons-material";
import { useAuthContext } from "@/contexts/AuthContext";

/* ── Palette Tokens ── */
const C = {
  forestDark: "#0d241f",
  forest: "#173c35",
  forestLight: "#24594d",
  gold: "#d6b36a",
  goldLight: "#f4dc9e",
  goldDeep: "#b8860b",
  paper: "#f5f1e8",
  paperLight: "#fffdf8",
  border: "#dfe3d8",
  textDark: "#173c35",
  textMuted: "#5a6b62",
  textLight: "#f9f6f0",
  textLightMuted: "#b8ccc0",
  white: "#ffffff",
  riskLow: "#2e7d32",
  riskMed: "#e65100",
  riskHigh: "#c62828",
};

/* ── Layout Containers ── */
const PageWrapper = styled.div`
  background: ${C.paperLight};
  color: ${C.textDark};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: inherit;
  overflow-x: hidden;
`;

const NavHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 253, 248, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${C.border};
  padding: 0.85rem 1.5rem;
`;

const NavContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  color: ${C.forest};
`;

const BrandBadge = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: linear-gradient(135deg, ${C.forest} 0%, ${C.forestDark} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${C.gold};
  border: 1px solid ${C.gold};
  box-shadow: 0 2px 6px rgba(23, 60, 53, 0.12);
`;

const BrandTitle = styled.span`
  font-family: Georgia, serif;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
  color: ${C.forest};
  letter-spacing: -0.01em;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 820px) {
    display: none;
  }
`;

const NavLinkItem = styled.a`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${C.textDark};
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${C.goldDeep};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 820px) {
    display: none;
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${C.forest};
  cursor: pointer;
  padding: 0.35rem;

  @media (max-width: 860px) {
    display: flex;
    align-items: center;
  }
`;

const MobileDrawer = styled.div`
  display: ${(p) => (p.$open ? "flex" : "none")};
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.25rem 1.5rem;
  background: ${C.paperLight};
  border-bottom: 1px solid ${C.border};

  @media (min-width: 861px) {
    display: none;
  }
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  background: ${C.forest};
  color: ${C.goldLight};
  font-weight: 600;
  font-size: 0.825rem;
  padding: 0.55rem 1.1rem;
  border-radius: 6px;
  text-decoration: none;
  border: 1px solid rgba(214, 179, 106, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${C.forestDark};
    color: ${C.white};
  }
`;

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  background: ${C.paper};
  color: ${C.forest};
  font-weight: 600;
  font-size: 0.825rem;
  padding: 0.55rem 1.1rem;
  border-radius: 6px;
  text-decoration: none;
  border: 1px solid ${C.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ebe5d8;
    color: ${C.forestDark};
  }
`;

const GoldBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  background: linear-gradient(135deg, ${C.gold} 0%, #c59f52 100%);
  color: ${C.forestDark};
  font-weight: 700;
  font-size: 0.825rem;
  padding: 0.55rem 1.15rem;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #dfc17f 0%, ${C.gold} 100%);
  }
`;

/* ── Hero Section ── */
const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(165deg, ${C.forestDark} 0%, ${C.forest} 75%, #1e473e 100%);
  color: ${C.textLight};
  padding: 4.5rem 1.5rem 5rem;
`;

const HeroContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(214, 179, 106, 0.14);
  color: ${C.goldLight};
  border: 1px solid rgba(214, 179, 106, 0.35);
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
  width: fit-content;
`;

const HeroHeadline = styled.h1`
  font-family: Georgia, serif;
  font-size: clamp(2.1rem, 3.8vw, 3.2rem);
  line-height: 1.18;
  font-weight: 700;
  color: ${C.paperLight};
  margin-bottom: 1.2rem;

  span {
    color: ${C.gold};
  }
`;

const HeroDescription = styled.p`
  color: ${C.textLightMuted};
  font-size: 1rem;
  line-height: 1.7;
  max-width: 38rem;
  margin-bottom: 1.75rem;
`;

const AuthorCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: rgba(255, 253, 248, 0.08);
  border: 1px solid rgba(214, 179, 106, 0.25);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 2rem;
  width: fit-content;
`;

const HeroCtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
`;

/* ── Hero Live Preview Box ── */
const HeroPreviewCard = styled.div`
  background: rgba(255, 253, 248, 0.07);
  border: 1px solid rgba(214, 179, 106, 0.3);
  border-radius: 14px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
`;

const PreviewHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
`;

const PreviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);

  &:last-child {
    border-bottom: none;
  }
`;

/* ── Section General ── */
const Section = styled.section`
  padding: 4.5rem 1.5rem;
  max-width: 1140px;
  margin: 0 auto;
  width: 100%;
`;

const SectionHeader = styled.div`
  max-width: 44rem;
  margin-bottom: 2.75rem;
`;

const SectionEyebrow = styled.div`
  color: ${C.goldDeep};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-family: Georgia, serif;
  font-size: clamp(1.8rem, 2.8vw, 2.3rem);
  color: ${C.forest};
  line-height: 1.2;
  margin-bottom: 0.75rem;
`;

const SectionDescription = styled.p`
  color: ${C.textMuted};
  font-size: 0.95rem;
  line-height: 1.65;
`;

/* ── Simple Explainer Card ── */
const ExplainerCard = styled.div`
  background: ${C.paper};
  border: 1px solid ${C.border};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  line-height: 1.7;
  font-size: 0.95rem;
  color: ${C.forest};
`;

/* ── Persona Cards: Who Can Use It ── */
const PersonaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PersonaCard = styled.div`
  background: ${C.paperLight};
  border: 1px solid ${C.border};
  border-left: 4px solid ${(p) => p.$accent || C.forest};
  border-radius: 10px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-shadow: 0 4px 12px rgba(23, 60, 53, 0.04);
`;

const PersonaTitle = styled.h3`
  font-family: Georgia, serif;
  font-size: 1.2rem;
  color: ${C.forest};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PersonaList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 0.88rem;
  color: ${C.textMuted};
`;

const PersonaListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  line-height: 1.5;

  span {
    color: ${C.goldDeep};
    font-weight: 700;
  }
`;

/* ── Main Features Grid ── */
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: ${C.paperLight};
  border: 1px solid ${C.border};
  border-radius: 10px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${C.gold};
    box-shadow: 0 6px 18px rgba(23, 60, 53, 0.06);
  }
`;

const FeatureHeading = styled.h4`
  font-family: Georgia, serif;
  font-size: 1.1rem;
  color: ${C.forest};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeatureText = styled.p`
  font-size: 0.88rem;
  color: ${C.textMuted};
  line-height: 1.6;
`;

/* ── AI Risk Section (Spotlight) ── */
const AiSpotlightWrapper = styled.div`
  background: linear-gradient(145deg, #102b25 0%, #173c35 100%);
  color: ${C.textLight};
  border-radius: 14px;
  padding: 2.5rem 2rem;
  border: 1px solid rgba(214, 179, 106, 0.35);
  box-shadow: 0 16px 40px rgba(16, 43, 37, 0.2);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 1.75rem 1.25rem;
  }
`;

const AiStoryCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AiCardPreview = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(214, 179, 106, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RiskBadge = styled.span`
  background: ${(p) =>
    p.$level === "LOW"
      ? "rgba(46, 125, 50, 0.3)"
      : p.$level === "MED"
        ? "rgba(230, 81, 0, 0.3)"
        : "rgba(198, 40, 40, 0.3)"};
  color: ${(p) =>
    p.$level === "LOW" ? "#81c784" : p.$level === "MED" ? "#ffb74d" : "#ef9a9a"};
  border: 1px solid
    ${(p) =>
    p.$level === "LOW" ? "#81c784" : p.$level === "MED" ? "#ffb74d" : "#ef9a9a"};
  padding: 0.25rem 0.65rem;
  border-radius: 12px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  width: fit-content;
`;

const FactorItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

/* ── 4-Step Lifecycle ── */
const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const StepItem = styled.div`
  background: ${C.paperLight};
  border: 1px solid ${C.border};
  border-radius: 8px;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StepNum = styled.div`
  font-family: Georgia, serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${C.gold};
  line-height: 1;
`;

/* ── Contact Section ── */
const ContactBanner = styled.div`
  background: ${C.paper};
  border-top: 1px solid ${C.border};
  border-bottom: 1px solid ${C.border};
  padding: 4.5rem 1.5rem;
`;

const ContactContainer = styled.div`
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ContactCard = styled.div`
  background: ${C.paperLight};
  border: 2px solid ${C.gold};
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 34rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-shadow: 0 8px 24px rgba(23, 60, 53, 0.06);
`;

const EmailPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7f4ec;
  border: 1px solid ${C.border};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: monospace;
  font-size: 1rem;
  font-weight: 700;
  color: ${C.forest};
  word-break: break-all;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: ${C.goldDeep};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;

  &:hover {
    color: ${C.forest};
  }
`;

/* ── Footer ── */
const Footer = styled.footer`
  background: ${C.forestDark};
  color: ${C.textLightMuted};
  padding: 3rem 1.5rem 2rem;
  border-top: 1px solid rgba(214, 179, 106, 0.2);
`;

const FooterContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.85rem;

  @media (max-width: 680px) {
    flex-direction: column;
    text-align: center;
  }
`;

export default function LandingPage() {
  const { isAuthenticated } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Quick interactive toggle for the AI Risk Demo
  const [mockRiskLevel, setMockRiskLevel] = useState("LOW");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sreekeerthimaripally@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <PageWrapper>
      {/* ── 1. Navigation ── */}
      <NavHeader>
        <NavContainer>
          <Brand href="/">
            <BrandBadge>
              <AccountBalance fontSize="small" />
            </BrandBadge>
            <BrandTitle>MS ChitCircle</BrandTitle>
          </Brand>

          <NavLinks>
            <NavLinkItem href="#about">About</NavLinkItem>
            <NavLinkItem href="#who-can-use">Who It&apos;s For</NavLinkItem>
            <NavLinkItem href="#features">Features</NavLinkItem>
            <NavLinkItem href="#ai-advisory">AI Financial Advisory</NavLinkItem>
            <NavLinkItem href="#contact">Contact</NavLinkItem>
          </NavLinks>

          <NavActions>
            {isAuthenticated ? (
              <PrimaryBtn href="/dashboard">
                Dashboard <ArrowForward fontSize="inherit" />
              </PrimaryBtn>
            ) : (
              <GoldBtn href="/login">
                Live Demo <ArrowForward fontSize="inherit" />
              </GoldBtn>
            )}
          </NavActions>

          <MobileMenuBtn
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <Close /> : <Menu />}
          </MobileMenuBtn>
        </NavContainer>

        <MobileDrawer $open={mobileMenuOpen}>
          <NavLinkItem href="#about" onClick={() => setMobileMenuOpen(false)}>
            About
          </NavLinkItem>
          <NavLinkItem href="#who-can-use" onClick={() => setMobileMenuOpen(false)}>
            Who It&apos;s For
          </NavLinkItem>
          <NavLinkItem href="#features" onClick={() => setMobileMenuOpen(false)}>
            Features
          </NavLinkItem>
          <NavLinkItem href="#ai-advisory" onClick={() => setMobileMenuOpen(false)}>
            AI Financial Advisory
          </NavLinkItem>
          <NavLinkItem href="#contact" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </NavLinkItem>
          <div style={{ marginTop: "0.5rem" }}>
            <GoldBtn href="/login" style={{ width: "100%" }}>
              Live Demo
            </GoldBtn>
          </div>
        </MobileDrawer>
      </NavHeader>

      {/* ── 2. Hero Section ── */}
      <HeroSection>
        <HeroContainer>
          <div>
            <HeroEyebrow>
              <Psychology fontSize="inherit" /> Project Showcase · Patchamomma Alum
            </HeroEyebrow>

            <HeroHeadline>
              MS ChitCircle: <span>Smart Chit Fund Management</span> with AI Risk Advisory.
            </HeroHeadline>

            <HeroDescription>
              A web platform created by <strong>Sree Keerthi Maripally</strong> that simplifies
              and digitizes traditional Chit Funds (community savings &amp; borrowing circles).
              It replaces manual paper diaries with transparent monthly online auctions, automatic dividend calculations,
              and <strong>Vertex AI risk analysis</strong> to help organizers evaluate member payment capacity and reduce defaults.
            </HeroDescription>

            <AuthorCard>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: C.gold,
                  color: C.forestDark,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                KM
              </div>
              <div>
                <strong style={{ color: C.paperLight, fontSize: "0.88rem" }}>
                  Sree Keerthi Maripally
                </strong>
                <div style={{ color: C.goldLight, fontSize: "0.75rem" }}>
                  Developer &amp; Creator · sreekeerthimaripally@gmail.com
                </div>
              </div>
            </AuthorCard>

            <HeroCtaRow>
              <GoldBtn href="/login">
                <RocketLaunch fontSize="inherit" /> Test Live App Demo
              </GoldBtn>
              <SecondaryBtn href="#ai-advisory">
                <AutoAwesome fontSize="inherit" /> AI Financial Advisory
              </SecondaryBtn>
              <PrimaryBtn href="mailto:sreekeerthimaripally@gmail.com?subject=Interview%20/%20Project%20Discussion">
                <Email fontSize="inherit" /> Connect for Interviews
              </PrimaryBtn>
            </HeroCtaRow>
          </div>

          {/* Quick Snapshot Card */}
          <HeroPreviewCard>
            <PreviewHeading>
              <div>
                <div style={{ fontSize: "0.7rem", color: C.gold, fontWeight: 700, textTransform: "uppercase" }}>
                  Active Circle Snapshot
                </div>
                <strong style={{ color: C.paperLight, fontSize: "1.05rem" }}>
                  Lakshmi Wealth Group (20 Months)
                </strong>
              </div>
              <span
                style={{
                  background: "rgba(46, 125, 50, 0.25)",
                  color: "#81c784",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "10px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                ● Live Cycle
              </span>
            </PreviewHeading>

            <PreviewRow>
              <span style={{ color: C.textLightMuted, fontSize: "0.85rem" }}>Total Chit Pot</span>
              <strong style={{ color: C.gold, fontSize: "1.1rem" }}>₹5,00,000</strong>
            </PreviewRow>

            <PreviewRow>
              <span style={{ color: C.textLightMuted, fontSize: "0.85rem" }}>Subscribers</span>
              <span style={{ color: C.paperLight }}>20 Enrolled Members</span>
            </PreviewRow>

            <PreviewRow>
              <span style={{ color: C.textLightMuted, fontSize: "0.85rem" }}>Monthly Base Dues</span>
              <span style={{ color: C.paperLight }}>₹25,000 / month</span>
            </PreviewRow>

            <PreviewRow>
              <span style={{ color: C.textLightMuted, fontSize: "0.85rem" }}>Auction Dividend (Savings)</span>
              <span style={{ color: "#81c784", fontWeight: 700 }}>- ₹3,750 / member</span>
            </PreviewRow>

            <PreviewRow>
              <span style={{ color: C.textLightMuted, fontSize: "0.85rem" }}>Net Payable this Month</span>
              <strong style={{ color: C.gold, fontSize: "1rem" }}>₹21,250</strong>
            </PreviewRow>

            <div
              style={{
                marginTop: "0.75rem",
                padding: "0.5rem",
                borderRadius: "6px",
                background: "rgba(214, 179, 106, 0.12)",
                fontSize: "0.72rem",
                color: C.goldLight,
                textAlign: "center",
              }}
            >
              ✓ Includes Vertex AI Member Capacity Evaluation
            </div>
          </HeroPreviewCard>
        </HeroContainer>
      </HeroSection>

      {/* ── 3. What is MS ChitCircle? ── */}
      <Section id="about">
        <SectionHeader>
          <SectionEyebrow>Plain English Explanation</SectionEyebrow>
          <SectionTitle>What is a Chit Fund &amp; What is MS ChitCircle?</SectionTitle>
          <SectionDescription>
            A clear summary of the real-world financial concept and the problem this project solves.
          </SectionDescription>
        </SectionHeader>

        <ExplainerCard>
          <p>
            <strong>What is a Chit Fund?</strong> It is a popular community financial model (Rotating Savings &amp; Credit Association)
            where a group of people (e.g. 20 members) contribute a fixed sum each month (e.g. ₹25,000) into a single pool (₹5,00,000).
            Every month, the pot is auctioned through <em>reverse bidding</em>: whoever needs emergency capital accepts a discount to take the pot.
            The discount (minus a 5% organizer commission) is distributed equally to all other members as a <strong>dividend</strong>,
            which directly lowers their next month&apos;s installment.
          </p>

          <p>
            <strong>The Problem:</strong> Most local chit circles are still run manually in physical notebooks. Organizers struggle with
            manual arithmetic errors during auctions, messy paper receipts, disputes over who paid what, and most importantly:
            <strong> members who take the lump-sum pot and stop paying future monthly installments (defaulters)</strong>.
          </p>

          <p>
            <strong>The Solution: MS ChitCircle</strong> digitizes the entire lifecycle in the cloud. It manages schemes and member rosters,
            hosts fair online bidding windows, calculates exact dividends down to the rupee, and uses <strong>Vertex AI</strong> to analyze
            each member&apos;s financial affordability to help organizers catch risk early.
          </p>
        </ExplainerCard>
      </Section>

      {/* ── 4. Who Can Use It? ── */}
      <Section id="who-can-use" style={{ paddingTop: "0" }}>
        <SectionHeader>
          <SectionEyebrow>User Roles</SectionEyebrow>
          <SectionTitle>Who Can Use MS ChitCircle?</SectionTitle>
          <SectionDescription>
            The platform is designed with two distinct, simple workspaces:
          </SectionDescription>
        </SectionHeader>

        <PersonaGrid>
          <PersonaCard $accent={C.goldDeep}>
            <PersonaTitle>
              <Security style={{ color: C.goldDeep }} /> 1. Chit Fund Organizers (Foremen / Admins)
            </PersonaTitle>
            <p style={{ fontSize: "0.88rem", color: C.textMuted }}>
              People or registered societies who manage and run the chit circles:
            </p>
            <PersonaList>
              <PersonaListItem>
                <span>✓</span> Create schemes (set pot amount, tenure months, member count).
              </PersonaListItem>
              <PersonaListItem>
                <span>✓</span> Onboard and verify members with KYC documents (Aadhaar / PAN).
              </PersonaListItem>
              <PersonaListItem>
                <span>✓</span> Open and close monthly auction bidding windows with one click.
              </PersonaListItem>
              <PersonaListItem>
                <span>✓</span> <strong>Use AI Capacity Analysis</strong> to check if a subscriber can afford future installments before releasing prize money.
              </PersonaListItem>
              <PersonaListItem>
                <span>✓</span> Reconcile payments and track outstanding balances with zero ledger mistakes.
              </PersonaListItem>
            </PersonaList>
          </PersonaCard>

          <PersonaCard $accent={C.forest}>
            <PersonaTitle>
              <Groups style={{ color: C.forest }} /> 2. Circle Subscribers (Members)
            </PersonaTitle>
            <p style={{ fontSize: "0.88rem", color: C.textMuted }}>
              Individuals and small business owners saving or borrowing money:
            </p>
            <PersonaList>
              <PersonaListItem>
                <span>✓</span> Access a personalized member dashboard on their mobile phone or PC.
              </PersonaListItem>
              <PersonaListItem>
                <span>✓</span> View real-time digital passbooks: total paid, upcoming dues, and dividends earned.
              </PersonaListItem>
              <PersonaListItem>
                <span>✓</span> Participate in monthly bidding rounds online from the comfort of their home.
              </PersonaListItem>
              <PersonaListItem>
                <span>✓</span> Request chits and submit claim notes directly through the portal.
              </PersonaListItem>
              <PersonaListItem>
                <span>✓</span> Enjoy complete transparency with instant digital receipts for every payment.
              </PersonaListItem>
            </PersonaList>
          </PersonaCard>
        </PersonaGrid>
      </Section>

      {/* ── 5. Main Features ── */}
      <Section id="features" style={{ paddingTop: "0" }}>
        <SectionHeader>
          <SectionEyebrow>Core Capabilities</SectionEyebrow>
          <SectionTitle>The 4 Main Features</SectionTitle>
          <SectionDescription>
            The essential building blocks that power every circle:
          </SectionDescription>
        </SectionHeader>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureHeading>
              <AccountBalance style={{ color: C.goldDeep }} /> 1. Scheme &amp; Group Architect
            </FeatureHeading>
            <FeatureText>
              Allows foremen to launch chit schemes with custom durations (10 to 50 months), ticket sizes (₹50,000 to ₹25 Lakhs),
              and member limits. Once full, the group locks in and generates the automated monthly schedule.
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureHeading>
              <Gavel style={{ color: C.goldDeep }} /> 2. Digital Reverse Auction &amp; Claim Engine
            </FeatureHeading>
            <FeatureText>
              Replaces physical tokens with an automated monthly bidding window. Members submit chit claim requests online;
              the platform evaluates eligible bids, awards the winning pot to the highest discount, and locks in payouts transparently.
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureHeading>
              <Savings style={{ color: C.goldDeep }} /> 3. Automatic Dividend Distribution
            </FeatureHeading>
            <FeatureText>
              Calculates the statutory 5% organizer commission automatically and redistributes the remainder of the auction discount
              equally among all non-winning members as a dividend, reducing their net dues immediately.
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureHeading>
              <Payments style={{ color: C.goldDeep }} /> 4. Digital Ledger &amp; Member Passbooks
            </FeatureHeading>
            <FeatureText>
              A double-entry financial record book keeping track of every rupee collected, outstanding balances, and disbursed prize pots.
              Members can view and verify their passbook anytime.
            </FeatureText>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      {/* ── 6. AI Financial Advisory (Vertex AI) ── */}
      <Section id="ai-advisory">
        <SectionHeader>
          <SectionEyebrow>Vertex AI Decision Support</SectionEyebrow>
          <SectionTitle>AI Financial Advisory &amp; Affordability</SectionTitle>
          <SectionDescription>
            Inspired by credit scores like CIBIL: using Google Cloud Vertex AI to evaluate member repayment capacity
            and prevent payment defaults before prize money is disbursed.
          </SectionDescription>
        </SectionHeader>

        <AiSpotlightWrapper>
          <AiStoryCol>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <AutoAwesome style={{ color: C.gold }} />
              <strong style={{ fontSize: "1.1rem", color: C.paperLight }}>
                The Vision: An Alternative &ldquo;Chit Credit Score&rdquo;
              </strong>
            </div>

            <p style={{ fontSize: "0.88rem", color: C.textLightMuted, lineHeight: 1.65 }}>
              In traditional finance, banks rely on <strong>CIBIL scores</strong> to assess loan risk. But chit fund members
              are often small business owners, traders, or informal savers who either don&apos;t have a CIBIL score or have scores
              that don&apos;t reflect their local repayment reliability.
            </p>

            <p style={{ fontSize: "0.88rem", color: C.textLightMuted, lineHeight: 1.65 }}>
              <strong>How it Works in MS ChitCircle:</strong> I implemented an AI Affordability Advisory powered by <strong>Google Cloud Vertex AI</strong>.
              When an admin reviews a member, the system combines:
            </p>

            <ul style={{ fontSize: "0.85rem", color: C.goldLight, paddingLeft: "1.2rem", lineHeight: 1.6 }}>
              <li><strong>Track record in the circle:</strong> Total payments made vs missed, outstanding dues.</li>
              <li><strong>Financial capacity:</strong> Monthly income vs fixed household obligations (debt-to-income ratio).</li>
              <li><strong>Safety buffer:</strong> Emergency savings, employment stability, and number of dependents.</li>
            </ul>

            <p style={{ fontSize: "0.88rem", color: C.textLightMuted, lineHeight: 1.65 }}>
              Vertex AI generates a clear <strong>Recommendation (Low Risk, Manual Review, or High Risk)</strong>,
              summarizes member strengths, flags potential red flags, and provides specific follow-up questions for the admin to verify before disbursing funds.
            </p>
          </AiStoryCol>

          {/* Interactive AI Advisory Card Simulation */}
          <AiCardPreview>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: "0.95rem", color: C.paperLight }}>
                AI Affordability Advisory Preview
              </strong>
              <div style={{ display: "flex", gap: "0.3rem" }}>
                {["LOW", "MED", "HIGH"].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setMockRiskLevel(lvl)}
                    style={{
                      background: mockRiskLevel === lvl ? C.gold : "rgba(255,255,255,0.1)",
                      color: mockRiskLevel === lvl ? C.forestDark : C.paperLight,
                      border: "none",
                      borderRadius: "4px",
                      padding: "0.2rem 0.45rem",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <RiskBadge $level={mockRiskLevel}>
              {mockRiskLevel === "LOW"
                ? "✓ LOW RISK · RECOMMENDED"
                : mockRiskLevel === "MED"
                  ? "⚠ MANUAL REVIEW ADVISED"
                  : "✕ HIGH RISK · NOT ADVISABLE"}
            </RiskBadge>

            <div style={{ fontSize: "0.82rem", color: C.paperLight, lineHeight: 1.5 }}>
              {mockRiskLevel === "LOW" && (
                <>
                  &ldquo;Member demonstrates strong disposable cash flow. Monthly chit installment is under 20% of net monthly income with 6+ months emergency runway.&rdquo;
                </>
              )}
              {mockRiskLevel === "MED" && (
                <>
                  &ldquo;Income is sufficient, but recent employment duration is under 6 months. Admin should verify additional guarantor before awarding prize pot.&rdquo;
                </>
              )}
              {mockRiskLevel === "HIGH" && (
                <>
                  &ldquo;High existing monthly obligations. Chit installment pushes debt burden above 65% of declared income. Risk of payment default is elevated.&rdquo;
                </>
              )}
            </div>

            <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "8px", padding: "0.75rem" }}>
              <FactorItem>
                <span style={{ color: C.textLightMuted }}>Transaction History</span>
                <strong style={{ color: C.paperLight }}>12 / 12 Payments Paid (100%)</strong>
              </FactorItem>
              <FactorItem>
                <span style={{ color: C.textLightMuted }}>Monthly Net Income</span>
                <strong style={{ color: C.gold }}>₹75,000 / month</strong>
              </FactorItem>
              <FactorItem>
                <span style={{ color: C.textLightMuted }}>Chit Installment Ratio</span>
                <strong style={{ color: mockRiskLevel === "HIGH" ? "#ef9a9a" : "#81c784" }}>
                  {mockRiskLevel === "LOW" ? "18% (Safe)" : mockRiskLevel === "MED" ? "32% (Moderate)" : "68% (Critical)"}
                </strong>
              </FactorItem>
              <FactorItem style={{ borderBottom: "none" }}>
                <span style={{ color: C.textLightMuted }}>Engine Model</span>
                <span style={{ color: C.goldLight }}>Google Cloud Vertex AI</span>
              </FactorItem>
            </div>

            <div style={{ fontSize: "0.72rem", color: C.textLightMuted, fontStyle: "italic" }}>
              * Decision support tool: provides advisory insights alongside admin verification; never rejects members automatically.
            </div>
          </AiCardPreview>
        </AiSpotlightWrapper>
      </Section>

      {/* ── 7. How Does It Work (4 Simple Steps) ── */}
      <Section id="how-it-works">
        <SectionHeader>
          <SectionEyebrow>Step-by-Step Flow</SectionEyebrow>
          <SectionTitle>How Does ChitCircle Work in Practice?</SectionTitle>
          <SectionDescription>
            A simple 4-step walkthrough from circle creation to final payout:
          </SectionDescription>
        </SectionHeader>

        <StepsGrid>
          <StepItem>
            <StepNum>01</StepNum>
            <strong style={{ color: C.forest, fontSize: "0.95rem" }}>Join &amp; Enroll</strong>
            <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.5 }}>
              The organizer creates a scheme. Members sign up, complete KYC, and fill the group slots.
            </p>
          </StepItem>

          <StepItem>
            <StepNum>02</StepNum>
            <strong style={{ color: C.forest, fontSize: "0.95rem" }}>Monthly Pool</strong>
            <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.5 }}>
              Each month, members pay their installments into the collective pool through digital receipts.
            </p>
          </StepItem>

          <StepItem>
            <StepNum>03</StepNum>
            <strong style={{ color: C.forest, fontSize: "0.95rem" }}>Reverse Bidding</strong>
            <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.5 }}>
              Members submit bids during the open window. The member offering the highest discount wins the pot.
            </p>
          </StepItem>

          <StepItem>
            <StepNum>04</StepNum>
            <strong style={{ color: C.forest, fontSize: "0.95rem" }}>AI Check &amp; Dividends</strong>
            <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.5 }}>
              Vertex AI checks risk before payout. The bid discount is shared as dividend to reduce next month&apos;s dues!
            </p>
          </StepItem>
        </StepsGrid>
      </Section>

      {/* ── 8. Contact & Connect Section ── */}
      <ContactBanner id="contact">
        <ContactContainer>
          <SectionEyebrow>Get in Touch</SectionEyebrow>
          <SectionTitle>Let&apos;s Discuss This Project</SectionTitle>
          <SectionDescription>
            I built MS ChitCircle to solve a real-world community finance challenge using modern web architecture
            and Vertex AI risk assessment. I would love to walk you through the system in an interview.
          </SectionDescription>

          <ContactCard>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
              <Email style={{ color: C.goldDeep }} />
              <strong style={{ fontSize: "1.1rem", color: C.forest }}>
                Sree Keerthi Maripally
              </strong>
            </div>

            <EmailPill>
              <span>sreekeerthimaripally@gmail.com</span>
              <CopyButton type="button" onClick={handleCopyEmail}>
                <ContentCopy fontSize="small" />
                {copied ? "Copied!" : "Copy"}
              </CopyButton>
            </EmailPill>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <PrimaryBtn
                href="mailto:sreekeerthimaripally@gmail.com?subject=Interview%20Invitation%20for%20Sree%20Keerthi%20Maripally"
                style={{ flex: 1 }}
              >
                <Email fontSize="small" /> Email Directly
              </PrimaryBtn>
              <SecondaryBtn href="/login" style={{ flex: 1 }}>
                <RocketLaunch fontSize="small" /> Launch App Demo
              </SecondaryBtn>
            </div>
          </ContactCard>
        </ContactContainer>
      </ContactBanner>

      {/* ── 9. Footer ── */}
      <Footer>
        <FooterContainer>
          <div>
            <strong>MS ChitCircle</strong> · Developed by <strong>Sree Keerthi Maripally</strong>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
              Chit Fund Platform with Vertex AI Risk Assessment · Patchamomma Alum
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a
              href="mailto:sreekeerthimaripally@gmail.com"
              style={{ color: C.gold, textDecoration: "none", fontWeight: 600 }}
            >
              sreekeerthimaripally@gmail.com
            </a>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <Link href="/login" style={{ color: C.paperLight, textDecoration: "none" }}>
              App Demo Login
            </Link>
          </div>
        </FooterContainer>
      </Footer>
    </PageWrapper>
  );
}
