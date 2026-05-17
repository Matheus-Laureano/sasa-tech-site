import { auth } from "@/auth";
import { fetchTicketHistory, getTicketById } from "@/lib/oracle";
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

  const history = await fetchTicketHistory(resolvedParams.ticketId);
  return NextResponse.json(history);
}
