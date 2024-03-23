// Import the necessary services
import APIService from "./APIService";
import SubjectService from "./SubjectService";

class APIUtil {
  public subjectService: SubjectService;

  constructor() {
    const service = new APIService("http://localhost:3001/api"); // Initialize ApiService
    this.subjectService = new SubjectService(service); // Use ApiService instance to initialize SubjectService
  }
}

export default APIUtil;
