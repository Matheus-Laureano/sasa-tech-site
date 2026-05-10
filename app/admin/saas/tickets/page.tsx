import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { listTickets } from "@/lib/oracle";
import StatusBadge from "@/components/saas/status-badge";

export default async function AdminSaasTicketsPage() {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const tickets = await listTickets({ isAdmin: true });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">Tickets</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Lista de chamados</h1>
          <p className="mt-2 text-sm text-zinc-400">Gerencie todos os tickets abertos, em atendimento e finalizados.</p>
        </div>
        <Link href="/admin/saas" className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">
          Voltar ao painel
        </Link>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_35px_rgba(0,0,0,0.15)]">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm text-zinc-300">
          <thead className="border-b border-white/10 bg-zinc-950/80 text-zinc-400">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">Título</th>
              <th className="px-5 py-4">Solicitante</th>
              <th className="px-5 py-4">Prioridade</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Criado em</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="transition hover:bg-white/5"
              >
                <td className="px-5 py-4 font-medium text-white">{ticket.id.slice(0, 8)}</td>
                <td className="px-5 py-4">{ticket.title}</td>
                <td className="px-5 py-4">{ticket.requester_email}</td>
                <td className="px-5 py-4">{ticket.priority}</td>
                <td className="px-5 py-4"><StatusBadge status={ticket.status} /></td>
                <td className="px-5 py-4">{new Date(ticket.created_at).toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
