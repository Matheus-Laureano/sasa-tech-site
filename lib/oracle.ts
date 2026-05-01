import oracledb from "oracledb";

export async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.ORACLE_USER!,
    password: process.env.ORACLE_PASSWORD!,
    connectString: process.env.ORACLE_CONNECTION_STRING!,
  });
}

// Função para inserir leads
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
    const sql = `
      INSERT INTO leads (nome, telefone, email, servico, mensagem)
      VALUES (:nome, :telefone, :email, :servico, :mensagem)
    `;
    const binds = {
      nome: leadData.name,
      telefone: leadData.whatsapp,
      email: leadData.equipment || '', // usando equipment como email por enquanto
      servico: leadData.service,
      mensagem: `${leadData.urgency}${leadData.neighborhood ? ` - ${leadData.neighborhood}` : ''}${leadData.details ? ` - ${leadData.details}` : ''}`,
    };
    await connection.execute(sql, binds, { autoCommit: true });
    return { success: true };
  } catch (error) {
    console.error("Error inserting lead:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Função para buscar leads
export async function getLeads() {
  let connection;
  try {
    connection = await getConnection();
    const sql = `
      SELECT id, nome, telefone, email, servico, mensagem, created_at
      FROM leads
      ORDER BY created_at DESC
    `;
    const result = await connection.execute(sql);
    return result.rows || [];
  } catch (error) {
    console.error("Error getting leads:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Funções para agenda
export async function getAgendaEvents(userEmail: string) {
  let connection;
  try {
    connection = await getConnection();
    const sql = `
      SELECT id, user_email, title, description, context, start_at, end_at
      FROM agenda_events
      WHERE user_email = :user_email
      ORDER BY start_at
    `;
    const result = await connection.execute(sql, [userEmail]);
    return result.rows || [];
  } catch (error) {
    console.error("Error getting agenda events:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
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
    const sql = `
      INSERT INTO agenda_events (user_email, title, description, context, start_at, end_at)
      VALUES (:user_email, :title, :description, :context, TO_TIMESTAMP(:start_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'), TO_TIMESTAMP(:end_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'))
    `;
    const binds = {
      user_email: eventData.user_email,
      title: eventData.title,
      description: eventData.description || null,
      context: eventData.context || null,
      start_at: eventData.start_at,
      end_at: eventData.end_at || null,
    };
    await connection.execute(sql, binds, { autoCommit: true });
  } catch (error) {
    console.error("Error inserting agenda event:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}