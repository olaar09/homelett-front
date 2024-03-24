import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { ISubjectItem } from "@/app/interfaces/ISubjectItem";

class SubjectService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async listSubjects(): Promise<{ data: ISubjectItem[] }> {
    try {
      const subjects = await this.apiService.get("/user_subject_list");
      return { data: subjects } as { data: ISubjectItem[] };
    } catch (error) {
      throw new Error(`Failed to list subjects: ${error}`);
    }
  }

  async addSubject(newSubject: INewSubject): Promise<ISubjectItem> {
    try {
      const addedSubject = await this.apiService.post(
        "/add_subject",
        newSubject
      );
      return addedSubject as ISubjectItem;
    } catch (error) {
      throw new Error(`Failed to add a new subject: ${error}`);
    }
  }
}

export default SubjectService;
