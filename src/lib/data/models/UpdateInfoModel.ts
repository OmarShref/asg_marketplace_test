import { CustomerModel } from "./CustomerModel";

interface UpdateAccountInfoInterface {
  success: boolean;
  message: string;
  customer: CustomerModel;
}

export class UpdateAccountInfoModel implements UpdateAccountInfoInterface {
  success: boolean;
  message: string;
  customer: CustomerModel;
  constructor(updateAccountInfoData: any) {
    this.success = updateAccountInfoData?.success;
    this.message = updateAccountInfoData?.message;
    this.customer = new CustomerModel(updateAccountInfoData);
  }
}
