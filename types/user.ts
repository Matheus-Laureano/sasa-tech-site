export type UserRole = "USER" | "ADMIN" | "TECH";

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role: UserRole;
  authorized_admin: number;
  created_at: string;
  last_login_at?: string;
}
