import { auth } from "@/auth";
import { createTicket, listTickets } from "@/lib/oracle";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Temporariamente removido login obrigatório
  // const session = await auth();
  // if (!session?.user?.email) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || undefined;
  const priority = url.searchParams.get("priority") || undefined;
  const category = url.searchParams.get("category") || undefined;
  const search = url.searchParams.get("search") || undefined;
  const fromDate = url.searchParams.get("fromDate") || undefined;
  const toDate = url.searchParams.get("toDate") || undefined;

  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = String(session.user.id ?? "");
  const tickets = await listTickets({
    userId,
    isAdmin: false,
    status,
    priority,
    category,
    search,
    fromDate,
    toDate,
  });

  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  // Temporariamente removido login obrigatório
  // const session = await auth();
  // if (!session?.user?.email) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const body = await req.json();
  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const category = String(body.category || "Outro").trim();
  const priority = String(body.priority || "Média").trim();
  const equipment = String(body.equipment || "").trim();
  const location = String(body.location || "").trim();
  const contact_phone = String(body.contact_phone || "").trim();

  if (!title || !description) {
    return NextResponse.json({ error: "Título e descrição são obrigatórios." }, { status: 400 });
  }

  const ticket = await createTicket(
    { title, description, category, priority, equipment, location, contact_phone },
    "mock-user-id" // Temporário para teste sem autenticação
  );

  return NextResponse.json(ticket, { status: 201 });
}
