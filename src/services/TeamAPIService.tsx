import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";

class TeamAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async addTeam(data: any): Promise<any> {
    try {
      await this.apiService.post("/teams", data);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getTeam(): Promise<{ data: { data: any } }> {
    try {
      const team = await this.apiService.get("/teams");
      return team as { data: any };
    } catch (error) {
      throw error;
    }
  }
}

export default TeamAPIService;
