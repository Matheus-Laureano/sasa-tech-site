export type TicketStatus =
  | "Aberto"
  | "Aguardando atendimento"
  | "Em atendimento"
  | "Aguardando resposta do usuário"
  | "Aguardando compra de peça"
  | "Aguardando aprovação"
  | "Agendado"
  | "Resolvido"
  | "Fechado"
  | "Cancelado";

export type TicketPriority = "Baixa" | "Média" | "Alta" | "Urgente";

export interface TicketRecord {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  assigned_to?: string | null;
  equipment?: string | null;
  location?: string | null;
  contact_phone?: string | null;
  sla_due_at?: string | null;
  created_at: string;
  updated_at: string;
  closed_at?: string | null;
  is_closed: number;
  requester_name?: string;
  requester_email?: string;
}

export interface TicketSummary {
  id: string;
  title: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
  closed_at?: string | null;
  is_closed: number;
  requester_name?: string;
  requester_email?: string;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  user_id?: string | null;
  is_admin: number;
  message: string;
  created_at: string;
  author_name?: string;
}

export interface TicketHistoryItem {
  id: string;
  ticket_id: string;
  action_type: string;
  old_value?: string | null;
  new_value?: string | null;
  author_id?: string | null;
  author_name?: string | null;
  created_at: string;
}
