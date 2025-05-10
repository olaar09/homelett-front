import ApiService from "./APIService";
import { IAuthRequest, IKYCRequest, INextOfKinRequest } from "@/app/interfaces/IRegisterRequest";

class AuthAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }


  async googleSignIn(idToken: string): Promise<{ data: any }> {
    try {
      return await this.apiService.post("/auth/google", {
        id_token: idToken,
        is_bubble: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async reqInvite(data: any): Promise<{ data: any }> {
    try {
      return await this.apiService.post("/auth/request-invite", {
        ...data,
        is_bubble: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(data: {
    otp: string;
    password: string;
  }): Promise<{ data: any }> {
    try {
      return await this.apiService.post("/auth/reset-password", {
        otp: data.otp,
        password: data.password,
      });
    } catch (error) {
      throw error;
    }
  }

  async requestOTP(data: { email: string }): Promise<string> {
    try {
      return await this.apiService.post("/auth/request-reset-otp", {
        email: data.email,
      });
    } catch (error) {
      throw error;
    }
  }

  async register(data: IAuthRequest): Promise<{ data: any }> {
    try {
      return await this.apiService.post("/auth/register", {
        email: data.email,
        password: data.password,
        phone: data.phone,
        first_name: data.first_name,
        last_name: data.last_name,
        unit_name: data.unit_name,
        house_id: data.house_id,
        house_sku_id: data.house_sku_id,
        meter_number: data.meter_number,
        invite_code: data.invite_code,
        is_bubble: true,
        is_utility_signup: data.is_utility_signup,
      });
    } catch (error) {
      throw error;
    }
  }

  async addNextOfKin(data: INextOfKinRequest): Promise<{ data: any }> {
    try {
      return await this.apiService.post("/user-onboarding/next-of-kin", {
        ...data,
      });
    } catch (error) {
      throw error;
    }
  }

  async addKYC(data: IKYCRequest): Promise<{ data: any }> {
    try {
      return await this.apiService.post("/user-onboarding/kyc", {
        ...data,
      });
    } catch (error) {
      throw error;
    }
  }

  async uploadSignature(file: File): Promise<any> {
    try {
      return await this.apiService.postFile('/user-onboarding/upload-signature', file)
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(file: File): Promise<any> {
    try {
      return await this.apiService.postFile('/user/upload-file', file)
    } catch (error) {
      throw error;
    }
  }

  async login(data: { email: string, password: string }): Promise<{ data: any }> {
    try {
      return await this.apiService.post("/auth/login", {
        email: data.email,
        password: data.password,
        is_bubble: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.apiService.get("/auth/logout");
    } catch (error) {
      throw error;
    }
  }
}

export default AuthAPIService;
