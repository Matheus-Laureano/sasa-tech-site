import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.email === "matheuszlau@gmail.com";
  if (!session?.user || !isAdmin) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
              Painel interno
            </p>
            <h1 className="font-[var(--font-space)] text-xl font-semibold text-white">
              SASA TECH Admin
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}