export interface IAuthRequest {
  id?: string;
  username?: string;
  email: string;
  password: string;
  company?: string;
  is_open_ai?: number;
  billingActive: boolean;
}
