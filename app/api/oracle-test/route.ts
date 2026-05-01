import { getConnection } from "@/lib/oracle";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Teste: Iniciando conexão Oracle...");

    const connection = await getConnection();
    console.log("Teste: Conexão estabelecida");

    // Verificar se a tabela existe
    const tableResult = await connection.execute(
      "SELECT table_name FROM user_tables WHERE table_name = 'LEADS'"
    );

    const tableExists = tableResult.rows && tableResult.rows.length > 0;
    console.log("Teste: Tabela LEADS existe?", tableExists);

    let tableInfo = null;
    let recordCount = 0;

    if (tableExists) {
      // Verificar estrutura da tabela
      const columnsResult = await connection.execute(
        "SELECT column_name, data_type FROM user_tab_columns WHERE table_name = 'LEADS' ORDER BY column_id"
      );
      tableInfo = columnsResult.rows || [];

      // Contar registros
      const countResult = await connection.execute(
        "SELECT COUNT(*) FROM leads"
        );

        const rows = countResult.rows as [number][] | undefined;

        recordCount = rows?.[0]?.[0] ?? 0;
            }

    await connection.close();
    console.log("Teste: Conexão fechada");

    return NextResponse.json({
      success: true,
      tableExists,
      tableInfo,
      recordCount,
      message: tableExists
        ? `Tabela LEADS encontrada com ${recordCount} registros`
        : "Tabela LEADS não encontrada"
    });

  } catch (error) {
    console.error("Teste: Erro na conexão Oracle:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: errorMessage
    }, { status: 500 });
  }
}