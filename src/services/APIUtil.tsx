// Import the necessary services
import APIService from "./APIService";
import AuthAPIService from "./AuthAPIService";
import GroupAPIService from "./GroupAPIService";
import ProfileAPIService from "./ProfileAPIService";
import ChatAPIService from "./ChatAPIService";

class APIUtil {
  public chatService: ChatAPIService;
  public groupService: GroupAPIService;
  public profileService: ProfileAPIService;
  public authService: AuthAPIService;

  constructor() {
    const service = new APIService("https://api.sequelbase.com/api"); // Initialize ApiService
    this.chatService = new ChatAPIService(service); // Use ApiService instance to initialize chatService
    this.groupService = new GroupAPIService(service);
    this.profileService = new ProfileAPIService(service);
    this.authService = new AuthAPIService(service);
  }
}

export default APIUtil;
