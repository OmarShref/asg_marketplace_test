import { GtmCartType } from "@/lib/data/models/CartModel";
import { GtmCategoryType } from "@/lib/data/models/CategoryModel";
import { GtmCustomerType } from "@/lib/data/models/CustomerModel";
import { GtmOrderType } from "@/lib/data/models/OrderModel";
import { GtmProductType } from "@/lib/data/models/ProductModel";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { cleanData } from "@/lib/helper/data";

type EventType = {
  event: string;
  [key: string]: unknown;
};
interface GtmEventsInterface {
  storeCode?: string;
  url?: string | undefined;
  gtmCustomer?: GtmCustomerType | undefined;
  gtmCategory?: GtmCategoryType | undefined;
  gtmProduct?: GtmProductType | undefined;
  gtmCart?: GtmCartType | undefined;
  gtmOrder?: GtmOrderType | undefined;
  errorMessage?: string | undefined;
}
export class GtmEvents implements GtmEventsInterface {
  storeCode?: string;
  url?: string | undefined;
  gtmCustomer?: GtmCustomerType | undefined;
  gtmCategory?: GtmCategoryType | undefined;
  gtmProduct?: GtmProductType | undefined;
  gtmCart?: GtmCartType | undefined;
  gtmOrder?: GtmOrderType | undefined;
  errorMessage?: string | undefined;

  constructor(eventProps: GtmEventsInterface) {
    this.storeCode = useUtilityStore.getState().storeCode;
    this.gtmCustomer = eventProps?.gtmCustomer;
    this.url = eventProps?.url;
    this.gtmCategory = eventProps?.gtmCategory;
    this.gtmProduct = eventProps?.gtmProduct;
    this.gtmCart = eventProps?.gtmCart;
    this.gtmOrder = eventProps?.gtmOrder;
    this.errorMessage = eventProps?.errorMessage;
  }

  #pushToDatalayer(eventData: EventType) {
    const event = cleanData(eventData);
    const spaEventReset: EventType = {
      event: "spa_event_reset",
      ecommerce: null,
    };

