import useUserStore from "@/lib/data/stores/UserStore";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { isArabic } from "@/lib/helper/language";
import { algoliaOptions } from "../basic/Constants";
import { GtmProductType, ProductModel } from "@/lib/data/models/ProductModel";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import { CartModel } from "@/lib/data/models/CartModel";

type DistinctEventDataType = {
  eventName: string;
  eventType: string;
  eventSubtype?: string;
  queryID?: string;
  objectIDs: string[];
  objectData?: {
    price: number;
    discount?: number;
    quantity: number;
  }[];
  positions?: number[];
  value?: number;
  currency?: string;
};

type AlgoliaEventsType = DistinctEventDataType & {
  userToken: string | null;
  authenticatedUserToken?: string | undefined;
  index: string;
};

class AlgoliaEvents {
  #storeCode: string;
  #userToken: string | null;
  #authenticatedUserToken: string | undefined;
  #index: string;

  constructor() {
    this.#storeCode = useUtilityStore?.getState()?.storeCode;
    this.#userToken = useUserStore?.getState()?.anonymousId;
    this.#authenticatedUserToken = useUserStore
      ?.getState()
      ?.customer?.id?.toString();
    this.#index = isArabic(this.#storeCode)
      ? algoliaOptions?.productsIndexAR
      : algoliaOptions?.productsIndexEN;
  }

  async #pushToAlgolia(eventData: DistinctEventDataType) {
    const event: { events: AlgoliaEventsType[] } = {
      events: [
        {
          ...eventData,
          userToken: this.#userToken,
          authenticatedUserToken: this.#authenticatedUserToken,
          index: this.#index,
        },
      ],
    };

    console.log(event);

    fetch("https://insights.algolia.io/1/events", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "X-Algolia-Application-Id": algoliaOptions?.appId,
        "X-Algolia-API-Key": algoliaOptions?.apiKey,
      },
      body: JSON.stringify(event),
    });
  }

  viewedObjectIDs({ category }: { category: CategoryModel }) {
    const eventData = {
      eventName: "Items Viewed",
      eventType: "view",
      objectIDs: category?.products?.map((product) => product?.id?.toString()),
    };

    this.#pushToAlgolia(eventData);
  }

  clickedObjectIDs({ product }: { product: ProductModel }) {
    const eventData: DistinctEventDataType = {
      eventName: "Product Clicked",
      eventType: "click",
      objectIDs: [product?.id?.toString()],
    };

    this.#pushToAlgolia(eventData);
  }

  clickedObjectIDsAfterSearch({
    product,
    queryId,
    index,
  }: {
    product: ProductModel;
    queryId: string;
    index: number;
  }) {
    const eventData: DistinctEventDataType = {
      eventName: "Products Clicked After Search",
      eventType: "click",
      objectIDs: [product?.id?.toString()],
      queryID: queryId,
      positions: [index],
    };

    this.#pushToAlgolia(eventData);
  }

  addToCart({
    product,
    quantity = 1,
  }: {
    product: ProductModel;
    quantity?: number;
  }) {
    const eventData: DistinctEventDataType = {
      eventName: "Products Added to Cart",
      eventType: "conversion",
      eventSubtype: "addToCart",
      objectIDs: [product?.id?.toString()],
      objectData: [
        {
          price: product?.salePrice,
          quantity: quantity,
          ...(product?.discount > 0 && { discount: product?.discount }),
        },
      ],
      value: product?.salePrice * quantity,
      currency: product?.currency?.value,
    };

    this.#pushToAlgolia(eventData);
  }

  purchase({ cart }: { cart: CartModel }) {
    const eventData: DistinctEventDataType = {
      eventName: "Products Purchased",
      eventType: "conversion",
      eventSubtype: "purchase",
      objectIDs: cart?.items?.map((item) => item?.id?.toString()),
      objectData: cart?.items?.map((item) => {
        return {
          price: item?.product?.salePrice,
          quantity: item?.quantity,
          ...(item?.product?.discount > 0 && {
            discount: item?.product?.discount,
          }),
        };
      }),
      value: cart?.grandTotal,
      currency: cart?.currency?.value,
    };

    this.#pushToAlgolia(eventData);
  }
}

const algoliaEventsSingleton = new AlgoliaEvents();

export { algoliaEventsSingleton };
