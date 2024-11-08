import useUserStore from "@/lib/data/stores/UserStore";
import useUtilityStore from "../data/stores/UtilityStore";
import {
  addToWishList,
  getWishListProducts,
  removeFromWishList,
} from "../network/repo/client_repos/gql/customer";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { GtmEvents } from "../core/analytics/Gtm";
import {
  ProductModel,
  VariantOptionType,
  VariantType,
} from "../data/models/ProductModel";
import { baseUrl, productTypes } from "../core/basic/Constants";
import { ConfigurationModel } from "../data/models/ConfigurationModel";
import { addItemToCart } from "../network/repo/client_repos/gql/cart";
import { Texts, getText } from "../assets/text";
import { scrollToId } from "./scrollController";

export async function addOrRemoveWishlistItemController({
  productId,
  addedToWishList,
  router,
}: {
  productId: number;
  addedToWishList: boolean;
  router: AppRouterInstance;
}) {
  if (!useUserStore?.getState()?.customer?.token) {
    router.push(`/${useUtilityStore?.getState()?.storeCode}/account/login`);
  } else {
    if (addedToWishList) {
      const removeFromWishListData = await removeFromWishList(productId);

      const targetProduct = useUserStore
        .getState()
        ?.wishList?.products?.find((product) => product?.id === productId);

      if (removeFromWishListData?.id) {
        const getWishListData = await getWishListProducts(
          removeFromWishListData,
        );

        if (getWishListData?.totalCount >= 0) {
          useUserStore.setState({ wishList: getWishListData });
        }

        if (targetProduct) {
          new GtmEvents({
            gtmProduct: ProductModel?.toGtm(targetProduct),
          })?.removeFromWishlist();
        }
      }
    } else {
      const addToWishListData = await addToWishList(productId);

      if (addToWishListData?.id) {
        const getWishListData = await getWishListProducts(addToWishListData);

        if (getWishListData?.totalCount > 0) {
          useUserStore.setState({ wishList: getWishListData });
        }

        const targetProduct = getWishListData?.products?.find(
          (product) => product?.id === productId,
        );
        if (targetProduct) {
          new GtmEvents({
            gtmProduct: ProductModel?.toGtm(targetProduct),
          })?.addToWishlist();
        }
      }
    }
  }
}

// ===================================================

// TODO: add patern to product structured data
export function getProductStructuredData({
  storeCode,
  configuration,
  product,
  productChildren,
  currentRegionId,
}: {
  storeCode: string;
  configuration: ConfigurationModel;
  product: ProductModel;
  productChildren: ProductModel[];
  currentRegionId: number;
}) {
  const variantsArray = () => {
    const variants: any[] = productChildren?.map((child: ProductModel) => {
      return {
        "@type": "Product",
        sku: child?.sku,
        image: child?.images,
        name: child?.name,
        description: child?.description,
        brand: {
          "@type": "Brand",
          name: child?.brand?.value,
        },
        color: child?.color?.value,
        size: child?.size?.value,
        material: child?.material?.value,
        offers: {
          "@type": "Offer",
          price: child?.regularPrice,
          sale_price: child?.discount > 0 ? child?.salePrice : null,
          priceCurrency: child?.currency?.value,
          priceValidUntil: child?.specialToDate,
          url: `${baseUrl}${child?.url}`,
          itemCondition: "https://schema.org/NewCondition",
          availability: child?.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          hasMerchantReturnPolicy: { "@id": "#return_policy" },
          shippingDetails: { "@id": "#shipping_policy" },
        },
      };
    });

    return variants;
  };

  return product?.type === productTypes?.configurable
    ? [
        {
          "@context": "https://schema.org/",
          "@type": "ProductGroup",
          productGroupID: product?.sku,
          name: product?.name,
          description: product?.description,
          url: `${baseUrl}${product?.url}`,
          variesBy: ["https://schema.org/size", "https://schema.org/color"],
          hasVariant: variantsArray(),
        },
        {
          "@context": "https://schema.org/",
          "@type": "MerchantReturnPolicy",
          "@id": "#return_policy",
          applicableCountry: storeCode.slice(0, 2),
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 10,
          returnMethod: "https://schema.org/ReturnInStore",
          returnFees: "https://schema.org/FreeReturn",
        },
        {
          "@context": "https://schema.org/",
          "@type": "OfferShippingDetails",
          "@id": "#shipping_policy",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: storeCode.includes("sa") ? 29 : null,
            currency: product?.currency?.value,
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: storeCode.slice(0, 2),
            addressRegion:
              configuration?.countryRegions?.availabelRegions?.find(
                (avaliableRegion) =>
                  avaliableRegion?.id?.toString() ===
                  currentRegionId?.toString(),
              )?.code,
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 0,
              maxValue: 1,
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 3,
              maxValue: 5,
              unitCode: "DAY",
            },
          },
        },
      ]
    : {
        "@context": "https://schema.org/",
        "@type": "Product",
        sku: product?.sku,
        image: product?.images,
        name: product?.name,
        description: product?.description,
        brand: {
          "@type": "Brand",
          name: product?.brand?.value,
        },
        color: product?.color?.value,
        size: product?.size?.value,
        material: product?.material?.value,
        offers: {
          "@type": "Offer",
          price: product?.regularPrice,
          sale_price: product?.discount > 0 ? product?.salePrice : null,
          priceCurrency: product?.currency?.value,
          priceValidUntil: product?.specialToDate,
          url: `${baseUrl}${product?.url}`,
          itemCondition: "https://schema.org/NewCondition",
          availability: product?.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: storeCode.slice(0, 2),
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 10,
            returnMethod: "https://schema.org/ReturnInStore",
            returnFees: "https://schema.org/FreeReturn",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: storeCode.includes("sa") ? 29 : null,
              currency: product?.currency?.value,
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: storeCode.slice(0, 2),
              addressRegion:
                configuration?.countryRegions?.availabelRegions?.find(
                  (avaliableRegion) =>
                    avaliableRegion?.id?.toString() ===
                    currentRegionId?.toString(),
                )?.code,
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 1,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 3,
                maxValue: 5,
                unitCode: "DAY",
              },
            },
          },
        },
      };

  // TODO: handle reviews
  // aggregateRating: {
  //   "@type": "AggregateRating",
  //   ratingValue: product?.rating,
  //   reviewCount: product?.reviewCount,
  // },
  // review: {
  //   "@type": "Review",
  //   reviewRating: {
  //     "@type": "Rating",
  //     ratingValue: product?.reviews?.at(0)?.rating,
  //     bestRating: 5,
  //     datePublished: product?.reviews?.at(0)?.date,
  //     reviewBody: product?.reviews?.at(0)?.detail,
  //   },
  //   author: {
  //     "@type": "Person",
  //     name: product?.reviews?.at(0)?.name,
  //   },
  // },
}

