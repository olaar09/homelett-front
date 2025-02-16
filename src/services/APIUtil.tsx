// Import the necessary services
import APIService from "./APIService";
import AuthAPIService from "./AuthAPIService";
import ProfileAPIService from "./ProfileAPIService";

import WorkflowAPIService from "./WorkflowAPIService";
import ProductAPIService from "./ProductAPIService";
import TransactionAPIService from "./TransactionAPIService";
import SubscriptionAPIService from "./SubscriptionAPIService";
import HouseAPIService from "./HouseAPIService";
import DashboardAPIService from "./DashboardAPIService";
import { HousePaymentService } from "./HousePaymentService";

class APIUtil {
  public productService: ProductAPIService;
  public dashboardService: DashboardAPIService;
  public transactionService: TransactionAPIService;
  public profileService: ProfileAPIService;
  public houseService: HouseAPIService;
  public workflowService: WorkflowAPIService;
  public authService: AuthAPIService;
  public housePaymentService: HousePaymentService;
  public subscriptionService: SubscriptionAPIService;

  constructor() {
    const service = new APIService("http://localhost:3001"); // Initialize ApiService
    this.productService = new ProductAPIService(service);
    this.productService = new ProductAPIService(service);
    this.dashboardService = new DashboardAPIService(service);
    this.profileService = new ProfileAPIService(service);
    this.houseService = new HouseAPIService(service);
    this.authService = new AuthAPIService(service);
    this.transactionService = new TransactionAPIService(service);
    this.subscriptionService = new SubscriptionAPIService(service);
    this.housePaymentService = new HousePaymentService(service);
    this.workflowService = new WorkflowAPIService(service);
  }
}

export default APIUtil;
