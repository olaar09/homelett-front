import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";

class CVAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async generateCVCover(profileId: string, jobId: number): Promise<string> {
    try {
      const text = await this.apiService.post<{ data: string }>(
        `/action/generate_cover`,
        {
          job_id: jobId,
          profile_id: profileId,
        }
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async getJobProfile(profileId: string): Promise<any> {
    try {
      const response = await this.apiService.get(
        `/action/getJProfile/${profileId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getExperiences(profileId: string): Promise<{ data: any[] }> {
    try {
      const response = await this.apiService.get(
        `/action/get_experiences/${profileId}`
      );
      return response as { data: any[] };
    } catch (error) {
      throw error;
    }
  }

  async generateExperience(
    chatId: string,
    config: { key: string; value: string }
  ): Promise<string> {
    try {
      const response = await this.apiService.put(`/chats/${chatId}/history`, {
        chat_history_id: chatId,
        key: Object.keys(config)[0],
        config: Object.values(config)[0],
      });
      return response as string;
    } catch (error) {
      throw error;
    }
  }
}

export default CVAPIService;
