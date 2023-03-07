export interface User {
  email: string;
  token: string;
}

export interface UserState extends User {
  isLogged: boolean;
}
