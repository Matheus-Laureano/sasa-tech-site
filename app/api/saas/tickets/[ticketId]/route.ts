import { auth } from "@/auth";
import { deleteTicket, getTicketById, updateTicket } from "@/lib/oracle";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ ticketId: string }>;
}

export async function GET(_req: Request, { params }: RouteParams) {
  const resolvedParams = await params;
  const ticket = await getTicketById(resolvedParams.ticketId);
  if (!ticket) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(ticket);
}

export async function PATCH(req: Request, { params }: RouteParams) {
  const resolvedParams = await params;
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updates = {
    status: body.status ? String(body.status) : undefined,
    priority: body.priority ? String(body.priority) : undefined,
    assigned_to: body.assigned_to ?? undefined,
  };

  const updatedTicket = await updateTicket(
    resolvedParams.ticketId,
    updates,
    String(session.user.id ?? ""),
    session.user.name || session.user.email || "Admin"
  );

  if (!updatedTicket) {
    return NextResponse.json({ error: "Chamado não encontrado ou sem alterações." }, { status: 404 });
  }

  return NextResponse.json(updatedTicket);
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  const resolvedParams = await params;
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deleted = await deleteTicket(
    resolvedParams.ticketId,
    String(session.user.id ?? ""),
    session.user.name || session.user.email || "Admin"
  );

  if (!deleted) {
    return NextResponse.json({ error: "Chamado não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
