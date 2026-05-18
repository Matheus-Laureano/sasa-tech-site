"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = [
  "Aberto",
  "Em atendimento",
  "Aguardando resposta do usuário",
  "Resolvido",
  "Fechado",
];

const priorities = ["Baixa", "Média", "Alta", "Urgente"];

interface AdminTicketActionsProps {
  ticketId: string;
  initialStatus: string;
  initialPriority: string;
}

export default function AdminTicketActions({ ticketId, initialStatus, initialPriority }: AdminTicketActionsProps) {
  const [status, setStatus] = useState(initialStatus);
  const [priority, setPriority] = useState(initialPriority);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSave() {
    setIsSaving(true);
    setMessage(null);

    const response = await fetch(`/api/saas/tickets/${ticketId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, priority }),
    });

    setIsSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setMessage(data?.error || "Erro ao atualizar o chamado.");
      return;
    }

    setMessage("Atualizado com sucesso!");
    router.refresh();
  }

  async function handleDelete() {
    if (!window.confirm("Tem certeza que deseja excluir este chamado?")) {
      return;
    }

    setIsDeleting(true);
    setMessage(null);

    const response = await fetch(`/api/saas/tickets/${ticketId}`, {
      method: "DELETE",
    });

    setIsDeleting(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setMessage(data?.error || "Erro ao excluir o chamado.");
      return;
    }

    router.push("/admin/saas/tickets");
  }

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
      <h2 className="text-lg font-semibold text-white">Ações administrativas</h2>
      <div className="grid gap-4">
        <label className="block">
          <span className="text-sm text-zinc-400">Status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
          >
            {statuses.map((statusOption) => (
              <option key={statusOption} value={statusOption} className="bg-zinc-950 text-zinc-100">
                {statusOption}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-zinc-400">Prioridade</span>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/90 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
          >
            {priorities.map((priorityOption) => (
              <option key={priorityOption} value={priorityOption} className="bg-zinc-950 text-zinc-100">
                {priorityOption}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Salvando..." : "Salvar alterações"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Excluindo..." : "Excluir chamado"}
        </button>
      </div>

      {message && <p className="text-sm text-emerald-400">{message}</p>}
    </div>
  );
}
