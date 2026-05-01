"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    ArrowLeft,
    CalendarDays,
    CircleOff,
    Loader2,
    Plus,
    X,
} from "lucide-react";
import {
    getAgendaEvents,
    insertAgendaEvent,
} from "@/lib/oracle";
import type { AgendaContext, AgendaEvent, CalendarEvent } from "@/types/agenda";

export default function AgendaPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [events, setEvents] = useState<AgendaEvent[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/login");
        }
    }, [status]);

    useEffect(() => {
        async function loadAgenda() {
            if (status !== "authenticated" || !session?.user?.email) return;

            setIsLoadingData(true);
            setError(null);

            try {
                const email = session.user.email;

                const eventsData = await getAgendaEvents(email);

                const safeEvents = (eventsData ?? []).map((evt: any) => ({
                    id: evt.ID.toString(),
                    user_email: evt.USER_EMAIL,
                    title: evt.TITLE,
                    description: evt.DESCRIPTION,
                    context: evt.CONTEXT,
                    start_at: evt.START_AT,
                    end_at: evt.END_AT,
                })) as AgendaEvent[];

                setEvents(safeEvents);
            } catch (err) {
                console.error(err);
                setError("Não foi possível carregar sua agenda.");
            } finally {
                setIsLoadingData(false);
            }
        }

        loadAgenda();
    }, [status, session]);

    const calendarEvents = useMemo<CalendarEvent[]>(() => {
        return events.map((event) => ({
            id: event.id,
            title: event.title,
            start: event.start_at,
            end: event.end_at || event.start_at, // fallback se end_at for null
            backgroundColor: "#10b981", // cor padrão
            borderColor: "#10b981",
        }));
    }, [events]);

    async function handleCreateEvent() {
        if (!session?.user?.email) return;

        if (!newEventTitle.trim()) {
            alert("Digite um título para o evento");
            return;
        }

        try {
            const start = new Date();
            const end = new Date(start.getTime() + 60 * 60 * 1000);

            await insertAgendaEvent({
                user_email: session.user.email,
                title: newEventTitle,
                description: "",
                context: "Pessoal", // contexto padrão
                start_at: start.toISOString(),
                end_at: end.toISOString(),
            });

            setNewEventTitle("");
            setIsCreateModalOpen(false);

            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    if (status === "loading" || isLoadingData) {
        return (
            <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
                <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
                    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-zinc-300">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Carregando agenda...
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 md:px-6 md:py-10">
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
                            Agenda inteligente
                        </p>
                        <h1 className="mt-3 font-[var(--font-space)] text-4xl font-semibold tracking-tight text-white xl:text-6xl">
                            Sua agenda universal
                        </h1>
                        <p className="mt-4 text-base leading-7 text-zinc-400">
                            Visualize compromissos de trabalho, pessoal, estudo e saúde em uma única agenda,
                            com filtros por contexto e base pronta para automações.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Voltar ao site
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(true)}
                            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-2xl bg-emerald-400 px-6 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
                        >
                            <Plus className="h-4 w-4" />
                            Novo evento
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <section className="rounded-[1.75rem] border border-white/10 bg-zinc-900/60 p-4 xl:p-6">
                        {calendarEvents.length === 0 ? (
                            <div className="flex min-h-[500px] flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-white/10 bg-zinc-900/40 p-8 text-center">
                                <CircleOff className="mb-4 h-8 w-8 text-zinc-500" />
                                <h3 className="font-[var(--font-space)] text-xl font-semibold text-white">
                                    Nenhum evento ainda
                                </h3>
                                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
                                    Sua agenda já está pronta. O próximo passo é criar o primeiro
                                    evento e começar a usar os contextos visuais.
                                </p>
                            </div>
                        ) : (
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="timeGridWeek"
                                headerToolbar={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: "timeGridWeek,timeGridDay,dayGridMonth",
                                }}
                                locale="pt-br"
                                height="auto"
                                editable
                                selectable
                                nowIndicator
                                expandRows
                                allDaySlot={false}
                                slotMinTime="06:00:00"
                                slotMaxTime="23:00:00"
                                dayHeaderFormat={{
                                    weekday: "short",
                                    day: "2-digit",
                                    month: "2-digit",
                                }}
                                events={calendarEvents}
                                eventTimeFormat={{
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                }}
                                slotLabelFormat={{
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                }}
                                buttonText={{
                                    today: "Hoje",
                                    month: "Mês",
                                    week: "Semana",
                                    day: "Dia",
                                }}
                            />
                        )}
                    </section>
                </div>
            </div>

            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm md:flex md:items-center md:justify-center md:px-4">
                    <div className="h-[100dvh] w-full overflow-y-auto border-x border-white/10 bg-zinc-950 px-4 pb-8 pt-5 shadow-2xl shadow-black/40 md:h-auto md:max-h-[90vh] md:max-w-xl md:rounded-[2rem] md:border md:px-8 md:pb-8 md:pt-6">

                        <div className="sticky top-0 z-10 mb-5 flex items-start justify-between gap-4 border-b border-white/10 bg-zinc-950 pb-4 md:static md:border-b-0 md:bg-transparent md:pb-0">
                            <div>
                                <h2 className="font-[var(--font-space)] text-2xl font-semibold text-white">
                                    Criar evento
                                </h2>

                                <p className="mt-2 text-sm text-zinc-400">
                                    Crie um novo bloco na sua agenda inteligente
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setIsCreateModalOpen(false);
                                    setNewEventTitle("");
                                }}
                                className="cursor-pointer rounded-full border border-white/10 p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-5 mt-6">
                            <div>
                                <label className="mb-2 block text-sm text-zinc-300">
                                    Nome do evento
                                </label>

                                <input
                                    value={newEventTitle}
                                    onChange={(e) => setNewEventTitle(e.target.value)}
                                    placeholder="Ex: reunião com cliente"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-emerald-400/40"
                                />
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <button
                                    onClick={() => {
                                        setIsCreateModalOpen(false);
                                        setNewEventTitle("");
                                    }}
                                    className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={handleCreateEvent}
                                    className="cursor-pointer rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
                                >
                                    Criar evento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}