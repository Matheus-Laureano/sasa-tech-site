import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SaasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return <div className="min-h-screen bg-zinc-950 text-zinc-100">{children}</div>;
}
