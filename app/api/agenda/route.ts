import { getAgendaEvents, insertAgendaEvent } from "@/lib/oracle";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');

    if (!userEmail) {
      return NextResponse.json({ error: "userEmail is required" }, { status: 400 });
    }

    const events = await getAgendaEvents(userEmail);
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Error fetching agenda events:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_email, title, description, context, start_at, end_at } = body;

    if (!user_email || !title || !start_at) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await insertAgendaEvent({
      user_email,
      title,
      description,
      context,
      start_at,
      end_at,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating agenda event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}