"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { TicketSummary } from "@/types/ticket";

interface AdminTicketTableProps {
  tickets: TicketSummary[];
}

export default function AdminTicketTable({ tickets }: AdminTicketTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete(ticketId: string) {
    const confirmed = window.confirm("Tem certeza que deseja excluir este chamado?");
    if (!confirmed) return;

    setDeletingId(ticketId);
    setError(null);

    const response = await fetch(`/api/saas/tickets/${ticketId}`, {
      method: "DELETE",
    });

    setDeletingId(null);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Erro ao excluir chamado.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_35px_rgba(0,0,0,0.15)]">
      {error && <div className="rounded-t-3xl bg-rose-500/10 px-5 py-4 text-sm text-rose-300">{error}</div>}
      <table className="min-w-full divide-y divide-white/10 text-left text-sm text-zinc-300">
        <thead className="border-b border-white/10 bg-zinc-950/80 text-zinc-400">
          <tr>
            <th className="px-5 py-4">ID</th>
            <th className="px-5 py-4">Título</th>
            <th className="px-5 py-4">Solicitante</th>
            <th className="px-5 py-4">Tipo</th>
            <th className="px-5 py-4">Prioridade</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Criado em</th>
            <th className="px-5 py-4">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="transition hover:bg-white/5">
              <td className="px-5 py-4 font-medium text-white">{ticket.id.slice(0, 8)}</td>
              <td className="px-5 py-4">{ticket.title}</td>
              <td className="px-5 py-4">{ticket.requester_email}</td>
              <td className="px-5 py-4">{ticket.category}</td>
              <td className="px-5 py-4">{ticket.priority}</td>
              <td className="px-5 py-4">{ticket.status}</td>
              <td className="px-5 py-4">{new Date(ticket.created_at).toLocaleDateString("pt-BR")}</td>
              <td className="flex flex-col gap-2 px-5 py-4">
                <Link
                  href={`/admin/saas/${ticket.id}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Ver / editar
                </Link>
                <button
                  type="button"
                  disabled={deletingId === ticket.id}
                  onClick={() => handleDelete(ticket.id)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {deletingId === ticket.id ? "Excluindo..." : "Excluir"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
