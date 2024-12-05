import { AuthUser } from '~/feature/auth/types';

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  user: AuthUser;
}

export interface CSRFResponse {
  _csrf: string;
}
