import Link from "next/link";

export default function ProjetosPage() {
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
      title: "Novo SaaS",
      description: "Seu próximo projeto secreto.",
      href: "/admin/novo-saas",
      status: "Privado",
    },
  ];

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
          <Link
            key={project.title}
            href={project.href}
            className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.05]"
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

            <div className="mt-6 text-sm text-emerald-400 group-hover:text-emerald-300">
              Abrir projeto →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}