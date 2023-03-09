import { JwtPayload } from "jwt-decode";

export interface User {
  email: string;
  token: string;
}

export interface UserState extends User {
  isLogged: boolean;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface CustomTokenPayload extends JwtPayload {
  email: string;
}
