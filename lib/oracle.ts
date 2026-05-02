import oracledb from "oracledb";

const LEADS_TABLE = "LEADS";

export async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.ORACLE_USER!,
    password: process.env.ORACLE_PASSWORD!,
    connectString: process.env.ORACLE_CONNECTION_STRING!,
    configDir: process.env.TNS_ADMIN,
  });
}

async function ensureLeadsTable(connection: oracledb.Connection) {
  const result = await connection.execute(
    `
    SELECT COUNT(*) as "total"
    FROM user_tables
    WHERE table_name = 'LEADS'
    `,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  const rows = result.rows as { total: number }[];
  const exists = rows?.[0]?.total > 0;

  if (exists) {
    return;
  }

  console.log("Tabela LEADS não encontrada. Criando tabela...");

  await connection.execute(`
    CREATE TABLE LEADS (
      ID VARCHAR2(36) DEFAULT RAWTOHEX(SYS_GUID()) PRIMARY KEY,
      NOME VARCHAR2(255) NOT NULL,
      TELEFONE VARCHAR2(50),
      EMAIL VARCHAR2(255),
      SERVICO VARCHAR2(255),
      MENSAGEM CLOB,
      CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Tabela LEADS criada com sucesso.");
}

export async function insertLead(leadData: {
  name: string;
  whatsapp: string;
  service: string;
  equipment: string;
  urgency: string;
  neighborhood?: string;
  details?: string;
}) {
  let connection;

  try {
    connection = await getConnection();
    await ensureLeadsTable(connection);

    const sql = `
      INSERT INTO ${LEADS_TABLE} 
        (NOME, TELEFONE, EMAIL, SERVICO, MENSAGEM)
      VALUES 
        (:nome, :telefone, :email, :servico, :mensagem)
    `;

    const binds = {
      nome: leadData.name,
      telefone: leadData.whatsapp,
      email: "",
      servico: leadData.service,
      mensagem: [
        leadData.equipment && `Equipamento: ${leadData.equipment}`,
        leadData.urgency && `Urgência: ${leadData.urgency}`,
        leadData.neighborhood && `Bairro: ${leadData.neighborhood}`,
        leadData.details && `Detalhes: ${leadData.details}`,
      ]
        .filter(Boolean)
        .join(" | "),
    };

    await connection.execute(sql, binds, { autoCommit: true });

    return { success: true };
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

export async function getLeads() {
  let connection;

  try {
    connection = await getConnection();
    await ensureLeadsTable(connection);

    const sql = `
      SELECT 
        ID as "id",
        NOME as "nome",
        TELEFONE as "telefone",
        EMAIL as "email",
        SERVICO as "servico",
        MENSAGEM as "mensagem",
        CREATED_AT as "created_at"
      FROM ${LEADS_TABLE}
      ORDER BY CREATED_AT DESC
    `;

    const result = await connection.execute(sql, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    return result.rows || [];
  } catch (error) {
    console.error("Erro detalhado ao buscar leads:", error);

    throw new Error(
      `Erro ao carregar leads: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}