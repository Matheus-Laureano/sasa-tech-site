import crypto from "crypto";
import oracledb from "oracledb";
import path from "path";

oracledb.fetchAsString = [oracledb.CLOB];

const LEADS_TABLE = "LEADS";
const AGENDA_TABLE = "AGENDA_EVENTS";
const USERS_TABLE = "USERS";
const TICKETS_TABLE = "TICKETS";
const TICKET_MESSAGES_TABLE = "TICKET_MESSAGES";
const TICKET_HISTORY_TABLE = "TICKET_HISTORY";
const TICKET_INTERNAL_NOTES_TABLE = "TICKET_INTERNAL_NOTES";
const TICKET_ATTACHMENTS_TABLE = "TICKET_ATTACHMENTS";

export async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.ORACLE_USER!,
    password: process.env.ORACLE_PASSWORD!,
    connectString: process.env.ORACLE_CONNECTION_STRING!,
    configDir: path.join(process.cwd(), "Wallet_sasatech"),
  });
}

async function ensureLeadsTable(connection: oracledb.Connection) {
  if (await tableExists(connection, LEADS_TABLE)) return;

  await connection.execute(`
    CREATE TABLE ${LEADS_TABLE} (
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
  if (await tableExists(connection, AGENDA_TABLE)) return;

  await connection.execute(`
    CREATE TABLE ${AGENDA_TABLE} (
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

async function tableExists(connection: oracledb.Connection, tableName: string) {
  const result = await connection.execute(
    `
    SELECT COUNT(*) AS "total"
    FROM user_tables
    WHERE table_name = :tableName
    `,
    { tableName: tableName.toUpperCase() },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  const rows = result.rows as { total: number }[];
  return rows?.[0]?.total > 0;
}

async function ensureUsersTable(connection: oracledb.Connection) {
  if (await tableExists(connection, USERS_TABLE)) return;

  await connection.execute(`
    CREATE TABLE ${USERS_TABLE} (
      ID VARCHAR2(36) PRIMARY KEY,
      EMAIL VARCHAR2(255) UNIQUE NOT NULL,
      NAME VARCHAR2(255) NOT NULL,
      IMAGE VARCHAR2(512),
      ROLE VARCHAR2(50) DEFAULT 'USER',
      AUTHORIZED_ADMIN NUMBER(1) DEFAULT 0,
      CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      LAST_LOGIN_AT TIMESTAMP
    )
  `);
}

async function ensureTicketsTable(connection: oracledb.Connection) {
  if (await tableExists(connection, TICKETS_TABLE)) return;

  await connection.execute(`
    CREATE TABLE ${TICKETS_TABLE} (
      ID VARCHAR2(36) PRIMARY KEY,
      USER_ID VARCHAR2(36) NOT NULL,
      TITLE VARCHAR2(255) NOT NULL,
      DESCRIPTION CLOB,
      CATEGORY VARCHAR2(100) NOT NULL,
      PRIORITY VARCHAR2(50) NOT NULL,
      STATUS VARCHAR2(100) NOT NULL,
      ASSIGNED_TO VARCHAR2(36),
      EQUIPMENT VARCHAR2(255),
      LOCATION VARCHAR2(255),
      CONTACT_PHONE VARCHAR2(100),
      SLA_DUE_AT TIMESTAMP,
      CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CLOSED_AT TIMESTAMP,
      IS_CLOSED NUMBER(1) DEFAULT 0
    )
  `);
}

async function ensureTicketMessagesTable(connection: oracledb.Connection) {
  if (await tableExists(connection, TICKET_MESSAGES_TABLE)) return;

  await connection.execute(`
    CREATE TABLE ${TICKET_MESSAGES_TABLE} (
      ID VARCHAR2(36) PRIMARY KEY,
      TICKET_ID VARCHAR2(36) NOT NULL,
      USER_ID VARCHAR2(36),
      IS_ADMIN NUMBER(1) DEFAULT 0,
      MESSAGE CLOB,
      CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function ensureTicketHistoryTable(connection: oracledb.Connection) {
  if (await tableExists(connection, TICKET_HISTORY_TABLE)) return;

  await connection.execute(`
    CREATE TABLE ${TICKET_HISTORY_TABLE} (
      ID VARCHAR2(36) PRIMARY KEY,
      TICKET_ID VARCHAR2(36) NOT NULL,
      ACTION_TYPE VARCHAR2(100) NOT NULL,
      OLD_VALUE VARCHAR2(4000),
      NEW_VALUE VARCHAR2(4000),
      AUTHOR_ID VARCHAR2(36),
      AUTHOR_NAME VARCHAR2(255),
      CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function ensureTicketInternalNotesTable(connection: oracledb.Connection) {
  if (await tableExists(connection, TICKET_INTERNAL_NOTES_TABLE)) return;

  await connection.execute(`
    CREATE TABLE ${TICKET_INTERNAL_NOTES_TABLE} (
      ID VARCHAR2(36) PRIMARY KEY,
      TICKET_ID VARCHAR2(36) NOT NULL,
      AUTHOR_ID VARCHAR2(36) NOT NULL,
      NOTE CLOB,
      CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function ensureTicketAttachmentsTable(connection: oracledb.Connection) {
  if (await tableExists(connection, TICKET_ATTACHMENTS_TABLE)) return;

  await connection.execute(`
    CREATE TABLE ${TICKET_ATTACHMENTS_TABLE} (
      ID VARCHAR2(36) PRIMARY KEY,
      TICKET_ID VARCHAR2(36) NOT NULL,
      FILE_NAME VARCHAR2(255),
      FILE_URL VARCHAR2(1024),
      CONTENT_TYPE VARCHAR2(100),
      CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function ensureSaasTables(connection: oracledb.Connection) {
  await ensureUsersTable(connection);
  await ensureTicketsTable(connection);
  await ensureTicketMessagesTable(connection);
  await ensureTicketHistoryTable(connection);
  await ensureTicketInternalNotesTable(connection);
  await ensureTicketAttachmentsTable(connection);
}

export async function findOrCreateUser({
  email,
  name,
  image,
  role = "USER",
  authorizedAdmin = 0,
}: {
  email: string;
  name: string;
  image: string | null;
  role?: string;
  authorizedAdmin?: number;
}) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const existing = await connection.execute(
      `
      SELECT ID, EMAIL, NAME, IMAGE, ROLE, AUTHORIZED_ADMIN, CREATED_AT, LAST_LOGIN_AT
      FROM ${USERS_TABLE}
      WHERE EMAIL = :email
      `,
      { email },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const rows = existing.rows as Array<Record<string, any>>;
    if (rows?.[0]) {
      const user = rows[0];
      await connection.execute(
        `
        UPDATE ${USERS_TABLE}
        SET NAME = :name,
            IMAGE = :image,
            ROLE = :role,
            AUTHORIZED_ADMIN = :authorizedAdmin,
            LAST_LOGIN_AT = CURRENT_TIMESTAMP
        WHERE ID = :id
        `,
        {
          name,
          image,
          role: user.ROLE || role,
          authorizedAdmin: user.AUTHORIZED_ADMIN ?? authorizedAdmin,
          id: user.ID,
        },
        { autoCommit: true }
      );

      return { ...user, NAME: name, IMAGE: image, ROLE: user.ROLE || role };
    }

    const id = crypto.randomUUID();
    await connection.execute(
      `
      INSERT INTO ${USERS_TABLE}
        (ID, EMAIL, NAME, IMAGE, ROLE, AUTHORIZED_ADMIN, LAST_LOGIN_AT)
      VALUES
        (:id, :email, :name, :image, :role, :authorizedAdmin, CURRENT_TIMESTAMP)
      `,
      {
        id,
        email,
        name,
        image,
        role,
        authorizedAdmin,
      },
      { autoCommit: true }
    );

    return {
      id,
      email,
      name,
      image,
      role,
      authorized_admin: authorizedAdmin,
      created_at: new Date().toISOString(),
      last_login_at: new Date().toISOString(),
    };
  } finally {
    if (connection) await connection.close();
  }
}

export async function getUserByEmail(email: string) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const result = await connection.execute(
      `
      SELECT ID, EMAIL, NAME, IMAGE, ROLE, AUTHORIZED_ADMIN, CREATED_AT, LAST_LOGIN_AT
      FROM ${USERS_TABLE}
      WHERE EMAIL = :email
      `,
      { email },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return (result.rows as Array<Record<string, any>>)[0] || null;
  } finally {
    if (connection) await connection.close();
  }
}

export async function getUserById(id: string) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const result = await connection.execute(
      `
      SELECT ID, EMAIL, NAME, IMAGE, ROLE, AUTHORIZED_ADMIN, CREATED_AT, LAST_LOGIN_AT
      FROM ${USERS_TABLE}
      WHERE ID = :id
      `,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return (result.rows as Array<Record<string, any>>)[0] || null;
  } finally {
    if (connection) await connection.close();
  }
}

export async function createTicket(
  ticket: {
    title: string;
    description: string;
    category: string;
    priority: string;
    equipment?: string;
    location?: string;
    contact_phone?: string;
  },
  userId: string
) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const id = crypto.randomUUID();
    const status = "Aberto";
    const slaHours =
      ticket.priority === "Urgente"
        ? 4
        : ticket.priority === "Alta"
        ? 24
        : ticket.priority === "M�dia"
        ? 72
        : 168;
    const slaDueAt = new Date(Date.now() + slaHours * 60 * 60 * 1000).toISOString();

    await connection.execute(
      `
      INSERT INTO ${TICKETS_TABLE}
        (ID, USER_ID, TITLE, DESCRIPTION, CATEGORY, PRIORITY, STATUS, ASSIGNED_TO, EQUIPMENT, LOCATION, CONTACT_PHONE, SLA_DUE_AT)
      VALUES
        (:id, :userId, :title, :description, :category, :priority, :status, NULL, :equipment, :location, :contact_phone, TO_TIMESTAMP(:slaDueAt, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'))
      `,
      {
        id,
        userId,
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
        status,
        equipment: ticket.equipment || null,
        location: ticket.location || null,
        contact_phone: ticket.contact_phone || null,
        slaDueAt,
      },
      { autoCommit: true }
    );

    await addTicketHistory(id, "CRIA��O", null, "Chamado criado", userId, "Sistema");

    return { id, ...ticket, status, user_id: userId };
  } finally {
    if (connection) await connection.close();
  }
}

export async function getTicketSummaryByUser(userId: string) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const result = await connection.execute(
      `
      SELECT STATUS, COUNT(*) AS TOTAL
      FROM ${TICKETS_TABLE}
      WHERE USER_ID = :userId
      GROUP BY STATUS
      `,
      { userId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const rows = result.rows as Array<{ STATUS: string; TOTAL: number }>;
    return rows.reduce(
      (summary, row) => ({
        ...summary,
        [row.STATUS]: row.TOTAL,
      }),
      {
        Aberto: 0,
        "Aguardando atendimento": 0,
        "Em atendimento": 0,
        "Aguardando resposta do usu�rio": 0,
        Resolvido: 0,
        Fechado: 0,
      } as Record<string, number>
    );
  } finally {
    if (connection) await connection.close();
  }
}

export async function listTickets(options: {
  userId?: string;
  isAdmin?: boolean;
  status?: string;
  priority?: string;
  category?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
} = {}) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const conditions: string[] = [];
    const binds: oracledb.BindParameters = {};

    if (!options.isAdmin && options.userId) {
      conditions.push("t.USER_ID = :userId");
      binds.userId = options.userId;
    }

    if (options.status) {
      conditions.push("t.STATUS = :status");
      binds.status = options.status;
    }

    if (options.priority) {
      conditions.push("t.PRIORITY = :priority");
      binds.priority = options.priority;
    }

    if (options.category) {
      conditions.push("t.CATEGORY = :category");
      binds.category = options.category;
    }

    if (options.search) {
      conditions.push(
        `(LOWER(t.TITLE) LIKE LOWER(:search) OR LOWER(t.DESCRIPTION) LIKE LOWER(:search) OR LOWER(u.NAME) LIKE LOWER(:search) OR LOWER(u.EMAIL) LIKE LOWER(:search))`
      );
      binds.search = `%${options.search}%`;
    }

    if (options.fromDate) {
      conditions.push("t.CREATED_AT >= TO_TIMESTAMP(:fromDate, 'YYYY-MM-DD\"T\"HH24:MI:SS.FF3\"Z\"')");
      binds.fromDate = options.fromDate;
    }

    if (options.toDate) {
      conditions.push("t.CREATED_AT <= TO_TIMESTAMP(:toDate, 'YYYY-MM-DD\"T\"HH24:MI:SS.FF3\"Z\"')");
      binds.toDate = options.toDate;
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const result = await connection.execute(
      `
      SELECT
        t.ID as "id",
        t.TITLE as "title",
        t.CATEGORY as "category",
        t.PRIORITY as "priority",
        t.STATUS as "status",
        t.CREATED_AT as "created_at",
        t.UPDATED_AT as "updated_at",
        t.CLOSED_AT as "closed_at",
        t.IS_CLOSED as "is_closed",
        u.NAME as "requester_name",
        u.EMAIL as "requester_email"
      FROM ${TICKETS_TABLE} t
      LEFT JOIN ${USERS_TABLE} u ON t.USER_ID = u.ID
      ${whereClause}
      ORDER BY t.CREATED_AT DESC
      `,
      binds,
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows as Array<Record<string, any>>;
  } finally {
    if (connection) await connection.close();
  }
}

export async function getTicketById(ticketId: string) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const result = await connection.execute(
      `
      SELECT
        t.ID as "id",
        t.TITLE as "title",
        TO_CHAR(t.DESCRIPTION) as "description",
        t.CATEGORY as "category",
        t.PRIORITY as "priority",
        t.STATUS as "status",
        t.ASSIGNED_TO as "assigned_to",
        t.EQUIPMENT as "equipment",
        t.LOCATION as "location",
        t.CONTACT_PHONE as "contact_phone",
        TO_CHAR(t.SLA_DUE_AT, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') as "sla_due_at",
        t.CREATED_AT as "created_at",
        t.UPDATED_AT as "updated_at",
        t.CLOSED_AT as "closed_at",
        t.IS_CLOSED as "is_closed",
        u.ID as "requester_id",
        u.NAME as "requester_name",
        u.EMAIL as "requester_email",
        a.NAME as "assigned_name",
        a.EMAIL as "assigned_email"
      FROM ${TICKETS_TABLE} t
      LEFT JOIN ${USERS_TABLE} u ON t.USER_ID = u.ID
      LEFT JOIN ${USERS_TABLE} a ON t.ASSIGNED_TO = a.ID
      WHERE t.ID = :ticketId
      `,
      { ticketId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return (result.rows as Array<Record<string, any>>)[0] || null;
  } finally {
    if (connection) await connection.close();
  }
}

export async function addTicketHistory(
  ticketId: string,
  actionType: string,
  oldValue: string | null,
  newValue: string | null,
  authorId: string | null,
  authorName: string | null
) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const id = crypto.randomUUID();
    await connection.execute(
      `
      INSERT INTO ${TICKET_HISTORY_TABLE}
        (ID, TICKET_ID, ACTION_TYPE, OLD_VALUE, NEW_VALUE, AUTHOR_ID, AUTHOR_NAME)
      VALUES
        (:id, :ticketId, :actionType, :oldValue, :newValue, :authorId, :authorName)
      `,
      {
        id,
        ticketId,
        actionType,
        oldValue,
        newValue,
        authorId,
        authorName,
      },
      { autoCommit: true }
    );

    return { id, ticketId, actionType, oldValue, newValue, authorId, authorName };
  } finally {
    if (connection) await connection.close();
  }
}

export async function addTicketMessage(
  ticketId: string,
  userId: string | null,
  isAdmin: boolean,
  message: string
) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const id = crypto.randomUUID();
    await connection.execute(
      `
      INSERT INTO ${TICKET_MESSAGES_TABLE}
        (ID, TICKET_ID, USER_ID, IS_ADMIN, MESSAGE)
      VALUES
        (:id, :ticketId, :userId, :isAdmin, :message)
      `,
      {
        id,
        ticketId,
        userId,
        isAdmin: isAdmin ? 1 : 0,
        message,
      },
      { autoCommit: true }
    );

    const author = userId ? await getUserById(userId) : null;
    await addTicketHistory(
      ticketId,
      isAdmin ? "RESPOSTA_ADMIN" : "RESPOSTA_USUARIO",
      null,
      message,
      userId,
      author?.NAME || author?.name || (isAdmin ? "Admin" : "Usu�rio")
    );

    return { id, ticketId, userId, isAdmin: isAdmin ? 1 : 0, message };
  } finally {
    if (connection) await connection.close();
  }
}

export async function fetchTicketMessages(ticketId: string) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const result = await connection.execute(
      `
      SELECT
        m.ID as "id",
        m.TICKET_ID as "ticket_id",
        m.USER_ID as "user_id",
        m.IS_ADMIN as "is_admin",
        TO_CHAR(m.MESSAGE) as "message",
        m.CREATED_AT as "created_at",
        u.NAME as "author_name"
      FROM ${TICKET_MESSAGES_TABLE} m
      LEFT JOIN ${USERS_TABLE} u ON m.USER_ID = u.ID
      WHERE m.TICKET_ID = :ticketId
      ORDER BY m.CREATED_AT ASC
      `,
      { ticketId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows as Array<Record<string, any>>;
  } finally {
    if (connection) await connection.close();
  }
}

export async function fetchTicketHistory(ticketId: string) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const result = await connection.execute(
      `
      SELECT
        ID as "id",
        ACTION_TYPE as "action_type",
        OLD_VALUE as "old_value",
        NEW_VALUE as "new_value",
        AUTHOR_ID as "author_id",
        AUTHOR_NAME as "author_name",
        CREATED_AT as "created_at"
      FROM ${TICKET_HISTORY_TABLE}
      WHERE TICKET_ID = :ticketId
      ORDER BY CREATED_AT ASC
      `,
      { ticketId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows as Array<Record<string, any>>;
  } finally {
    if (connection) await connection.close();
  }
}

export async function updateTicket(
  ticketId: string,
  updates: {
    status?: string;
    priority?: string;
    assigned_to?: string | null;
  },
  authorId: string,
  authorName: string
) {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const ticket = await getTicketById(ticketId);
    if (!ticket) return null;

    const changes: Array<Promise<unknown>> = [];
    const setClauses: string[] = ["UPDATED_AT = CURRENT_TIMESTAMP"];
    const binds: oracledb.BindParameters = { ticketId };

    if (updates.status && updates.status !== ticket.status) {
      setClauses.push("STATUS = :status");
      binds.status = updates.status;
      changes.push(
        addTicketHistory(ticketId, "STATUS", ticket.status, updates.status, authorId, authorName)
      );

      if (updates.status === "Resolvido" || updates.status === "Fechado") {
        setClauses.push("CLOSED_AT = CURRENT_TIMESTAMP", "IS_CLOSED = 1");
      }
    }

    if (updates.priority && updates.priority !== ticket.priority) {
      setClauses.push("PRIORITY = :priority");
      binds.priority = updates.priority;
      changes.push(
        addTicketHistory(ticketId, "PRIORIDADE", ticket.priority, updates.priority, authorId, authorName)
      );
    }

    if (updates.assigned_to !== undefined && updates.assigned_to !== ticket.assigned_to) {
      setClauses.push("ASSIGNED_TO = :assigned_to");
      binds.assigned_to = updates.assigned_to;
      changes.push(
        addTicketHistory(
          ticketId,
          "RESPONS�VEL",
          ticket.assigned_to,
          updates.assigned_to,
          authorId,
          authorName
        )
      );
    }

    if (setClauses.length > 1) {
      await connection.execute(
        `
        UPDATE ${TICKETS_TABLE}
        SET ${setClauses.join(", ")}
        WHERE ID = :ticketId
        `,
        binds,
        { autoCommit: true }
      );
    }

    await Promise.all(changes);
    return await getTicketById(ticketId);
  } finally {
    if (connection) await connection.close();
  }
}

