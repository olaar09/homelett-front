import { IPlatform, IProduct } from "./IProduct";

export interface IJProfile {}

export interface IAuthRequest {
  id?: string;
  fullname?: string;
  bannerProduct?: IProduct;
  email: string;
  password: string;
  phone: string;
  company?: string;
  bank_info?: IUserBank;
  nuban?: IUserBank;
  coupon?: ICoupon;
  is_open_ai?: number;
  is_activated?: number;
  is_reseller?: number;
  is_return_user: number;
  is_admin?: number;
  is_earner?: number;
  total_invites: number;
  total_active_invites: number;
  invite_token: string;
  invite_link: string;
  finance?: {
    balance: number;
    totalSpends: number;
    totalDeposits: number;
    totalPayouts: number;
    pendingPayouts: number;
    totalReferralEarning: number;
  };
  p2p: {
    bank_info: {
      bank_name: string;
      bank_account_number: string;
      bank_account_name: string;
    };
  };
  freeTrialLeft?: any;
  billingActive?: boolean;
  billingCurrentPlan?: IBilling;
  active_subscriptions?: ISubscription[];
  home_products: IProduct[]
  reseller_products: IProduct[]
  paymentLink?: string;
  token?: string;
  subscriptions: any[];
}

export interface IUserBank {
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
  pending: boolean;
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
  admin_status?: string;
  info?: string;
  email: string;
  password: string;
  gpassword: string;
  invite_link?: string;
  extra_data?: any;
  next_renewal: string;
}

export interface ISubscriptionCredentials {
  id: number;
  platform: IPlatform;
  credential: ICredential;
}


export interface ICoupon {
  id: number;
  coupon: string;
  duration: string;
}
