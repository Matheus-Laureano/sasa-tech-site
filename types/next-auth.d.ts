import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    authorized_admin?: boolean;
  }

  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id?: string;
      role?: string;
      authorized_admin?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    authorized_admin?: boolean;
  }
}
