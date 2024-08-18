import { IKornConfig } from "./IKornConfig";

interface IPlan {
  name: string;
  description: string;
  base_amount: number;
  pro_rated_amount: number;
}

interface IBilling {
  company_id: number;
  plan_id: number;
  next_billing_date: string;
  selected_billing_method: string;
  company_name: string;
}

interface IAuth {
  all_permissions?: any[];
  backend_permissions?: any[];
  billingActive?: boolean;
  billingCurrentPlan?: IPlan;
  billingGracePeriod?: string;
  companyBilling?: IBilling;
  company_name?: "Melanin brown";
  dashboard_permissions?: any[];
  email: string;
  fullname: string;
  gracePeriodTill?: string;
  has_admin_privileges: boolean;
  phone: string;
  token?: string;
  config: IKornConfig[]
}
