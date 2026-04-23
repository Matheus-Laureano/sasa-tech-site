import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn() {
      return true;
    },

    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const userEmail = auth?.user?.email;

      const isLoggedIn = !!auth?.user;
      const isAdminRoute = pathname.startsWith("/admin");
      const isAgendaRoute = pathname.startsWith("/agenda");

      if (isAdminRoute) {
        if (!isLoggedIn) return false;
        return userEmail === "matheuszlau@gmail.com";
      }

      if (isAgendaRoute) {
        return isLoggedIn;
      }

      return true;
    },
  },
});