import { CustomerModel } from "./CustomerModel";

interface LoginInterface {
  success: boolean;
  message: string;
  token?: string;
  updateRequired?: boolean;
  customer: CustomerModel;
}

export class LoginModel implements LoginInterface {
  success: boolean;
  message: string;
  token?: string;
  updateRequired?: boolean;
  customer: CustomerModel;
  constructor(loginData: any) {
    this.success = loginData?.success;
    this.message = loginData?.message;
    this.token = loginData?.token;
    this.updateRequired = loginData?.update_required;
    this.customer = new CustomerModel(loginData);
  }
}
