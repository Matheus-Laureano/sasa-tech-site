import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {
  findOrCreateUser,
  getUserByEmail,
  verifyUserByEmailAndPassword,
  verifyUserByPhoneAndPassword,
} from "@/lib/oracle";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      id: "email-password",
      name: "Email + Senha",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await verifyUserByEmailAndPassword(
          credentials.email.toString(),
          credentials.password.toString()
        );

        if (!user) return null;

        return {
          id: user.ID,
          name: user.NAME,
          email: user.EMAIL,
          image: user.IMAGE,
          role: user.ROLE,
          authorized_admin: user.AUTHORIZED_ADMIN === 1,
        };
      },
    }),
    Credentials({
      id: "phone-password",
      name: "Telefone + Senha",
      credentials: {
        phone: { label: "Telefone", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials.password) return null;

        const user = await verifyUserByPhoneAndPassword(
          credentials.phone.toString(),
          credentials.password.toString()
        );

        if (!user) return null;

        return {
          id: user.ID,
          name: user.NAME,
          email: user.EMAIL,
          image: user.IMAGE,
          role: user.ROLE,
          authorized_admin: user.AUTHORIZED_ADMIN === 1,
        };
      },
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
      session.user.role = (dbUser.ROLE ?? dbUser.role ?? (dbUser.AUTHORIZED_ADMIN === 1 || session.user.email === "matheuszlau@gmail.com" ? "ADMIN" : "USER")) as string;
      session.user.authorized_admin = (dbUser.AUTHORIZED_ADMIN ?? dbUser.authorized_admin) === 1;

      return session;
    },

    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const userEmail = auth?.user?.email;
      const userRole = (auth?.user as any)?.role;

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
