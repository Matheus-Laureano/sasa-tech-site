import { getConnection } from "@/lib/oracle";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conn = await getConnection();
    const result = await conn.execute("SELECT * FROM USERS");
    console.log("Users:", result.rows);
    await conn.close();
    return NextResponse.json({ success: true, users: result.rows });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}