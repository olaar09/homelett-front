import ApiService from "./APIService";

class JobAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async applyToJob(profileId: string, jobId: string): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/jobs/apply_for_job`,
        {
          job_id: jobId,
          profile_id: profileId,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchJobProfileFeatures(
    profileId: string,
    jobId: number
  ): Promise<IJobProfileFeature | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(
        `/jobs/get_job_features/${profileId}/${jobId}`
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchJobApplications(): Promise<any[] | null> {
    try {
      const response = await this.apiService.get<{ data: any }>(
        `/jobs/get_applications`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default JobAPIService;
