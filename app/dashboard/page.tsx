import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  if ((session.user as any).role === "ADMIN" || session.user.email === "matheuszlau@gmail.com") {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 md:px-6">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center gap-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/30">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">Bem-vindo</p>
            <h1 className="mt-3 font-[var(--font-space)] text-3xl font-semibold text-white">
              Escolha para onde deseja ir
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Você pode acessar o painel de chamados ou a agenda pessoal.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/saas"
              className="rounded-3xl border border-white/10 bg-zinc-950/80 px-6 py-5 text-center text-sm font-semibold text-white transition hover:border-emerald-400/40 hover:bg-white/5"
            >
              Acessar SaaS
            </Link>
            <Link
              href="/agenda"
              className="rounded-3xl border border-white/10 bg-zinc-950/80 px-6 py-5 text-center text-sm font-semibold text-white transition hover:border-emerald-400/40 hover:bg-white/5"
            >
              Acessar Agenda
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