// ===================================================

export async function handleAddToCart({
  configurableProduct,
  configurableProductCurrentVariant,
  sizeVariant,
  colorVariant,
  curretSizeVariantOption,
  curretColorVariantOption,
  productCount,
  toast,
}: {
  configurableProduct: ProductModel;
  configurableProductCurrentVariant: ProductModel;
  sizeVariant: VariantType | undefined;
  colorVariant: VariantType | undefined;
  curretSizeVariantOption: VariantOptionType | undefined;
  curretColorVariantOption: VariantOptionType | undefined;
  productCount: number;
  toast: any;
}) {
  const setAddedToCartOpen = useUtilityStore?.getState()?.setAddedToCartOpen;
  const setAddedToCartSuccess =
    useUtilityStore?.getState()?.setAddedToCartSuccess;
  const setAddedToCartProduct =
    useUtilityStore?.getState().setAddedToCartProduct;
  const setAddedToCartRewardPoints =
    useUtilityStore?.getState()?.setAddedToCartRewardPoints;

  if (configurableProductCurrentVariant?.type === productTypes?.simple) {
    setAddedToCartOpen(true);
    setAddedToCartProduct(configurableProduct);

    const addTocartData = await addItemToCart({
      sku: configurableProduct?.sku,
      quantity: productCount,
      productType: productTypes.simple,
      simpleProductId: configurableProductCurrentVariant?.id,
    });

    if (addTocartData?.success) {
      useUserStore.setState({
        cart: addTocartData?.cart,
        checkoutRewardPoints: addTocartData?.checkoutRewardPoints,
      });
      setAddedToCartRewardPoints(addTocartData?.productRewardPoints);
      setAddedToCartSuccess(true);

      const gtmProduct = ProductModel?.toGtm(configurableProduct);

      gtmProduct.quantity = productCount;

      // gtm event
      new GtmEvents({
        gtmProduct: gtmProduct,
      }).addToCart();
    } else {
      toast({
        description: addTocartData?.errorMessage,
        variant: "destructive",
      });
    }
  } else if (
    configurableProductCurrentVariant?.type === productTypes?.configurable
  ) {
    if (!curretColorVariantOption) {
      toast({
        description: getText({
          storeCode: useUtilityStore?.getState()?.storeCode,
          text: Texts?.pleaseChooseColor,
        }),
        variant: "destructive",
      });
      scrollToId({ id: "color-scroll-detector" });
    } else if (!curretSizeVariantOption) {
      toast({
        description: getText({
          storeCode: useUtilityStore?.getState()?.storeCode,
          text: Texts?.pleaseChooseSize,
        }),
        className: " text-center",
        variant: "destructive",
      });
      scrollToId({ id: "size-scroll-detector" });
    } else {
      setAddedToCartOpen(true);
      setAddedToCartProduct(configurableProduct);

      const addTocartData = await addItemToCart({
        sku: configurableProduct?.sku,
        quantity: productCount,
        productType: productTypes.configurable,
        configurableOptions: [
          {
            optionId: sizeVariant?.id ?? 0,
            optionValue: curretSizeVariantOption?.id ?? 0,
          },
          {
            optionId: colorVariant?.id ?? 0,
            optionValue: curretColorVariantOption?.id ?? 0,
          },
        ],
        simpleProductId: configurableProductCurrentVariant?.id,
      });

      if (addTocartData?.success) {
        useUserStore.setState({
          cart: addTocartData?.cart,
          checkoutRewardPoints: addTocartData?.checkoutRewardPoints,
        });
        setAddedToCartRewardPoints(addTocartData?.productRewardPoints);
        setAddedToCartSuccess(true);

        const gtmProduct = ProductModel?.toGtm(configurableProduct);

        gtmProduct.quantity = productCount;

        // gtm event
        new GtmEvents({
          gtmProduct: gtmProduct,
        }).addToCart();
      } else {
        toast({
          description: addTocartData?.errorMessage,
          variant: "destructive",
        });
      }
    }
  }
}
