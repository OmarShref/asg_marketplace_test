export type GiftWrapType = {
  id: string;
  name: string;
  arabicName: string;
  image: string;
  price: string;
};
interface GiftWrapInterface {
  items: GiftWrapType[];
}

export class GiftWrapModel implements GiftWrapInterface {
  items: GiftWrapType[];

  constructor({ giftWrapData }: { giftWrapData: any }) {
    this.items = giftWrapData?.map((item: any): GiftWrapType => {
      return {
        id: item?.id,
        name: item?.name,
        arabicName: item?.name_ar,
        image: item?.image,
        price: item?.price,
      };
    });
  }
}
