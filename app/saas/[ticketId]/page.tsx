import { auth } from "@/auth";
import { fetchTicketHistory, fetchTicketMessages, getTicketById } from "@/lib/oracle";
import StatusBadge from "@/components/saas/status-badge";
import { redirect } from "next/navigation";

interface PageProps {
  params: { ticketId: string };
}

export default async function TicketPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const ticket = await getTicketById(params.ticketId);
  if (!ticket) {
    redirect("/saas");
  }

  const userId = session.user.id as string;
  if (ticket.requester_id !== userId && session.user.role !== "ADMIN") {
    redirect("/saas");
  }

  const messages = await fetchTicketMessages(params.ticketId);
  const history = await fetchTicketHistory(params.ticketId);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">Detalhes do chamado</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{ticket.title}</h1>
          <p className="mt-2 text-sm text-zinc-400">Número do chamado: {ticket.id}</p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_35px_rgba(0,0,0,0.15)]">
          <div>
            <h2 className="text-lg font-semibold text-white">Descrição</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-300">{ticket.description}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
              <p className="text-sm text-zinc-400">Categoria</p>
              <p className="mt-2 text-base font-semibold text-white">{ticket.category}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
              <p className="text-sm text-zinc-400">Prioridade</p>
              <p className="mt-2 text-base font-semibold text-white">{ticket.priority}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
            <p className="text-sm text-zinc-400">Solicitante</p>
            <p className="mt-2 text-base font-semibold text-white">{ticket.requester_name}</p>
            <p className="mt-1 text-sm text-zinc-500">{ticket.requester_email}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
            <p className="text-sm text-zinc-400">Última atualização</p>
            <p className="mt-2 text-base font-semibold text-white">{new Date(ticket.updated_at).toLocaleString("pt-BR")}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">Mensagens</h2>
            <div className="mt-4 space-y-4">
              {messages.length === 0 ? (
                <p className="text-sm text-zinc-400">Nenhuma mensagem registrada ainda.</p>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{message.author_name || (message.is_admin ? "Técnico" : "Você")}</p>
                      <span className="text-xs text-zinc-500">{new Date(message.created_at).toLocaleString("pt-BR")}</span>
                    </div>
                    <p className="text-sm leading-6 text-zinc-300">{message.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_35px_rgba(0,0,0,0.15)]">
          <div>
            <h2 className="text-lg font-semibold text-white">Histórico</h2>
            <div className="mt-4 space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-zinc-400">Nenhuma alteração registrada ainda.</p>
              ) : (
                history.map((entry) => (
                  <div key={entry.id} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                    <p className="text-sm font-semibold text-white">{entry.action_type}</p>
                    <p className="mt-1 text-xs text-zinc-500">{entry.author_name || "Sistema"} • {new Date(entry.created_at).toLocaleString("pt-BR")}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{entry.new_value || entry.old_value || "Ação registrada."}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
