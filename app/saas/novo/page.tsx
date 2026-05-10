import NewTicketForm from "@/components/saas/new-ticket-form";

export default function NewTicketPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">Novo chamado</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Abrir um novo pedido de suporte</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Descreva o problema com o máximo de detalhes possível para que o atendimento seja mais rápido.
        </p>
      </div>

      <NewTicketForm />
    </main>
  );
}
