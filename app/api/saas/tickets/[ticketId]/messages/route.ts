import { auth } from "@/auth";
import { addTicketMessage, fetchTicketMessages, getTicketById } from "@/lib/oracle";
import { NextResponse } from "next/server";

interface RouteParams {
  params: { ticketId: string };
}

export async function GET(_req: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ticket = await getTicketById(params.ticketId);
  if (!ticket) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const userId = session.user.id as string;
  if (session.user.role !== "ADMIN" && ticket.requester_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const messages = await fetchTicketMessages(params.ticketId);
  return NextResponse.json(messages);
}

export async function POST(req: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ticket = await getTicketById(params.ticketId);
  if (!ticket) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const userId = session.user.id as string;
  if (session.user.role !== "ADMIN" && ticket.requester_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const message = String(body.message || "").trim();
  if (!message) {
    return NextResponse.json({ error: "Mensagem obrigatória" }, { status: 400 });
  }

  const result = await addTicketMessage(
    params.ticketId,
    userId,
    session.user.role === "ADMIN",
    message
  );

  return NextResponse.json(result, { status: 201 });
}
