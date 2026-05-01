export type EnergyLevel = "alto" | "medio" | "baixo";

export type AgendaContext = {
  id: string;
  user_id: string;
  name: string;
  color: string;
  is_visible: boolean;
  created_at: string;
};

export type AgendaEvent = {
  id: string;
  user_email: string;
  title: string;
  description: string | null;
  context: string | null;
  start_at: string;
  end_at: string | null;
  created_at: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
};