"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MessageCircle, Calendar } from "lucide-react";

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  servico: string;
  mensagem: string;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  async function fetchLeads() {
    try {
      setError(null);

      const response = await fetch("/api/leads", {
        cache: "no-store",
      });

      let data: any = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.details ||
            data?.error ||
            `Erro ao carregar leads. Status: ${response.status}`
        );
      }

      setLeads(Array.isArray(data?.leads) ? data.leads : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  fetchLeads();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-zinc-300">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
            Carregando leads...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao painel
          </Link>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-6 py-4">
            <p className="text-sm text-rose-200">Erro ao carregar leads: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao painel
          </Link>

          <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
            Leads
          </p>

          <h1 className="mt-3 font-[var(--font-space)] text-3xl font-semibold text-white">
            Pedidos de orçamento
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            Todos os pedidos de orçamento recebidos através do site.
          </p>
        </div>

        {leads.length === 0 ? (
          <div className="rounded-[1.75rem] border border-white/10 bg-zinc-900/60 p-8 text-center">
            <MessageCircle className="mx-auto h-12 w-12 text-zinc-500 mb-4" />
            <h3 className="font-[var(--font-space)] text-xl font-semibold text-white mb-2">
              Nenhum lead ainda
            </h3>
            <p className="text-sm text-zinc-400">
              Os pedidos de orçamento aparecerão aqui quando clientes enviarem através do site.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-[var(--font-space)] text-lg font-semibold text-white">
                    {lead.nome}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-emerald-400" />
                    <span className="text-zinc-300">{lead.telefone}</span>
                  </div>

                  {lead.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-emerald-400" />
                      <span className="text-zinc-300">{lead.email}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs font-medium text-emerald-400 uppercase tracking-wide mb-1">
                      Serviço solicitado
                    </p>
                    <p className="text-sm text-zinc-300">{lead.servico}</p>
                  </div>

                  {lead.mensagem && (
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-xs font-medium text-emerald-400 uppercase tracking-wide mb-1">
                        Mensagem
                      </p>
                      <p className="text-sm text-zinc-300 line-clamp-3">{lead.mensagem}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}