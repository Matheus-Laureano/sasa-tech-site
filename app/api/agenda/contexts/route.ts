import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    contexts: [
      { id: "trabalho", name: "Trabalho" },
      { id: "pessoal", name: "Pessoal" },
      { id: "estudo", name: "Estudo" },
      { id: "saude", name: "Saúde" },
    ],
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    data: body,
  });
}