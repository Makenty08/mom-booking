export interface AuthState {
  isLoggedIn: boolean;
  user: AuthUser | null;
}

export interface AuthUser {
  email: string;
  id: number;
}
