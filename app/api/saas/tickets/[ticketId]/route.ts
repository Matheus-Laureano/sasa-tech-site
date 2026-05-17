import { auth } from "@/auth";
import { getTicketById, updateTicket } from "@/lib/oracle";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ ticketId: string }>;
}

export async function GET(_req: Request, { params }: RouteParams) {
  const resolvedParams = await params;
  // Temporariamente removido login obrigatório
  // const session = await auth();
  // if (!session?.user?.email) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const ticket = await getTicketById(resolvedParams.ticketId);
  if (!ticket) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Temporariamente removido verificação de permissão
  // const userId = session.user.id as string;
  // if ((session.user as any).role !== "ADMIN" && ticket.requester_id !== userId) {
  //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // }

  return NextResponse.json(ticket);
}

export async function PATCH(req: Request, { params }: RouteParams) {
  const resolvedParams = await params;
  // Temporariamente removido login obrigatório
  // const session = await auth();
  // if (!session?.user?.email) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const ticket = await getTicketById(resolvedParams.ticketId);
  if (!ticket) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Temporariamente removido verificação de permissão
  // const userId = session.user.id as string;
  // if ((session.user as any).role !== "ADMIN" && ticket.requester_id !== userId) {
  //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // }

  const body = await req.json();
  const updates = {
    status: body.status ? String(body.status) : undefined,
    priority: body.priority ? String(body.priority) : undefined,
    assigned_to: body.assigned_to ?? undefined,
  };

  const updatedTicket = await updateTicket(
    resolvedParams.ticketId,
    updates,
    "mock-user-id", // Temporário para teste sem autenticação
    "Usuário Mock" // Temporário para teste sem autenticação
  );

  return NextResponse.json(updatedTicket);
}
