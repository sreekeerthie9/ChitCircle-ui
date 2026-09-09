"use client";

import { Close } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";
import { api } from "@/utils/APIMethods";

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
const Dialog = styled.div`
  background: #fffdf8;
  border: 1px solid #dfe3d8;
  border-radius: 0.4rem;
  box-shadow: 0 20px 60px rgba(23, 60, 53, 0.2);
  max-width: 34rem;
  padding: 1.5rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;
const Heading = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const Title = styled.h2`
  color: #173c35;
  font-size: 1.1rem;
  margin: 0;
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
  display: grid;
  font-size: 0.72rem;
  font-weight: 700;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
  input,
  select,
  textarea {
    background: #f7f6ef;
    border: 1px solid #dfe3d8;
    border-radius: 0.25rem;
    color: #173c35;
    font: inherit;
    min-height: 2.5rem;
    padding: 0.55rem;
  }
  textarea {
    min-height: 4rem;
    resize: vertical;
  }
`;
const Result = styled.div`
  background: #f7f6ef;
  border: 1px solid #dfe3d8;
  border-radius: 0.3rem;
  display: grid;
  gap: 0.65rem;
  padding: 1rem;
`;
const Risk = styled.strong`
  color: ${(props) =>
    props.$risk === "HIGH"
      ? "#a34c2e"
      : props.$risk === "MEDIUM"
        ? "#9a6a1b"
        : "#317052"};
  font-size: 1.25rem;
`;
const Text = styled.p`
  color: #52665b;
  font-size: 0.8rem;
  margin: 0;
`;
const Trigger = styled.button`
  background: #e8eee5;
  border: 0;
  border-radius: 0.25rem;
  color: #173c35;
  cursor: pointer;
  font: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.5rem 0.65rem;
`;
const Grid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;
const AiButton = styled(Trigger)`
  background: #173c35;
  color: #fffaf0;
  padding: 0.7rem 1rem;
  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;
const Advisory = styled.div`
  background: #edf4ee;
  border: 1px solid #cce0cf;
  border-radius: 0.3rem;
  color: #244a38;
  display: grid;
  gap: 0.6rem;
  padding: 1rem;
`;
const ErrorText = styled(Text)`
  color: #a34c2e;
`;

