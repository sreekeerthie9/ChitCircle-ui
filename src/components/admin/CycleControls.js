"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";
import { api } from "@/utils/APIMethods";
import AdminWorkspace from "./AdminWorkspace";

const Section = styled.section`
  background: #fffdf8;
  border: 1px solid #dfe3d8;
  border-radius: 0.35rem;
  margin: 0 auto 1.5rem;
  max-width: 1320px;
  padding: 1.2rem 1.3rem;
`;
const Form = styled.form`
  display: grid;
  gap: 0.8rem;
  grid-template-columns: minmax(16rem, 2fr) auto;
  align-items: end;
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;
const Field = styled.label`
  color: #52665b;
  display: grid;
  font-size: 0.7rem;
  font-weight: 700;
  gap: 0.35rem;
  input,
  select {
    background: #f7f6ef;
    border: 1px solid #dfe3d8;
    border-radius: 0.25rem;
    color: #173c35;
    font: inherit;
    min-height: 2.4rem;
    padding: 0.55rem;
  }
`;
const Button = styled.button`
  background: ${(props) => (props.$secondary ? "#e8eee5" : "#173c35")};
  border: 0;
  border-radius: 0.25rem;
  color: ${(props) => (props.$secondary ? "#173c35" : "#fffaf0")};
  cursor: pointer;
  font: inherit;
  font-size: 0.76rem;
  font-weight: 700;
  min-height: 2.4rem;
  padding: 0.55rem 0.8rem;
`;
const Title = styled.h2`
  color: #173c35;
  font-size: 1rem;
  margin: 0 0 0.9rem;
`;
const Hint = styled.p`
  color: #76847b;
  font-size: 0.78rem;
  margin: 0 0 1rem;
`;

export default function CycleControls() {
  const { authConfig } = useAuthContext();
  const queryClient = useQueryClient();
  const groups = useApiQuery({
    key: "cycle-group-options",
    url: APIConstants.groups,
    authConfig,
  });
  const [form, setForm] = useState({ groupId: "" });
  const [message, setMessage] = useState("");
  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const create = async (event) => {
    event.preventDefault();
    try {
      await api(
        {
          url: `${APIConstants.groups}/${form.groupId}/cycles/current`,
          method: "POST",
        },
        authConfig,
      );
      setMessage(
        "Current-month cycle is ready. Open claims from the cycle row when members can request the chit.",
      );
      setForm({ groupId: "" });
      await queryClient.invalidateQueries({ queryKey: ["cycles"] });
    } catch (error) {
      setMessage(
        error?.message ||
          error?.detail ||
          "Unable to create the current-month cycle.",
      );
    }
  };
  return (
    <>
      <Section>
        <Title>Create current-month cycle</Title>
        <Hint>
          A cycle can only be created when the group is within its scheme
          duration. Members can submit claims once you open claims for that
          cycle.
        </Hint>
        <Form onSubmit={create}>
          <Field>
            Group
            <select
              required
              value={form.groupId}
              onChange={(event) => update("groupId", event.target.value)}
            >
              <option value="">Select a group</option>
              {(groups.data || []).map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name || group.schemeName}
                </option>
              ))}
            </select>
          </Field>
          <Button type="submit">Create current cycle</Button>
        </Form>
        {message && <Hint>{message}</Hint>}
      </Section>
      <AdminWorkspace section="cycles" />
    </>
  );
}
