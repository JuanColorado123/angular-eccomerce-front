import { User } from "./users.interfaces";

export interface AuthResponse {
  user:  User;
  token: string;
}

