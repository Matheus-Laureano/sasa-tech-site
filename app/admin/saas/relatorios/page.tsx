import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getReportData } from "@/lib/oracle";

export default async function AdminSaasReportsPage() {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const report = await getReportData();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">Relatórios</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Análise de chamados</h1>
        <p className="mt-2 text-sm text-zinc-400">Veja quantidade de chamados por status, categoria e mês.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-400">Chamados atrasados</p>
          <p className="mt-4 text-4xl font-semibold text-white">{report.overdue}</p>
        </div>
        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Status</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {report.status.map((status) => (
              <div key={status.status} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                <p className="text-sm text-zinc-400">{status.status}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{status.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-8 grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Categorias</h2>
          <div className="mt-4 space-y-3">
            {report.category.map((category) => (
              <div key={category.category} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                <p className="text-sm text-zinc-400">{category.category}</p>
                <p className="mt-2 text-lg font-semibold text-white">{category.count}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Chamados por mês</h2>
          <div className="mt-4 space-y-3">
            {report.monthly.map((month) => (
              <div key={month.month} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                <p className="text-sm text-zinc-400">{month.month}</p>
                <p className="mt-2 text-lg font-semibold text-white">{month.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