    if (typeof window.dataLayer !== "undefined") {
      window.dataLayer.push(event);
      window.dataLayer.push(spaEventReset);
    } else {
      console.error("No data layer", event);
    }
  }

  globalVariables() {
    const eventData = {
      event: "global_variables",
      event_source: "Website",
      store_view: this.storeCode,
      language: this.storeCode?.slice(3),
      country: this.storeCode?.slice(0, 2),
      ...this.gtmCustomer,
    };
    this.#pushToDatalayer(eventData);
  }

  pageview() {
    const eventData = {
      event: "pageview",
      page_type: useUtilityStore.getState().pageType,
      page: this.url,
    };

    this.#pushToDatalayer(eventData);
  }

  login() {
    const eventData = {
      event: "login",
      event_source: "Website",
      store_view: this.storeCode,
      language: this.storeCode?.slice(3),
      country: this.storeCode?.slice(0, 2),
      ...this.gtmCustomer,
    };

    this.#pushToDatalayer(eventData);
  }

  logout() {
    const eventData = {
      event: "logout",
    };

    this.#pushToDatalayer(eventData);
  }

  userUpdate() {
    const eventData = {
      event: "user_update",
      ...this.gtmCustomer,
    };

    this.#pushToDatalayer(eventData);
  }

  viewItemList() {
    const eventData = {
      event: "view_item_list",
      ecommerce: {
        ...this.gtmCategory,
      },
    };

    this.#pushToDatalayer(eventData);
  }

  selectItem() {
    const eventData = {
      event: "select_item",
      ecommerce: {
        currency: this.gtmProduct?.currency,
        value: this.gtmProduct?.price,
        items: [
          {
            ...this.gtmProduct,
          },
        ],
      },
    };

    this.#pushToDatalayer(eventData);
  }

  viewItem() {
    const eventData = {
      event: "view_item",
      ecommerce: {
        currency: this.gtmProduct?.currency,
        value: this.gtmProduct?.price,
        items: [
          {
            ...this.gtmProduct,
          },
        ],
      },
    };

    this.#pushToDatalayer(eventData);
  }

  addToWishlist() {
    const eventData = {
      event: "add_to_wishlist",
      ecommerce: {
        currency: this.gtmProduct?.currency,
        value: this.gtmProduct?.price,
        items: [
          {
            ...this.gtmProduct,
          },
        ],
      },
    };

    this.#pushToDatalayer(eventData);
  }

  removeFromWishlist() {
    const eventData = {
      event: "remove_from_wishlist",
      ecommerce: {
        currency: this.gtmProduct?.currency,
        value: this.gtmProduct?.price,
        items: [
          {
            ...this.gtmProduct,
          },
        ],
      },
    };

    this.#pushToDatalayer(eventData);
  }

  addToCart() {
    const eventData = {
      event: "add_to_cart",
      ecommerce: {
        value: (this.gtmProduct?.price ?? 0) * (this.gtmProduct?.quantity ?? 0),
        currency: this.gtmProduct?.currency,
        items: [
          {
            ...this.gtmProduct,
          },
        ],
      },
    };

    this.#pushToDatalayer(eventData);
  }

  removeFromCart() {
    const eventData = {
      event: "remove_from_cart",
      ecommerce: {
        value: (this.gtmProduct?.price ?? 0) * (this.gtmProduct?.quantity ?? 0),
        currency: this.gtmProduct?.currency,
        items: [
          {
            ...this.gtmProduct,
          },
        ],
      },
    };

    this.#pushToDatalayer(eventData);
  }

  viewCart() {
    const eventData = {
      event: "view_cart",
      ecommerce: {
        ...this.gtmCart,
      },
    };

    this.#pushToDatalayer(eventData);
  }

  beginCheckout() {
    const eventData = {
      event: "begin_checkout",
      ecommerce: {
        ...this.gtmCart,
      },
    };

    this.#pushToDatalayer(eventData);
  }

  addShippiingInfo() {
    const eventData = {
      event: "add_shipping_info",
      ecommerce: {
        ...this.gtmCart,
      },
    };

    this.#pushToDatalayer(eventData);
  }

  addPaymentInfo() {
    const eventData = {
      event: "add_payment_info",
      ecommerce: {
        ...this.gtmCart,
      },
    };

    this.#pushToDatalayer(eventData);
  }

  paymentFailuer() {
    const eventData = {
      event: "payment_failure",
      failure_reason: this.errorMessage,
      ecommerce: {
        ...this.gtmCart,
      },
    };

    this.#pushToDatalayer(eventData);
  }

  purchase() {
    const eventData = {
      event: "purchase",
      ecommerce: {
        ...this.gtmOrder,
        ...this.gtmCart,
      },
    };

    this.#pushToDatalayer(eventData);
  }
}

// export class GTMEvents {
//   #trackedError = "";
//   #url = "";

//   constructor(initData: any) {
//     this.#trackedError = initData?.trackedError;
//     this.#url = initData?.url;
//   }

//   #pushToDatalayer(event: any) {
//     const spaEventReset = {
//       event: "spa_event_reset",
//       ecommerce: null,
//     };
//     if (typeof window.dataLayer !== "undefined") {
//       window.dataLayer.push(event);
//       window.dataLayer.push(spaEventReset);
//     } else {
//       console.error("No data layer", event);
//     }
//   }

//   // TODO: handle page type as this in production to make it right
//   #getPageType(url: string) {
//     if (url.includes(".html")) {
//       return "product/category";
//     } else if (url.includes("/cart")) {
//       return "cart";
//     } else if (url.includes("/checkout/")) {
//       return "checkout";
//     } else if (url.includes("/account")) {
//       return "account";
//     } else if (url.includes("/menu")) {
//       return "menu";
//     } else if (url.includes("/search/")) {
//       return "search";
//     } else {
//       return "landing/static";
//     }
//   }

//   trackedError() {
//     const eventData = {
//       event: "tracked_error",
//       error_url: this.#url,
//       error_message: this.#trackedError,
//     };

//     this.#pushToDatalayer(eventData);
//   }
// }
