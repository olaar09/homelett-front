import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";

class ProfileAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async loadProfile(): Promise<{ data: IAuthRequest }> {
    try {
      const user = await this.apiService.get("/user");
      return user as { data: IAuthRequest };
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileAPIService;
