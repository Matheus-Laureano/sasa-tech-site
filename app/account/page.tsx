import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_35px_rgba(0,0,0,0.15)]">
        <h1 className="text-3xl font-semibold text-white">Minha conta</h1>
        <p className="mt-3 text-sm text-zinc-400">Acompanhe informações da sua conta e preferências gerais.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
            <p className="text-sm text-zinc-400">Membro desde</p>
            <p className="mt-2 text-base font-semibold text-white">Dados da conta disponíveis após login.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
            <p className="text-sm text-zinc-400">Status</p>
            <p className="mt-2 text-base font-semibold text-white">{session?.user ? "Ativa" : "Não autenticada"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
