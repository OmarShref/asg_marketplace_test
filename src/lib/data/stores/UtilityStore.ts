import { productsListDisplayModes, stores } from "@/lib/core/basic/Constants";
import { create } from "zustand";
import { ProductModel } from "../models/ProductModel";
import { RewardPointsModel } from "../models/RewardPointsModel";

export type HeaderOptionsType = {
  showHeader?: boolean;
  title?: string | null;
  withBackButton?: boolean;
  withBurgerButton?: boolean;
  withLogo?: boolean;
  withSearch?: boolean;
  searchExpanded?: boolean;
  withWishlist?: boolean;
};
export type NavbarOptionsType = {
  showNavbar?: boolean;
};

export type Utility = {
  storeCode: string;
  productsListDisplayMode: string;
  changeProductsListDisplayMode: () => void;
  pageType: string | null;
  headerOptions: HeaderOptionsType;
  navbarOptions: NavbarOptionsType;
  openAddPaymentCardDrawer: boolean;
  generalLoading: boolean;
  // ====================================
  addedToCartOpen: boolean;
  setAddedToCartOpen: (value: boolean) => void;
  addedToCartSuccess: boolean;
  setAddedToCartSuccess: (value: boolean) => void;
  addedToCartProduct: ProductModel | null;
  setAddedToCartProduct: (product: ProductModel | null) => void;
  addedToCartRewardPoints: RewardPointsModel | null;
  setAddedToCartRewardPoints: (
    rewardPoints: RewardPointsModel | null | undefined,
  ) => void;
};

const useUtilityStore = create<Utility>((set) => ({
  storeCode: stores[0],
  productsListDisplayMode: productsListDisplayModes.multiColumn,
  changeProductsListDisplayMode: () =>
    set((state) => ({
      productsListDisplayMode:
        state?.productsListDisplayMode === productsListDisplayModes.multiColumn
          ? productsListDisplayModes.oneColumn
          : productsListDisplayModes.multiColumn,
    })),
  pageType: null,
  headerOptions: {
    showHeader: true,
    title: null,
    withBackButton: true,
    withBurgerButton: true,
    withLogo: true,
    withSearch: true,
    searchExpanded: false,
    withWishlist: true,
  },
  navbarOptions: {
    showNavbar: true,
  },
  openAddPaymentCardDrawer: false,
  generalLoading: false,

  // ====================================

  addedToCartOpen: false,
  setAddedToCartOpen: (value: boolean) => set({ addedToCartOpen: value }),
  addedToCartSuccess: false,
  setAddedToCartSuccess: (value: boolean) => set({ addedToCartSuccess: value }),
  addedToCartProduct: null,
  setAddedToCartProduct: (product: ProductModel | null) =>
    set({
      addedToCartProduct: product,
    }),
  addedToCartRewardPoints: null,
  setAddedToCartRewardPoints: (
    rewardPoints: RewardPointsModel | null | undefined,
  ) =>
    set({
      addedToCartRewardPoints: rewardPoints,
    }),
}));

export default useUtilityStore;
