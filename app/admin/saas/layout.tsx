import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminSaasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return <div className="min-h-screen bg-zinc-950 text-zinc-100">{children}</div>;
}
