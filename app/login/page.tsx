import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 md:p-8">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
              Área interna
            </p>
            <h1 className="mt-3 font-[var(--font-space)] text-3xl font-semibold text-white">
              Entrar no painel
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Faça login com sua conta Google para acessar a área administrativa.
            </p>
          </div>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/admin" });
            }}
          >
            <button
              type="submit"
              className="w-full cursor-pointer rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
            >
              Entrar com Google
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}