export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-sm text-zinc-200">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
          <span>Carregando painel...</span>
        </div>
      </div>
    </div>
  );
}
