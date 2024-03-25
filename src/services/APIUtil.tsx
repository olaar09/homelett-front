// Import the necessary services
import APIService from "./APIService";
import GroupAPIService from "./GroupAPIService";
import SubjectAPIService from "./SubjectAPIService";

class APIUtil {
  public subjectService: SubjectAPIService;
  public groupService: GroupAPIService;

  constructor() {
    const service = new APIService("http://localhost:3001/api"); // Initialize ApiService
    this.subjectService = new SubjectAPIService(service); // Use ApiService instance to initialize SubjectService
    this.groupService = new GroupAPIService(service);
  }
}

export default APIUtil;
