// Import the necessary services
import APIService from "./APIService";
import AuthAPIService from "./AuthAPIService";
import GroupAPIService from "./GroupAPIService";
import ProfileAPIService from "./ProfileAPIService";
import CVAPIService from "./CVAPIService";
import ChatHistoryAPIService from "./CVAPIService";
import DataSourceAPIService from "./DatasourceAPIService";
import TeamAPIService from "./TeamAPIService";
import IntegrationAPIService from "./IntegrationAPIService";
import WorkflowAPIService from "./WorkflowAPIService";
import ProductAPIService from "./ProductAPIService";

class APIUtil {
  public cvService: CVAPIService;
  public productService: ProductAPIService;
  public groupService: GroupAPIService;
  public profileService: ProfileAPIService;
  public teamService: TeamAPIService;
  public workflowService: WorkflowAPIService;
  public authService: AuthAPIService;
  public integrationsService: IntegrationAPIService;
  public chatHistoryService: ChatHistoryAPIService;
  public datasourceService: DataSourceAPIService;

  constructor() {
    const service = new APIService("https://api.useapplybase.com/api"); // Initialize ApiService
    this.cvService = new CVAPIService(service); // Use ApiService instance to initialize cvService
    this.productService = new ProductAPIService(service);
    this.groupService = new GroupAPIService(service);
    this.profileService = new ProfileAPIService(service);
    this.authService = new AuthAPIService(service);
    this.chatHistoryService = new ChatHistoryAPIService(service);
    this.cvService = new CVAPIService(service);
    this.datasourceService = new DataSourceAPIService(service);
    this.teamService = new TeamAPIService(service);
    this.integrationsService = new IntegrationAPIService(service);
    this.workflowService = new WorkflowAPIService(service);
  }
}

export default APIUtil;
