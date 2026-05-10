import { auth } from "@/auth";
import { getReportData } from "@/lib/oracle";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reportData = await getReportData();
  return NextResponse.json(reportData);
}
