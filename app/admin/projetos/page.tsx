"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const projects = [
  {
    title: "SASA TECH",
    description: "Site principal do seu negócio.",
    href: "/",
    status: "Ativo",
  },
  {
    title: "Laboratório IA",
    description: "Testes com IA, automações e experimentos.",
    href: "/admin/laboratorio",
    status: "Em construção",
  },
  {
    title: "SaaS Chamados TI",
    description: "Painel de atendimento e suporte técnico para sua empresa.",
    href: "/admin/saas",
    status: "Ativo",
  },
];

export default function ProjetosPage() {
  const router = useRouter();
  const [loadingHref, setLoadingHref] = useState<string | null>(null);

  const handleNavigation = (href: string) => {
    setLoadingHref(href);
    router.push(href);
  };

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
          Projetos
        </p>

        <h1 className="mt-3 font-[var(--font-space)] text-3xl font-semibold text-white">
          Seus projetos
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-zinc-400">
          Centralize todos seus produtos e ideias em um único lugar.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <button
            key={project.title}
            type="button"
            onClick={() => handleNavigation(project.href)}
            className="group text-left rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.05]"
          >
            <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              {project.status}
            </div>

            <h2 className="font-[var(--font-space)] text-xl font-semibold text-white">
              {project.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {project.description}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-emerald-400 group-hover:text-emerald-300">
              <span>{loadingHref === project.href ? "Carregando..." : "Abrir projeto →"}</span>
              {loadingHref === project.href && (
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}