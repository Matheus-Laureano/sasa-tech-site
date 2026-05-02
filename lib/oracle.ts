import oracledb from "oracledb";
import path from "path";

oracledb.fetchAsString = [oracledb.CLOB];

const LEADS_TABLE = "LEADS";
const AGENDA_TABLE = "AGENDA_EVENTS";

export async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.ORACLE_USER!,
    password: process.env.ORACLE_PASSWORD!,
    connectString: process.env.ORACLE_CONNECTION_STRING!,
    configDir: path.join(process.cwd(), "Wallet_sasatech"),
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
  if (rows?.[0]?.total > 0) return;

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
}

async function ensureAgendaTable(connection: oracledb.Connection) {
  const result = await connection.execute(
    `
    SELECT COUNT(*) as "total"
    FROM user_tables
    WHERE table_name = 'AGENDA_EVENTS'
    `,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  const rows = result.rows as { total: number }[];
  if (rows?.[0]?.total > 0) return;

  await connection.execute(`
    CREATE TABLE AGENDA_EVENTS (
      ID VARCHAR2(36) DEFAULT RAWTOHEX(SYS_GUID()) PRIMARY KEY,
      USER_EMAIL VARCHAR2(255) NOT NULL,
      TITLE VARCHAR2(255) NOT NULL,
      DESCRIPTION CLOB,
      CONTEXT VARCHAR2(100),
      START_AT TIMESTAMP NOT NULL,
      END_AT TIMESTAMP,
      CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
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
    if (connection) await connection.close();
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
        TO_CHAR(MENSAGEM) as "mensagem",
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
    if (connection) await connection.close();
  }
}

export async function getAgendaEvents(userEmail: string) {
  let connection;

  try {
    connection = await getConnection();
    await ensureAgendaTable(connection);

    const sql = `
      SELECT
        ID as "id",
        USER_EMAIL as "user_email",
        TITLE as "title",
        TO_CHAR(DESCRIPTION) as "description",
        CONTEXT as "context",
        START_AT as "start_at",
        END_AT as "end_at",
        CREATED_AT as "created_at"
      FROM ${AGENDA_TABLE}
      WHERE USER_EMAIL = :user_email
      ORDER BY START_AT
    `;

    const result = await connection.execute(
      sql,
      { user_email: userEmail },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows || [];
  } finally {
    if (connection) await connection.close();
  }
}

export async function insertAgendaEvent(eventData: {
  user_email: string;
  title: string;
  description?: string;
  context?: string;
  start_at: string;
  end_at?: string;
}) {
  let connection;

  try {
    connection = await getConnection();
    await ensureAgendaTable(connection);

    const sql = `
      INSERT INTO ${AGENDA_TABLE}
        (USER_EMAIL, TITLE, DESCRIPTION, CONTEXT, START_AT, END_AT)
      VALUES
        (
          :user_email,
          :title,
          :description,
          :context,
          TO_TIMESTAMP(:start_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'),
          TO_TIMESTAMP(:end_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"')
        )
    `;

    await connection.execute(
      sql,
      {
        user_email: eventData.user_email,
        title: eventData.title,
        description: eventData.description || null,
        context: eventData.context || null,
        start_at: eventData.start_at,
        end_at: eventData.end_at || eventData.start_at,
      },
      { autoCommit: true }
    );

    return { success: true };
  } finally {
    if (connection) await connection.close();
  }
}