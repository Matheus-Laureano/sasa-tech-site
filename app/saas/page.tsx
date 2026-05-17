import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getTicketSummaryByUser, listTickets } from "@/lib/oracle";
import StatusBadge from "@/components/saas/status-badge";

export default async function SaasDashboardPage() {
  // Temporariamente removido login obrigatório
  // const session = await auth();
  // if (!session?.user?.email) {
  //   redirect("/login");
  // }

  // const userId = session.user.id as string;
  // const summary = await getTicketSummaryByUser(userId);
  // const tickets = await listTickets({ userId, isAdmin: false });

  // Dados mockados para teste
  const summary = { total: 0, open: 0, inProgress: 0, closed: 0, Aberto: 0, "Em atendimento": 0, "Aguardando resposta do usuário": 0, Resolvido: 0, Fechado: 0 };
  const tickets: any[] = [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">Suporte TI</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Meus chamados</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Veja o status dos seus pedidos de suporte, acompanhe respostas e abra novos chamados.
          </p>
        </div>
        <Link
          href="/saas/novo"
          className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
        >
          Abrir novo chamado
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Aberto", value: summary.Aberto ?? 0 },
          { label: "Em atendimento", value: summary["Em atendimento"] ?? 0 },
          { label: "Aguardando resposta", value: summary["Aguardando resposta do usuário"] ?? 0 },
          { label: "Finalizados", value: (summary.Resolvido ?? 0) + (summary.Fechado ?? 0) },
        ].map((card) => (
          <div key={card.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_45px_rgba(0,0,0,0.15)]">
            <p className="text-sm text-zinc-400">{card.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_35px_rgba(0,0,0,0.15)]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Chamados recentes</h2>
            <p className="mt-1 text-sm text-zinc-400">Acompanhe os últimos chamados abertos por você.</p>
          </div>
          <Link href="/saas/novo" className="rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90">
            Novo chamado
          </Link>
        </div>

        {tickets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-zinc-400">
            Você ainda não abriu nenhum chamado. Comece criando um novo solicitado.
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.slice(0, 5).map((ticket) => (
              <Link
                key={ticket.id}
                href={`/saas/${ticket.id}`}
                className="block rounded-3xl border border-white/10 bg-zinc-950/70 p-5 transition hover:border-emerald-400/50"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">{ticket.requester_email}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{ticket.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400">{ticket.category} • {ticket.priority}</p>
                  </div>
                  <StatusBadge status={ticket.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
