"use client";

import { NotificationsNoneOutlined } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import APIConstants from "@/constants/APIConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiQuery } from "@/hooks/useApi";
import { api } from "@/utils/APIMethods";

const Shell = styled.main`color: #173c35; max-width: 900px; margin: 0 auto;`;
const Title = styled.h1`font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); margin: 0 0 1.5rem;`;
const List = styled.div`display: grid; gap: 0.75rem;`;
const Item = styled.article`background: #fffdf8; border: 1px solid #dfe3d8; border-left: 4px solid ${(props) => props.$read ? "#dfe3d8" : "#c08c35"}; border-radius: 0.35rem; padding: 1rem 1.2rem;`;
const Type = styled.strong`display: block; font-size: 0.9rem; text-transform: capitalize;`;
const Body = styled.p`color: #66766d; font-size: 0.82rem; line-height: 1.5; margin: 0.4rem 0;`;
const Button = styled.button`background: #e8eee5; border: 0; border-radius: 0.3rem; color: #173c35; cursor: pointer; font: inherit; font-size: 0.75rem; padding: 0.5rem 0.7rem;`;

export default function NotificationsPage() {
  const { authConfig } = useAuthContext();
  const query = useApiQuery({ key: "notifications", url: APIConstants.notifications, authConfig });
  const queryClient = useQueryClient();
  const notificationMessage = (payload) => {
    if (!payload) return "You have a new account update.";
    try {
      return JSON.parse(payload).message || payload;
    } catch {
      return payload;
    }
  };
  const markRead = async (id) => { await api({ url: `${APIConstants.notifications}/${id}/read`, method: "POST" }, authConfig); await queryClient.invalidateQueries({ queryKey: ["notifications"] }); };
  return <Shell><Title><NotificationsNoneOutlined fontSize="small" /> Notifications</Title><List>{(query.data || []).map((item) => <Item key={item.id} $read={Boolean(item.readAt)}><Type>{item.type.replaceAll("_", " ").toLowerCase()}</Type><Body>{notificationMessage(item.payload)}</Body>{!item.readAt && <Button onClick={() => markRead(item.id)}>Mark as read</Button>}</Item>)}</List></Shell>;
}
