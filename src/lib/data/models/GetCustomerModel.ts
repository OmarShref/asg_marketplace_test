import { CartModel } from "./CartModel";
import { CustomerModel } from "./CustomerModel";
import { CustomerRewardPointsModel } from "./CustomerRewardPointsModel";
import { WishListModel } from "./WishListModel";

interface GetCustomerInterface {
  customer: CustomerModel;
  cart: CartModel;
  wishList: WishListModel;
  customerRewardPoints: CustomerRewardPointsModel;
}

export class GetCustomerModel implements GetCustomerInterface {
  customer: CustomerModel;
  cart: CartModel;
  wishList: WishListModel;
  customerRewardPoints: CustomerRewardPointsModel;

  constructor(getCustomerData: any) {
    this.customer = new CustomerModel(getCustomerData?.customer);
    this.cart = new CartModel({ cartData: getCustomerData?.cart });
    this.wishList = new WishListModel({
      wishListData: getCustomerData?.wishlist,
    });
    this.customerRewardPoints = new CustomerRewardPointsModel({
      customerRewardPointsData: getCustomerData?.customerRewardPoints,
    }).fromGql();
  }
}
