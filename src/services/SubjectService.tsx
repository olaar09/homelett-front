import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";

interface Subject {
  id: string;
  name: string;
  // Define other properties of a subject as needed
}

class SubjectService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async listSubjects(): Promise<Subject[]> {
    try {
      const subjects = await this.apiService.get("/subjects");
      return subjects as Subject[];
    } catch (error) {
      throw new Error(`Failed to list subjects: ${error}`);
    }
  }

  async addSubject(newSubject: INewSubject): Promise<Subject> {
    try {
      const addedSubject = await this.apiService.post(
        "/add_subject",
        newSubject
      );
      return addedSubject as Subject;
    } catch (error) {
      throw new Error(`Failed to add a new subject: ${error}`);
    }
  }
}

export default SubjectService;
