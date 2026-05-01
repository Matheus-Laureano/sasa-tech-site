import { insertLead } from "@/lib/oracle";
import { NextRequest, NextResponse } from "next/server";

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
