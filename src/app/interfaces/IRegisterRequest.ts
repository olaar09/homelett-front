import { IPlatform, IProduct } from "./IProduct";

export interface IAuthRequest {
  id?: string;
  fullname?: string;
  email: string;
  password: string;
  phone: string;
  company?: string;
  bank_info?: IUserBank;
  is_open_ai?: number;
  is_activated?: number;
  finance?: {
    balance: number;
    totalSpends: number;
    totalDeposits: number;
    totalPayouts: number;
    pendingPayouts: number;
  };
  freeTrialLeft?: any;
  billingActive?: boolean;
  billingCurrentPlan?: IBilling;
  active_subscriptions?: ISubscription[];
  paymentLink?: string;
  token?: string;
  subscriptions: any[];
}

export interface IUserBank {
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
}

export interface ISubscription {
  id: number;
  user_id: number;
  product_id: number;
  plan_end: string;
  credentials: ISubscriptionCredentials[] | null;
  interval: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  product: IProduct;
}

export interface ICredential {
  id: number;
  platform: IPlatform;
  sharing_status?: string;
  info?: string;
  email: string;
  password: string;
  extra?: any;
  next_renewal: string;
}

export interface ISubscriptionCredentials {
  id: number;
  platform: IPlatform;
  credential: ICredential;
}
