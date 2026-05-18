"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function TopMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (open && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="fixed top-5 right-4 z-[9999] bg-transparent px-4 py-2 md:px-6 md:top-2">
      <div className="flex justify-end">
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:bg-white/10"
          >
            <span>{session?.user?.name || session?.user?.email || "Conta"}</span>
            <span className="rounded-full bg-emerald-400 px-2 py-1 text-xs font-semibold uppercase text-zinc-950">
              {session?.user?.role === "ADMIN" ? "Admin" : "Usuário"}
            </span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 rounded-3xl border border-white/10 bg-zinc-950 p-2 shadow-xl shadow-black/50 z-50">
              <Link
                href="/profile"
                className="block rounded-2xl px-4 py-3 text-sm text-zinc-100 transition hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                Perfil
              </Link>
              <Link
                href="/settings"
                className="block rounded-2xl px-4 py-3 text-sm text-zinc-100 transition hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                Configurações
              </Link>
              <Link
                href="/account"
                className="block rounded-2xl px-4 py-3 text-sm text-zinc-100 transition hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                Minha conta
              </Link>
              <Link
                href="/"
                className="block rounded-2xl px-4 py-3 text-sm text-zinc-100 transition hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                Voltar ao site
              </Link>
              {session ? (
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="mt-2 w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
                >
                  Sair
                </button>
              ) : (
                <Link
                  href="/login"
                  className="mt-2 block rounded-2xl bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-zinc-950 transition hover:opacity-90"
                  onClick={() => setOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
