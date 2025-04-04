import { IHouse } from "./IHouse";
import { IKornConfig } from "./IKornConfig";
import { IPlatform, IProduct, ITransaction } from "./IProduct";

export interface IJProfile { }

export interface IHouseSKU {
  id: number,
  name: string,
  description: string,
  price: number,
  service_charge: number,
  house_id: number,
  created_at: string,
  updated_at: string
}


export interface IHouseInvite {
  invite: {
    id: number,
    email: string,
    phone: string,
    house_id: number,
    house_sku_id: number,
    status: string,
    license_start: string,
    license_end: string,
    document_path?: string,
    created_at: string,
    updated_at: string,
    invite_code: string,
    house: IHouse,
    house_sku: IHouseSKU
  },  
  house: IHouse,
  sku: IHouseSKU
}

export interface IHousePlan {
  "id": number,
  "house_id": number,
  "plan_name": string,
  "plan_price": number,
  "plan_description": string,
  total_selection_count: 0,
  total_selection: string
  "products": {
    HomeLett_product: IProduct
  }[]
}

export interface IKYCRequest {
  nin: string;
  current_address: string;
  work_address: string;
  occupation: string;
}

export interface INextOfKinRequest {
  kin_name: string;
  kin_address: string;
  kin_relationship: string;
  kin_phone: string;
}

export interface IAuthRequest {
  id?: string;
  fullname?: string;
  bannerProduct?: IProduct;
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
  onboarding_step: number;
  house_id?: any;
  is_utility_signup?: boolean;
  house_sku_id?: number;
  house?: IHouse;
  invite?: IHouseInvite;
  finance?: {
    balance: number;
  };
  sku?: IHouseSKU;
  kyc?: IKYCRequest;
  nextOfKin?: INextOfKinRequest;
  meter_number?: string;
  invite_code?: string;
  transactions: ITransaction[];
  is_house_admin?: number;
  has_activated_meter?: number;
/*   
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
  is_house_admin: number;
  onboardingStep: number;
  houses?: IHouse[];
  house?: IHouse,
  recent_transactions: ITransaction[],
  house_plans?: IHousePlan[],
  "active_sub": {
    "id": number,
    "user_id": number,
    "product_id": number,
    "plan_end": string,
    "is_active": number,
    "interval": string,
    "plan": IHousePlan | null
  },
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
  active_subscriptions?: ISubscription[];
  streaming: IProduct[]
  reseller_products: IProduct[]
  paymentLink?: string;
  token?: string;
  subscriptions: any[];
  configs: IKornConfig[] */
}

export interface IUserBank {
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
  status: 'pending' | 'completed';
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
