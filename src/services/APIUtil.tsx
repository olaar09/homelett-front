// Import the necessary services
import APIService from "./APIService";
import GroupAPIService from "./GroupAPIService";
import ProfileAPIService from "./ProfileAPIService";
import SubjectAPIService from "./SubjectAPIService";

class APIUtil {
  public subjectService: SubjectAPIService;
  public groupService: GroupAPIService;
  public profileService: ProfileAPIService;

  constructor() {
    const service = new APIService("https://api.sequelbase.com/api"); // Initialize ApiService
    this.subjectService = new SubjectAPIService(service); // Use ApiService instance to initialize SubjectService
    this.groupService = new GroupAPIService(service);
    this.profileService = new ProfileAPIService(service);
  }
}

export default APIUtil;
