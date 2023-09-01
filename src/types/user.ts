// src/types/user.ts

export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export interface User {
  id: string;
  name: string;
  role: Role;
  image: string;
  isActive: boolean;
}
