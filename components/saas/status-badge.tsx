export default function StatusBadge({
  status,
}: {
  status: string;
}) {
  const statusMap: Record<string, string> = {
    Aberto: "bg-emerald-500/15 text-emerald-300",
    "Aguardando atendimento": "bg-sky-500/10 text-sky-300",
    "Em atendimento": "bg-blue-500/15 text-blue-300",
    "Aguardando resposta do usuário": "bg-amber-500/15 text-amber-300",
    "Aguardando compra de peça": "bg-orange-500/15 text-orange-300",
    "Aguardando aprovação": "bg-violet-500/15 text-violet-300",
    Agendado: "bg-cyan-500/15 text-cyan-300",
    Resolvido: "bg-emerald-400/10 text-emerald-200",
    Fechado: "bg-zinc-700/20 text-zinc-100",
    Cancelado: "bg-red-500/15 text-red-300",
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusMap[status] ?? "bg-white/5 text-zinc-100"}`}>
      {status}
    </span>
  );
}