export async function getReportData() {
  let connection;

  try {
    connection = await getConnection();
    await ensureSaasTables(connection);

    const statusResult = await connection.execute(
      `
      SELECT STATUS as "status", COUNT(*) as "count"
      FROM ${TICKETS_TABLE}
      GROUP BY STATUS
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const categoryResult = await connection.execute(
      `
      SELECT CATEGORY as "category", COUNT(*) as "count"
      FROM ${TICKETS_TABLE}
      GROUP BY CATEGORY
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const monthlyResult = await connection.execute(
      `
      SELECT TO_CHAR(CREATED_AT, 'YYYY-MM') as "month", COUNT(*) as "count"
      FROM ${TICKETS_TABLE}
      GROUP BY TO_CHAR(CREATED_AT, 'YYYY-MM')
      ORDER BY TO_CHAR(CREATED_AT, 'YYYY-MM')
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const overdueResult = await connection.execute(
      `
      SELECT COUNT(*) as "count"
      FROM ${TICKETS_TABLE}
      WHERE SLA_DUE_AT IS NOT NULL
      AND SLA_DUE_AT < SYSTIMESTAMP
      AND IS_CLOSED = 0
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return {
      status: statusResult.rows as Array<Record<string, any>>,
      category: categoryResult.rows as Array<Record<string, any>>,
      monthly: monthlyResult.rows as Array<Record<string, any>>,
      overdue: (overdueResult.rows as Array<{ count: number }>)[0]?.count ?? 0,
    };
  } finally {
    if (connection) await connection.close();
  }
}
