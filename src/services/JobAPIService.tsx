import ApiService from "./APIService";

class JobAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async fetchJobProfileFeatures(
    profileId: string,
    jobId: number
  ): Promise<string> {
    try {
      const text = await this.apiService.get<{ data: string }>(
        `/jobs/get_job_features/${profileId}/${jobId}`
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }
}

export default JobAPIService;
