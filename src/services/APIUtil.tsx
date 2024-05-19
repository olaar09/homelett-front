// Import the necessary services
import APIService from "./APIService";
import AuthAPIService from "./AuthAPIService";
import ProfileAPIService from "./ProfileAPIService";

import WorkflowAPIService from "./WorkflowAPIService";
import ProductAPIService from "./ProductAPIService";

class APIUtil {
  public productService: ProductAPIService;
  public profileService: ProfileAPIService;
  public workflowService: WorkflowAPIService;
  public authService: AuthAPIService;

  constructor() {
    const service = new APIService("https://api.useapplybase.com/api"); // Initialize ApiService
    this.productService = new ProductAPIService(service);
    this.profileService = new ProfileAPIService(service);
    this.authService = new AuthAPIService(service);

    this.workflowService = new WorkflowAPIService(service);
  }
}

export default APIUtil;
