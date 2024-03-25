import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { ISubjectItem } from "@/app/interfaces/ISubjectItem";

class ProfileAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async updateActiveChat(subject_id: string): Promise<void> {
    try {
      await this.apiService.post("/update_active_subject", {
        subject_id: subject_id,
      });
    } catch (error) {
      throw new Error(`Failed to list subjects: ${error}`);
    }
  }

  async addSubject(newSubject: INewSubject): Promise<ISubjectItem> {
    try {
      const addedSubject = await this.apiService.get(
        `/add_subject?reference=${newSubject.paymentReference}&subject_id=${newSubject.subjectId}`
      );
      return addedSubject as ISubjectItem;
    } catch (error) {
      throw new Error(`Failed to add a new subject: ${error}`);
    }
  }
}

export default ProfileAPIService;
