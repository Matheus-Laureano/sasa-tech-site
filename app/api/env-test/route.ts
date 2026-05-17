import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ORACLE_USER: process.env.ORACLE_USER ? "SET" : "NOT SET",
    ORACLE_PASSWORD: process.env.ORACLE_PASSWORD ? "SET" : "NOT SET",
    ORACLE_CONNECTION_STRING: process.env.ORACLE_CONNECTION_STRING || "NOT SET",
    TNS_ADMIN: process.env.TNS_ADMIN || "NOT SET",
  });
}