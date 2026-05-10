import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { findOrCreateUser, getUserByEmail } from "@/lib/oracle";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      const email = user?.email;
      if (!email) return false;

      try {
        await findOrCreateUser({
          email,
          name: user.name ?? email,
          image: user.image ?? null,
        });
        return true;
      } catch (error) {
        console.error("Erro ao criar/atualizar usu�rio no Oracle:", error);
        return false;
      }
    },

    async session({ session }) {
      if (!session?.user?.email) return session;

      const dbUser = await getUserByEmail(session.user.email);
      if (!dbUser) return session;

      session.user.id = dbUser.ID ?? dbUser.id;
      session.user.role = dbUser.ROLE ?? dbUser.role;
      session.user.authorized_admin = (dbUser.AUTHORIZED_ADMIN ?? dbUser.authorized_admin) === 1;

      return session;
    },

    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const userEmail = auth?.user?.email;
      const userRole = auth?.user?.role;

      const isLoggedIn = !!auth?.user;
      const isAdminRoute = pathname.startsWith("/admin");

      if (isAdminRoute) {
        if (!isLoggedIn) return false;
        return userRole === "ADMIN" || userEmail === "matheuszlau@gmail.com";
      }

      return true;
    },
  },
});
