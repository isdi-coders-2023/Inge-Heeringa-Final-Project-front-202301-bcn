import { JwtPayload } from "jwt-decode";

export interface CustomTokenPayload extends JwtPayload {
  email: string;
}
