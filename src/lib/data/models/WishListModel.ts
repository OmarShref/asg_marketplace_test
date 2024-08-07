type WishListItemType = {
  id: number;
  itemId: number;
};

interface WishListInterface {
  id: number;
  totalCount: number;
  items: WishListItemType[];
}

export class WishListModel implements WishListInterface {
  id: number;
  totalCount: number;
  items: WishListItemType[];
  constructor({ wishListData }: { wishListData: any }) {
    this.id = wishListData?.id;
    this.totalCount = wishListData?.items_count;
    this.items = wishListData?.items?.map((item: any): WishListItemType => {
      return {
        id: item?.product_id ?? 0,
        itemId: item?.id ?? 0,
      };
    });
  }
}
