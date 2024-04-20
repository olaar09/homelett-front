// Import the necessary services
import APIService from "./APIService";
import AuthAPIService from "./AuthAPIService";
import GroupAPIService from "./GroupAPIService";
import ProfileAPIService from "./ProfileAPIService";
import ChatAPIService from "./ChatAPIService";
import ChatHistoryAPIService from "./ChatHistoryAPIService";
import DataSourceAPIService from "./DatasourceAPIService";
import TeamAPIService from "./TeamAPIService";
import IntegrationAPIService from "./IntegrationAPIService";
import WorkflowAPIService from "./WorkflowAPIService";

class APIUtil {
  public chatService: ChatAPIService;
  public groupService: GroupAPIService;
  public profileService: ProfileAPIService;
  public teamService: TeamAPIService;
  public workflowService: WorkflowAPIService;
  public authService: AuthAPIService;
  public integrationsService: IntegrationAPIService;
  public chatHistoryService: ChatHistoryAPIService;
  public datasourceService: DataSourceAPIService;

  constructor() {
    const service = new APIService("https://api.applygeni.us/api"); // Initialize ApiService
    this.chatService = new ChatAPIService(service); // Use ApiService instance to initialize chatService
    this.groupService = new GroupAPIService(service);
    this.profileService = new ProfileAPIService(service);
    this.authService = new AuthAPIService(service);
    this.chatHistoryService = new ChatHistoryAPIService(service);
    this.chatService = new ChatAPIService(service);
    this.datasourceService = new DataSourceAPIService(service);
    this.teamService = new TeamAPIService(service);
    this.integrationsService = new IntegrationAPIService(service);
    this.workflowService = new WorkflowAPIService(service);
  }
}

export default APIUtil;
