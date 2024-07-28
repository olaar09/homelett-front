import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";

class ProfileAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async addMoney(data: { refunds: { amount: number, email: string }[] }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/admin_4599299934_credentials/refundUsers`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deductMoney(data: { refunds: { amount: number, email: string }[] }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/admin_4599299934_credentials/deductUsers`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async initiateP2P(data: { amount: number }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/transactions/initiateP2P`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async confirmP2P(data: { reference: string }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/transactions/verifyP2P`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateBankDetails(data: {
    bank_name: string;
    bank_account_name: string;
    bank_account_number?: string;
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/bank_info`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async loadProfile(): Promise<{ data: IAuthRequest }> {
    try {
      const user = await this.apiService.get("/user");
      return user as { data: IAuthRequest };
    } catch (error) {
      throw error;
    }
  }

  async completeUpgradeProfile(reference: string): Promise<any> {
    try {
      return await this.apiService.post("/transactions/completePaystack", {
        reference,
      });
    } catch (error) {
      throw error;
    }
  }

  async getInvite(inviteCode: string): Promise<{ data: IAuthRequest }> {
    try {
      const user = await this.apiService.get(
        `/onboarding/invite/${inviteCode}`
      );
      return user as { data: IAuthRequest };
    } catch (error) {
      throw error;
    }
  }

  async submitInvite(data: any): Promise<{ data: IAuthRequest }> {
    try {
      const user = await this.apiService.post(
        `/onboarding/invite/complete`,
        data
      );
      return user as { data: IAuthRequest };
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileAPIService;
