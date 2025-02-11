import ApiService from "./APIService";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";

class AuthAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async googleSignIn(idToken: string): Promise<{ data: IAuth }> {
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
  }): Promise<{ data: IAuth }> {
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
        is_bubble: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async login(data: IAuthRequest): Promise<{ data: IAuth }> {
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
