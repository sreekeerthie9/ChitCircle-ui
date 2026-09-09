"use client";

import { Close } from "@mui/icons-material";
import { useState } from "react";
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
  max-width: 34rem;
  padding: 1.5rem;
  width: 100%;
`;

const Heading = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
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

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  color: #52665b;
  display: flex;
  flex-direction: column;
  font-size: 0.72rem;
  font-weight: 700;
  gap: 0.4rem;
  input,
  select {
    background: #f7f6ef;
    border: 1px solid #dfe3d8;
    border-radius: 0.25rem;
    color: #173c35;
    font: inherit;
    min-height: 2.5rem;
    padding: 0.55rem;
  }
`;

const ValidationError = styled.span`
  color: #a34c2e;
  font-size: 0.68rem;
  font-weight: 600;
`;

const Footer = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  background: ${(props) => (props.$primary ? "#173c35" : "#e8eee5")};
  border: 0;
  border-radius: 0.25rem;
  color: ${(props) => (props.$primary ? "#fffaf0" : "#173c35")};
  cursor: pointer;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.7rem 1rem;
`;

const fields = {
  schemes: [
    ["name", "Scheme name", "text"],
    ["potAmount", "Pot amount", "number"],
    ["durationMonths", "Duration (months)", "number"],
    ["memberCount", "Member count", "number"],
    ["commissionRate", "Commission rate (%) (optional)", "number"],
  ],
  groups: [
    ["name", "Group name", "text"],
    ["startDate", "Start date", "date"],
  ],
  customers: [
    ["username", "Username", "text"],
    ["displayName", "Display name", "text"],
    ["email", "Email", "email"],
    ["phone", "Phone", "tel"],
    ["password", "Temporary password", "password"],
  ],
};

const validation = {
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email address, for example name@example.com.",
  },
  phone: {
    regex: /^(?:\+91[ -]?)?[6-9]\d{9}$/,
    message: "Enter a valid 10-digit Indian mobile number, optionally prefixed with +91.",
  },
};

export default function CrudDialog({
  type,
  open,
  initialValue,
  onClose,
  onSubmit,
  pending,
  schemeOptions = [],
  customerOptions = [],
}) {
  const [values, setValues] = useState(initialValue || {});
  const [errors, setErrors] = useState({});
  if (!open) return null;
  const selectedScheme = schemeOptions.find(
    (scheme) => Number(scheme.id) === Number(values.schemeId),
  );
  const memberLimit = Number(selectedScheme?.memberCount);
  const selectedMemberIds = values.memberIds || [];
  const isAtMemberLimit =
    Number.isFinite(memberLimit) && selectedMemberIds.length >= memberLimit;
  const validateField = (key, value) => {
    const rule = validation[key];
    if (!rule || !value) return "";
    return rule.regex.test(value.trim()) ? "" : rule.message;
  };
  const updateField = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (validation[key]) {
      setErrors((current) => ({
        ...current,
        [key]: validateField(key, value),
      }));
    }
  };
  const title = `${initialValue ? "Edit" : "Create"} ${type === "schemes" ? "scheme" : type === "groups" ? "group" : "user"}`;
  const submit = (event) => {
    event.preventDefault();
    const contactErrors = Object.fromEntries(
      Object.keys(validation)
        .map((key) => [key, validateField(key, values[key] || "")])
        .filter(([, message]) => message),
    );
    if (Object.keys(contactErrors).length) {
      setErrors(contactErrors);
      return;
    }
    const selectedStatus = new FormData(event.currentTarget).get("status");
    const payload = Object.fromEntries(
      Object.entries(values).filter(
        ([, value]) => value !== "" && value !== undefined,
      ),
    );
    if (payload.schemeId) payload.schemeId = Number(payload.schemeId);
    if (payload.memberIds) payload.memberIds = payload.memberIds.map(Number);
    if (type === "groups") {
      onSubmit(
        initialValue
          ? {
              name: payload.name,
              startDate: payload.startDate,
              status: selectedStatus,
              memberIds: payload.memberIds || [],
            }
          : {
              schemeId: payload.schemeId,
              memberIds: payload.memberIds,
              name: payload.name,
              startDate: payload.startDate,
            },
      );
      return;
    }
    onSubmit(payload);
  };
  return (
    <Backdrop
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <Dialog onSubmit={submit}>
        <Heading>
          <Title>{title}</Title>
          <CloseButton type="button" onClick={onClose} aria-label="Close">
            <Close fontSize="small" />
          </CloseButton>
        </Heading>
        <Grid>
          {type === "groups" && (
            <>
              <Field>
                Scheme
                <select
                  required={!initialValue}
                  disabled={Boolean(initialValue)}
                  value={values.schemeId || ""}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      schemeId: event.target.value,
                    }))
                  }
                >
                  <option value="">Select a scheme</option>
                  {schemeOptions.map((scheme) => (
                    <option key={scheme.id} value={scheme.id}>
                      {scheme.name} ({scheme.memberCount} members)
                    </option>
                  ))}
                </select>
              </Field>
              <Field>
                Members
                <select
                  multiple
                  value={selectedMemberIds}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      memberIds: [...event.target.selectedOptions].map(
                        (option) => option.value,
                      ),
                    }))
                  }
                >
                  {customerOptions.map((customer) => {
                    const selected = selectedMemberIds.map(String).includes(String(customer.id));
                    return (
                      <option
                        disabled={!selected && isAtMemberLimit}
                        key={customer.id}
                        value={customer.id}
                      >
                        {customer.displayName || customer.username}
                      </option>
                    );
                  })}
                </select>
                {Number.isFinite(memberLimit) && (
                  <small>{selectedMemberIds.length} of {memberLimit} members selected</small>
                )}
              </Field>
            </>
          )}
          {fields[type].map(([key, label, inputType]) => (
            <Field key={key}>
              {label}
              <input
                inputMode={key === "phone" ? "tel" : undefined}
                min={
                  type === "schemes" && key === "memberCount" ? 5 : undefined
                }
                required={
                  !initialValue &&
                  key !== "password" &&
                  !(type === "schemes" && key === "commissionRate")
                }
                type={key === "email" ? "text" : inputType}
                value={values[key] || ""}
                aria-invalid={Boolean(errors[key])}
                onChange={(event) => updateField(key, event.target.value)}
                onBlur={(event) => {
                  if (validation[key]) {
                    setErrors((current) => ({
                      ...current,
                      [key]: validateField(key, event.target.value),
                    }));
                  }
                }}
              />
              {errors[key] && <ValidationError>{errors[key]}</ValidationError>}
            </Field>
          ))}
          {type === "groups" && initialValue && (
            <Field>
              Status
              <select
                name="status"
                value={values.status || "FORMING"}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    status: event.target.value,
                  }))
                }
              >
                <option value="FORMING">Forming</option>
                <option value="ACTIVE">Active</option>
                <option value="RUNNING">Running</option>
                <option value="BIDDING_OPEN">Bidding open</option>
                <option value="COMPLETED">Completed</option>
                <option value="CLOSED">Closed</option>
              </select>
            </Field>
          )}
        </Grid>
        <Footer>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button $primary type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save"}
          </Button>
        </Footer>
      </Dialog>
    </Backdrop>
  );
}
