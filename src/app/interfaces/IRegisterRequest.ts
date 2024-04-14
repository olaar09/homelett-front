export interface IAuthRequest {
  id?: string;
  username?: string;
  email: string;
  password: string;
  company?: string;
  is_open_ai?: number;
  freeTrialLeft?: any;
  billingActive?: boolean;
  billingCurrentPlan?: IBilling;
  paymentLink?: string;
  token?: string;
}

interface IBilling {
  id: number;
  name: string;
  description: string;
  base_amount: string;
  stripe_payment_link_id: string;
  stripe_payment_link: string;
}
