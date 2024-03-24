import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { ISubjectGroup } from "@/app/interfaces/ISubjectGroup";

class GroupAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async listGroups(): Promise<ISubjectGroup[]> {
    try {
      const groups = await this.apiService.get("/user_groups");
      return groups as ISubjectGroup[];
    } catch (error) {
      throw new Error(`Failed to list subjects: ${error}`);
    }
  }

  async adGroup(groupCode: string): Promise<void> {
    try {
      await this.apiService.post("/add_group", groupCode);
    } catch (error) {
      throw new Error(`Failed to add a new subject: ${error}`);
    }
  }
}

export default GroupAPIService;
