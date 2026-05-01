import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, whatsapp, service, equipment, urgency, neighborhood, details } = body;

    const { data, error } = await supabase.from("leads").insert([
      {
        name,
        whatsapp,
        service,
        equipment,
        urgency,
        neighborhood,
        details,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
