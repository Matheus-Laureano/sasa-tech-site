"use client";

import { useState } from "react";

export default function OracleTestPage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult("Testando conexão...");

    try {
      const response = await fetch("/api/oracle-test");
      const data = await response.json();

      if (response.ok) {
        setResult(`✅ Sucesso!\n${JSON.stringify(data, null, 2)}`);
      } else {
        setResult(`❌ Erro: ${data.error}\nDetalhes: ${data.details || 'N/A'}`);
      }
    } catch (error) {
      setResult(`❌ Erro de rede: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Teste de Conexão Oracle</h1>
          <p className="text-zinc-400 mb-6">
            Esta página testa a conexão com o banco Oracle e verifica se a tabela leads existe.
          </p>
        </div>

        <div className="space-y-6">
          <button
            onClick={testConnection}
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-600 rounded-lg font-medium transition-colors"
          >
            {loading ? "Testando..." : "Testar Conexão Oracle"}
          </button>

          {result && (
            <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Resultado:</h3>
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">
                {result}
              </pre>
            </div>
          )}

          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Configuração Atual:</h3>
            <div className="text-sm text-zinc-300 space-y-1">
              <p><strong>User:</strong> {process.env.NODE_ENV === 'production' ? '***' : 'sasa'}</p>
              <p><strong>Connection String:</strong> Configurada ✓</p>
              <p><strong>Tabela esperada:</strong> LEADS</p>
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-amber-400">Possíveis Problemas:</h3>
            <ul className="text-sm text-zinc-300 space-y-1 list-disc list-inside">
              <li>Credenciais incorretas (usuário/senha)</li>
              <li>String de conexão inválida</li>
              <li>Firewall bloqueando a porta 1521</li>
              <li>Tabela LEADS não existe no banco</li>
              <li>Permissões insuficientes no usuário</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}