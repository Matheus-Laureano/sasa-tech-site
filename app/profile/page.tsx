import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_35px_rgba(0,0,0,0.15)]">
        <h1 className="text-3xl font-semibold text-white">Perfil</h1>
        <p className="mt-3 text-sm text-zinc-400">Veja os seus dados, role e informações de conta.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
            <p className="text-sm text-zinc-400">Nome</p>
            <p className="mt-2 text-base font-semibold text-white">{session.user.name || "Sem nome"}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
            <p className="text-sm text-zinc-400">E-mail</p>
            <p className="mt-2 text-base font-semibold text-white">{session.user.email}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
            <p className="text-sm text-zinc-400">Tipo de usuário</p>
            <p className="mt-2 text-base font-semibold text-white">{(session.user as any).role === "ADMIN" ? "Administrador" : "Usuário"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
