import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <section className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
          Dashboard
        </p>

        <h1 className="mt-3 font-[var(--font-space)] text-3xl font-semibold text-white">
          Painel interno
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-zinc-400">
          Sua central privada para projetos, testes e expansão futura.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <Link
          href="/admin/projetos"
          className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-400/30"
        >
          <h2 className="font-[var(--font-space)] text-xl font-semibold text-white">
            Projetos
          </h2>

          <p className="mt-3 text-sm text-zinc-400">
            Acesse seus projetos privados.
          </p>
        </Link>

        <Link
          href="/admin/leads"
          className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-400/30"
        >
          <h2 className="font-[var(--font-space)] text-xl font-semibold text-white">
            Leads
          </h2>

          <p className="mt-3 text-sm text-zinc-400">
            Visualize os pedidos de orçamento recebidos.
          </p>
        </Link>
      </div>
    </div>
  );
}