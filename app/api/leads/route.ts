import { insertLead, getLeads } from "@/lib/oracle";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("API: Iniciando busca de leads...");
    const leads = await getLeads();
    console.log(`API: Retornando ${leads.length} leads`);
    return NextResponse.json({ leads }, { status: 200 });
  } catch (error) {
    console.error("API: Erro ao buscar leads:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({
      error: `Erro ao carregar leads: ${errorMessage}`,
      details: errorMessage
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, whatsapp, service, equipment, urgency, neighborhood, details } = body;

    await insertLead({
      name,
      whatsapp,
      service,
      equipment,
      urgency,
      neighborhood,
      details,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
