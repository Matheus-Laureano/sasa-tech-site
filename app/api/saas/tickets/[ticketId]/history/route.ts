import { auth } from "@/auth";
import { fetchTicketHistory, getTicketById } from "@/lib/oracle";
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

  const history = await fetchTicketHistory(params.ticketId);
  return NextResponse.json(history);
}
