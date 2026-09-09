"use client";

import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import CrudDialog from "@/components/admin/CrudDialog";
import KycReview from "@/components/admin/KycReview";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { Close } from "@mui/icons-material";
import { useState } from "react";

const Shell = styled.main`
  color: #242d2b;
  max-width: 1180px;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-family: Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0 0 1.5rem;
`;
const TableWrap = styled.div`
  background: #fff;
  border: 1px solid #dfe3d8;
  border-radius: 0.35rem;
  overflow-x: auto;
`;
const Table = styled.table`
  border-collapse: collapse;
  min-width: 720px;
  width: 100%;
  th,
  td {
    border-top: 1px solid #e8ebe2;
    padding: 0.9rem 1.1rem;
    text-align: left;
  }
  th {
    color: #68766f;
    font-size: 0.68rem;
    text-transform: uppercase;
  }
  td {
    color: #3f5149;
    font-size: 0.82rem;
  }
`;
const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.25rem;
`;
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
const DialogTitle = styled.h2`
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
  input {
    background: #f7f6ef;
    border: 1px solid #dfe3d8;
    border-radius: 0.25rem;
    color: #173c35;
    font: inherit;
    min-height: 2.5rem;
    padding: 0.55rem;
  }
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
  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-dierection: row;
  justify-content: space-between;
  gap: 0.45rem;
  > button {
    min-height: 2.25rem;
    padding: 0.5rem 0.65rem;
  }
`;

function CreateAdminDialog({
  open,
  form,
  pending,
  onChange,
  onClose,
  onSubmit,
}) {
  if (!open) return null;
  return (
    <Backdrop
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <Dialog
        onSubmit={onSubmit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-admin-title"
      >
        <Heading>
          <DialogTitle id="create-admin-title">Create admin</DialogTitle>
          <CloseButton type="button" onClick={onClose} aria-label="Close">
            <Close fontSize="small" />
          </CloseButton>
        </Heading>
        <Grid>
          <Field>
            Username
            <input
              required
              value={form.username}
              onChange={(event) => onChange("username", event.target.value)}
            />
          </Field>
          <Field>
            Temporary password
            <input
              required
              minLength="8"
              type="password"
              value={form.password}
              onChange={(event) => onChange("password", event.target.value)}
            />
          </Field>
          <Field>
            Display name
            <input
              required
              value={form.displayName}
              onChange={(event) => onChange("displayName", event.target.value)}
            />
          </Field>
          <Field>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => onChange("email", event.target.value)}
            />
          </Field>
        </Grid>
        <Footer>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button $primary type="submit" disabled={pending}>
            {pending ? "Creating..." : "Create admin"}
          </Button>
        </Footer>
      </Dialog>
    </Backdrop>
  );
}

function DeactivateUserButton({ user }) {
  const { authConfig } = useAuthContext();
  const deactivateMutation = useApiMutation({
    key: "platform-users",
    url: `${APIConstants.users}/${encodeURIComponent(user.username)}`,
    method: "PUT",
    authConfig,
    successMessage: "User deactivated",
  });

  const deactivate = () => {
    if (window.confirm(`Deactivate ${user.displayName || user.username}?`)) {
      deactivateMutation.mutate({ active: false });
    }
  };

  return (
    <Button
      type="button"
      onClick={deactivate}
      style={{ width: "100%" }}
      disabled={!user.active || deactivateMutation.isPending}
    >
      {deactivateMutation.isPending ? "Deactivating..." : "Deactivate"}
    </Button>
  );
}

export default function SuperAdminUsersPage() {
  const { authConfig } = useAuthContext();
  const [form, setForm] = useState({
    username: "",
    password: "",
    displayName: "",
    email: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading, refetch: refetchUsers } = useApiQuery({
    key: "platform-users",
    url: APIConstants.platformUsers,
    authConfig,
  });
  const createAdminMutation = useApiMutation({
    key: "platform-users",
    url: APIConstants.createAdmin,
    authConfig,
    successMessage: "Admin user created",
    onSuccess: () => {
      setForm({ username: "", password: "", displayName: "", email: "" });
      setDialogOpen(false);
    },
  });
  const updateUserMutation = useApiMutation({
    key: "platform-users",
    url: editingUser
      ? `${APIConstants.users}/${encodeURIComponent(editingUser.username)}`
      : null,
    method: "PUT",
    authConfig,
    successMessage: "User updated",
    onSuccess: () => setEditingUser(null),
  });

  const submit = (event) => {
    event.preventDefault();
    createAdminMutation.mutate({ ...form, role: "ADMIN" });
  };

  return (
    <Shell>
      <Title>User access</Title>
      <Toolbar>
        <Button $primary type="button" onClick={() => setDialogOpen(true)}>
          Create admin
        </Button>
      </Toolbar>
      <CreateAdminDialog
        open={dialogOpen}
        form={form}
        pending={createAdminMutation.isPending}
        onChange={(key, value) =>
          setForm((current) => ({ ...current, [key]: value }))
        }
        onClose={() => setDialogOpen(false)}
        onSubmit={submit}
      />
      <CrudDialog
        key={`superadmin-user-${editingUser?.id || "none"}`}
        type="customers"
        open={Boolean(editingUser)}
        initialValue={editingUser}
        pending={updateUserMutation.isPending}
        onClose={() => setEditingUser(null)}
        onSubmit={(values) => updateUserMutation.mutate(values)}
      />
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>KYC</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">Loading users...</td>
              </tr>
            ) : (
              (data || []).map((user) => (
                <tr key={user.id}>
                  <td>{user.displayName}</td>
                  <td>{user.username}</td>
                  <td>{user.role || "CUSTOMER"}</td>
                  <td>{user.kycStatus}</td>
                  <td>{user.active ? "Active" : "Suspended"}</td>
                  <td>
                    <div style={{ display: "grid", gap: "0.45rem", minWidth: "8rem" }}>
                      <ActionRow>
                      <Button type="button" style={{ width: "100%" }} onClick={() => setEditingUser(user)}>
                        Edit
                      </Button>
                      <DeactivateUserButton user={user} />
                      </ActionRow>
                      <KycReview
                        username={user.username}
                        documentsUrl={APIConstants.superadminKycDocuments}
                        onReviewed={refetchUsers}
                      />
                      
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableWrap>
    </Shell>
  );
}
