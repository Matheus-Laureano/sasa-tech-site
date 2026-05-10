"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  "Computador lento",
  "Problema com internet/rede",
  "Instalação de programa",
  "Erro em sistema",
  "Manutenção preventiva",
  "Backup",
  "Formatação",
  "Upgrade de hardware",
  "Acesso/login/senha",
  "Impressora",
  "Outro",
];

const priorities = ["Baixa", "Média", "Alta", "Urgente"];

export default function NewTicketForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: categories[0],
    priority: priorities[1],
    equipment: "",
    location: "",
    contact_phone: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/saas/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar chamado");
      }

      router.push("/saas");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_35px_rgba(0,0,0,0.15)]">
      <div>
        <label className="block text-sm font-medium text-zinc-300">Título do chamado</label>
        <input
          required
          value={form.title}
          onChange={(event) => updateField("title", event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
          placeholder="Ex.: Notebook não liga"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300">Descrição detalhada</label>
        <textarea
          required
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          rows={6}
          className="mt-2 w-full rounded-3xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
          placeholder="Explique o problema, o que aconteceu e há quanto tempo..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-zinc-300">Categoria</span>
          <select
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-zinc-950 text-zinc-100">
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-300">Prioridade</span>
          <select
            value={form.priority}
            onChange={(event) => updateField("priority", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority} className="bg-zinc-950 text-zinc-100">
                {priority}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-zinc-300">Equipamento</span>
          <input
            value={form.equipment}
            onChange={(event) => updateField("equipment", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
            placeholder="Notebook, PC, impressora..."
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-300">Local / setor</span>
          <input
            value={form.location}
            onChange={(event) => updateField("location", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
            placeholder="Ex.: Setor financeiro"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-zinc-300">Telefone ou WhatsApp</span>
        <input
          value={form.contact_phone}
          onChange={(event) => updateField("contact_phone", event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
          placeholder="(47) 99999-9999"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Criando chamado..." : "Abrir chamado"}
      </button>
    </form>
  );
}
