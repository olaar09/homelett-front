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
import { HouseIssueService } from "./HouseIssueService";
import { Str } from "@/utils/consts";

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
  public houseIssueService: HouseIssueService;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction
      ? Str.baseUrlProd
      : Str.baseUrlDev;

    const service = new APIService(baseUrl); // Initialize ApiService
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
    this.houseIssueService = new HouseIssueService(service);
  }
}

export default APIUtil;