import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { ISubjectItem } from "@/app/interfaces/ISubjectItem";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";

class ProfileAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async loadProfile(): Promise<IAuthRequest> {
    try {
      const user = await this.apiService.get("/user");
      return user as IAuthRequest;
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileAPIService;
