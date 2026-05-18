import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_35px_rgba(0,0,0,0.15)]">
        <h1 className="text-3xl font-semibold text-white">Configurações</h1>
        <p className="mt-3 text-sm text-zinc-400">Atualize suas preferências e ajustes da conta.</p>

        <div className="mt-8 space-y-4 text-sm text-zinc-300">
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
            <p className="font-semibold text-white">Preferências de notificação</p>
            <p className="mt-2 text-zinc-400">Aqui serão exibidas as suas opções de e-mail e notificações.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
            <p className="font-semibold text-white">Segurança</p>
            <p className="mt-2 text-zinc-400">Configurações de acesso, autenticação e sessão.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
