// Import the necessary services
import APIService from "./APIService";
import GroupAPIService from "./GroupAPIService";
import SubjectService from "./SubjectService";

class APIUtil {
  public subjectService: SubjectService;
  public groupService: GroupAPIService;

  constructor() {
    const service = new APIService("http://localhost:3001/api"); // Initialize ApiService
    this.subjectService = new SubjectService(service); // Use ApiService instance to initialize SubjectService
    this.groupService = new GroupAPIService(service);
  }
}

export default APIUtil;
