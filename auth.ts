import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ profile }) {
            const allowedEmail = "matheuszlau@gmail.com";

            if (profile?.email !== allowedEmail) {
                return false;
            }

            return true;
        },

        authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

            if (isAdminRoute) {
                return isLoggedIn;
            }

            return true;
        },
    },
});