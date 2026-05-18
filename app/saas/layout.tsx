import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SaasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">Painel SaaS</p>
            <h1 className="font-[var(--font-space)] text-xl font-semibold text-white">Área de chamados</h1>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
          >
            Voltar ao site principal
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
