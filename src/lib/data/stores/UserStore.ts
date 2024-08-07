import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CustomerModel } from "../models/CustomerModel";
import { CartModel } from "../models/CartModel";
import { OrderModel } from "../models/OrderModel";
import { CategoryModel } from "../models/CategoryModel";
import { RewardPointsModel } from "../models/RewardPointsModel";
import { CustomerRewardPointsModel } from "../models/CustomerRewardPointsModel";

export type LastOrderType = {
  isWaiting: boolean;
  order: OrderModel;
  cart: CartModel;
};
type UserType = {
  customer: CustomerModel | null;
  cart: CartModel | null;
  wishList: CategoryModel | null;
  lastOrder: LastOrderType | null;
  anonymousId: string | null;
  customerRewardPoints: CustomerRewardPointsModel | null;
  checkoutRewardPoints: RewardPointsModel | null;
};

const useUserStore = create(
  persist<UserType>(
    (set) => ({
      customer: null,
      cart: null,
      wishList: null,
      lastOrder: null,
      anonymousId: null,
      customerRewardPoints: null,
      checkoutRewardPoints: null,
    }),
    {
      name: "user",
    },
  ),
);

export default useUserStore;
