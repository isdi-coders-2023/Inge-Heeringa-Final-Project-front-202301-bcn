import { type JwtPayload } from "jwt-decode";

export interface CustomTokenPayload extends JwtPayload {
  email: string;
}

export interface UserRegisterData {
  username: string;
  password: string;
  email: string;
}

export interface UserRegisterResponse {
  message: string;
}
