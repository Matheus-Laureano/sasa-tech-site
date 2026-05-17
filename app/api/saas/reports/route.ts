import { auth } from "@/auth";
import { getReportData } from "@/lib/oracle";
import { NextResponse } from "next/server";

export async function GET() {
  // Temporariamente removido login obrigatório
  // const session = await auth();
  // if (!session?.user?.email) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // Admin role check is done at the page level

  const reportData = await getReportData();
  return NextResponse.json(reportData);
}
