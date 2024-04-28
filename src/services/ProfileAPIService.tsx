import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";

class ProfileAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
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