export function FinancialRiskButton({ username }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Trigger type="button" onClick={() => setOpen(true)}>
        Analyse capacity
      </Trigger>
      <FinancialRiskModal
        username={username}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default function FinancialRiskModal({ username, open, onClose }) {
  const { authConfig } = useAuthContext();
  const [groupId, setGroupId] = useState("");
  const [answers, setAnswers] = useState({
    monthlyIncome: "",
    monthlyObligations: "",
    emergencySavings: "",
    dependents: "0",
    employmentType: "SALARIED",
    employmentMonths: "",
    notes: "",
  });
  const [advisory, setAdvisory] = useState(null);
  const [aiError, setAiError] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const groups = useApiQuery({
    key: "financial-risk-groups",
    url: open ? APIConstants.groups : null,
    authConfig,
    enabled: open,
  });
  const risk = useApiQuery({
    key: `financial-risk-${username}-${groupId}`,
    url:
      open && groupId
        ? `${APIConstants.financialRisk}/${encodeURIComponent(username)}/financial-risk?groupId=${groupId}`
        : null,
    authConfig,
    enabled: Boolean(open && username && groupId),
  });
  const updateAnswer = (key, value) =>
    setAnswers((current) => ({ ...current, [key]: value }));
  const analyseWithAi = async () => {
    setAnalysing(true);
    setAiError("");
    try {
      const result = await api(
        {
          url: `${APIConstants.users}/${encodeURIComponent(username)}/ai-affordability`,
          method: "POST",
          body: {
            groupId: Number(groupId),
            monthlyIncome: Number(answers.monthlyIncome),
            monthlyObligations: Number(answers.monthlyObligations),
            emergencySavings: Number(answers.emergencySavings),
            dependents: Number(answers.dependents),
            employmentType: answers.employmentType,
            employmentMonths: Number(answers.employmentMonths),
            notes: answers.notes,
          },
        },
        authConfig,
      );
      setAdvisory(result.advisory);
    } catch (error) {
      setAiError(error?.message || "The AI advisory could not be generated.");
    } finally {
      setAnalysing(false);
    }
  };
  if (!open) return null;
  return (
    <Backdrop
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <Dialog>
        <Heading>
          <div>
            <Title>AI affordability advisory</Title>
            <Text>
              Use this as decision support alongside your own verification; it
              never approves or rejects a member automatically.
            </Text>
          </div>
          <CloseButton type="button" onClick={onClose} aria-label="Close">
            <Close fontSize="small" />
          </CloseButton>
        </Heading>
        <Field>
          Choose scheme group
          <select
            value={groupId}
            onChange={(event) => {
              setGroupId(event.target.value);
              setAdvisory(null);
            }}
          >
            <option value="">Select a group</option>
            {(groups.data || []).map((group) => (
              <option key={group.id} value={group.id}>
                {group.name || `Group #${group.id}`}
              </option>
            ))}
          </select>
        </Field>
        {risk.isLoading && <Text>Loading transaction history...</Text>}
        {risk.isError && (
          <ErrorText>
            Unable to load this member’s transaction history for the selected
            group.
          </ErrorText>
        )}
        {risk.data && (
          <>
            <Result>
              <Risk $risk={risk.data.risk}>
                {risk.data.risk} transaction risk
              </Risk>
              <Text>
                Monthly contribution:{" "}
                <strong>
                  ₹
                  {Number(risk.data.monthlyAmount || 0).toLocaleString("en-IN")}
                </strong>{" "}
                · Outstanding:{" "}
                <strong>
                  ₹{Number(risk.data.outstanding || 0).toLocaleString("en-IN")}
                </strong>
              </Text>
              <Text>
                Payments: {risk.data.paidPayments} / {risk.data.totalPayments}{" "}
                paid
              </Text>
            </Result>
            <Grid>
              <Field>
                Monthly income
                <input
                  min="0"
                  required
                  type="number"
                  value={answers.monthlyIncome}
                  onChange={(event) =>
                    updateAnswer("monthlyIncome", event.target.value)
                  }
                />
              </Field>
              <Field>
                Monthly obligations
                <input
                  min="0"
                  required
                  type="number"
                  value={answers.monthlyObligations}
                  onChange={(event) =>
                    updateAnswer("monthlyObligations", event.target.value)
                  }
                />
              </Field>
              <Field>
                Emergency savings
                <input
                  min="0"
                  required
                  type="number"
                  value={answers.emergencySavings}
                  onChange={(event) =>
                    updateAnswer("emergencySavings", event.target.value)
                  }
                />
              </Field>
              <Field>
                Dependents
                <input
                  min="0"
                  required
                  type="number"
                  value={answers.dependents}
                  onChange={(event) =>
                    updateAnswer("dependents", event.target.value)
                  }
                />
              </Field>
              <Field>
                Employment type
                <select
                  value={answers.employmentType}
                  onChange={(event) =>
                    updateAnswer("employmentType", event.target.value)
                  }
                >
                  <option value="SALARIED">Salaried</option>
                  <option value="SELF_EMPLOYED">Self-employed</option>
                  <option value="BUSINESS">Business owner</option>
                  <option value="OTHER">Other</option>
                </select>
              </Field>
              <Field>
                Employment duration (months)
                <input
                  min="0"
                  required
                  type="number"
                  value={answers.employmentMonths}
                  onChange={(event) =>
                    updateAnswer("employmentMonths", event.target.value)
                  }
                />
              </Field>
            </Grid>
            <Field>
              Admin notes (optional)
              <textarea
                value={answers.notes}
                onChange={(event) => updateAnswer("notes", event.target.value)}
                placeholder="Verified income source, expected changes, or documents checked"
              />
            </Field>
            <AiButton
              type="button"
              disabled={
                analysing ||
                !answers.monthlyIncome ||
                !answers.monthlyObligations ||
                !answers.emergencySavings ||
                !answers.employmentMonths
              }
              onClick={analyseWithAi}
            >
              {analysing ? "Generating advisory..." : "Generate AI advisory"}
            </AiButton>
            {aiError && <ErrorText>{aiError}</ErrorText>}
            {advisory && (
              <Advisory>
                <Risk
                  $risk={
                    advisory.recommendation === "NOT_ADVISABLE"
                      ? "HIGH"
                      : advisory.recommendation === "MANUAL_REVIEW"
                        ? "MEDIUM"
                        : "LOW"
                  }
                >
                  {String(
                    advisory.recommendation || "MANUAL_REVIEW",
                  ).replaceAll("_", " ")}
                </Risk>
                <Text>{advisory.summary}</Text>
                {advisory.strengths?.length > 0 && (
                  <Text>
                    <strong>Strengths:</strong> {advisory.strengths.join(" · ")}
                  </Text>
                )}
                {advisory.concerns?.length > 0 && (
                  <Text>
                    <strong>Concerns:</strong> {advisory.concerns.join(" · ")}
                  </Text>
                )}
                {advisory.followUpQuestions?.length > 0 && (
                  <Text>
                    <strong>Verify:</strong>{" "}
                    {advisory.followUpQuestions.join(" · ")}
                  </Text>
                )}
                <Text>
                  {advisory.disclaimer ||
                    "This is an advisory only; an authorized admin must make the final decision."}
                </Text>
              </Advisory>
            )}
          </>
        )}
      </Dialog>
    </Backdrop>
  );
}
