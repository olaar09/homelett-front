// Import the necessary services
import APIService from "./APIService";
import AuthAPIService from "./AuthAPIService";
import ProfileAPIService from "./ProfileAPIService";

import WorkflowAPIService from "./WorkflowAPIService";
import ProductAPIService from "./ProductAPIService";
import TransactionAPIService from "./TransactionAPIService";
import SubscriptionAPIService from "./SubscriptionAPIService";
import HouseAPIService from "./HouseAPIService";

class APIUtil {
  public productService: ProductAPIService;
  public transactionService: TransactionAPIService;
  public profileService: ProfileAPIService;
  public houseService: HouseAPIService;
  public workflowService: WorkflowAPIService;
  public authService: AuthAPIService;
  public subscriptionService: SubscriptionAPIService;

  constructor() {
    const service = new APIService("https://api.bubble.africa/api"); // Initialize ApiService
    this.productService = new ProductAPIService(service);
    this.profileService = new ProfileAPIService(service);
    this.houseService = new HouseAPIService(service);
    this.authService = new AuthAPIService(service);
    this.transactionService = new TransactionAPIService(service);
    this.subscriptionService = new SubscriptionAPIService(service);

    this.workflowService = new WorkflowAPIService(service);
  }
}

export default APIUtil;
