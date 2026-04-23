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
  user_id: string;
  context_id: string | null;
  title: string;
  description_markdown: string | null;
  start_at: string;
  end_at: string;
  energy_level: EnergyLevel;
  is_flexible: boolean;
  is_meeting: boolean;
  is_completed: boolean;
  created_at: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  extendedProps: {
    contextId: string | null;
    energyLevel: EnergyLevel;
    description: string | null;
    isFlexible: boolean;
    isMeeting: boolean;
    isCompleted: boolean;
  };
};