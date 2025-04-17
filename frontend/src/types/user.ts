
export type UserRole = "admin" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export const DEFAULT_ADMIN: User = {
  id: "admin-1",
  name: "Admin User",
  email: "admin@questscholar.com",
  role: "admin",
  avatar: "/avatars/admin.png"
};

export const DEFAULT_STUDENT: User = {
  id: "student-1",
  name: "Student User",
  email: "student@questscholar.com",
  role: "student",
  avatar: "/avatars/student.png"
};
