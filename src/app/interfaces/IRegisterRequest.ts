import { IProduct } from "./IProduct";

export interface IAuthRequest {
  id?: string;
  fullname?: string;
  email: string;
  password: string;
  company?: string;
  is_open_ai?: number;
  finance?: {
    balance: number;
  };
  freeTrialLeft?: any;
  billingActive?: boolean;
  billingCurrentPlan?: IBilling;
  active_subscriptions?: ISubscription[];
  paymentLink?: string;
  token?: string;
  subscriptions: any[];
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

export interface ISubscriptionCredentials {
  id: number;
  product: IProduct;
  email: string;
  password: string;
  extra?: any;
}
