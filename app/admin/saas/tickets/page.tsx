import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { listTickets } from "@/lib/oracle";
import AdminTicketTable from "@/components/saas/admin-ticket-table";

export default async function AdminSaasTicketsPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  // Admin role check is already done in admin layout

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

      <AdminTicketTable tickets={tickets} />
    </main>
  );
}
