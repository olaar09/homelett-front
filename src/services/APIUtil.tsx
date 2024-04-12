// Import the necessary services
import APIService from "./APIService";
import AuthAPIService from "./AuthAPIService";
import GroupAPIService from "./GroupAPIService";
import ProfileAPIService from "./ProfileAPIService";
import ChatAPIService from "./ChatAPIService";
import ChatHistoryAPIService from "./ChatHistoryAPIService";
import DataSourceAPIService from "./DatasourceAPIService";
import TeamAPIService from "./TeamAPIService";

class APIUtil {
  public chatService: ChatAPIService;
  public groupService: GroupAPIService;
  public profileService: ProfileAPIService;
  public teamService: TeamAPIService;
  public authService: AuthAPIService;
  public chatHistoryService: ChatHistoryAPIService;
  public datasourceService: DataSourceAPIService;

  constructor() {
    const service = new APIService("https://api.sequelbase.com/api"); // Initialize ApiService
    this.chatService = new ChatAPIService(service); // Use ApiService instance to initialize chatService
    this.groupService = new GroupAPIService(service);
    this.profileService = new ProfileAPIService(service);
    this.authService = new AuthAPIService(service);
    this.chatHistoryService = new ChatHistoryAPIService(service);
    this.chatService = new ChatAPIService(service);
    this.datasourceService = new DataSourceAPIService(service);
    this.teamService = new TeamAPIService(service);
  }
}

export default APIUtil;
