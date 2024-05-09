export interface IAuthRequest {
  id?: string;
  fullname?: string;
  email: string;
  password: string;
  company?: string;
  is_open_ai?: number;
  freeTrialLeft?: any;
  billingActive?: boolean;
  billingCurrentPlan?: IBilling;
  active_job_profile: IJProfile;
  paymentLink?: string;
  token?: string;
}

export interface IJProfile {
  id: string;
  name: string;
  is_active: number;
  profession: string;
  attributes: {
    title: string;
    value: string;
    icon: null;
    attribute: "language" | "skill";
  }[];
  ai_experience_summary: string;
  temperature: string;
  last_jobs_assignment: string;
  experiences: IExperience[];
}

export interface IExperience {
  id: number;
  niche_profile_id: number;
  experience_title: string;
  duration_start: string;
  duration_end: string;
  content: string;
  company_info: string;
  team_size?: string;
  main_responsibilities: string;
  main_tools: string;
  company_name: string;
}

export interface IBilling {
  id: number;
  name: string;
  description: string;
  base_amount: string;
  stripe_payment_link_id: string;
  stripe_payment_link: string;
}
