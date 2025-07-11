export enum Role {
  Superadmin = "superadmin",
  Admin = "admin",
  Staff = "staff",
  User = "user"
}

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
}
