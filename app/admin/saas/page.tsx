import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getReportData, listTickets } from "@/lib/oracle";
import StatusBadge from "@/components/saas/status-badge";

export default async function AdminSaasDashboardPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  // Note: Admin role check is already done in admin layout

  const tickets = await listTickets({ isAdmin: true });
  const report = await getReportData();
  const total = tickets.length;
  const overdue = report.overdue;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">Admin SaaS</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Painel de chamados</h1>
          <p className="mt-2 text-sm text-zinc-400">Visão geral dos tickets de suporte e acesso rápido para a gestão.</p>
        </div>
        <div className="inline-flex items-center gap-3">
          <Link href="/admin/saas/tickets" className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10">
            Ver todos os chamados
          </Link>
          <Link href="/admin/saas/relatorios" className="rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90">
            Relatórios
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-400">Tickets registrados</p>
          <p className="mt-4 text-4xl font-semibold text-white">{total}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-400">Chamados atrasados</p>
          <p className="mt-4 text-4xl font-semibold text-white">{overdue}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-400">Status mais frequente</p>
          <p className="mt-4 text-4xl font-semibold text-white">{report.status?.[0]?.status ?? "—"}</p>
        </div>
      </div>

      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Chamados recentes</h2>
        <div className="mt-6 grid gap-4">
          {tickets.slice(0, 5).map((ticket) => (
            <Link
              key={ticket.id}
              href={`/admin/saas/${ticket.id}`}
              className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5 transition hover:border-emerald-400/50"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-zinc-400">{ticket.requester_email}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{ticket.title}</h3>
                </div>
                <StatusBadge status={ticket.status} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
