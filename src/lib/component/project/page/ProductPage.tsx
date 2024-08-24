"use client";
import { useEffect, useRef, useState } from "react";
import Addtowishlist_Btn from "../part/button/Addtowhishlist_Btn";
import Shareproduct_Btn from "../part/button/Shareproduct_Btn";
import PageType from "../../generic/utility/PageType";
import {
  baseUrl,
  pageTypes,
  productLabelTypes,
  productTypes,
} from "@/lib/core/basic/Constants";
import { ProductImages_Carousel_1 } from "../construct/carousel/ProductImages_Carousel_1";
import { PageProps } from "@/lib/data/types/PageProps";
import {
  ProductModel,
  VariantOptionType,
  VariantType,
} from "@/lib/data/models/ProductModel";
import DiscountLabel from "../part/label/Discount_Label";
import {
  Product,
  ProductImages,
  ProductName,
  ProductPrice,
  ProductRatingSummary,
  ProductSection,
  // ProductVariant,
  // ProductVariantHeader,
  // ProductVariantOption,
  // ProductVariantOptions,
  // ProductVariantTitle,
  // ProductVariants,
} from "../../generic/pure/product";
import Stars_Bar from "../construct/bar/Stars_Bar";
import Spacing from "../../generic/pure/spacing";
import { Texts, getText } from "@/lib/assets/text";
// import RecentlyBoughtLabel from "../part/label/RecentlyBought_Label";
// import Image from "../../generic/pure/image";
import { Separator } from "../../generic/ui/separator";
import TamaraWidget from "../construct/widget/Tamara_Widget";
// import AvailableInStore_Label from "../part/label/AvailableInStore_Label";
import TabbyWidget from "../construct/widget/Tabby_Widget";
// import FreeReturn_Label from "../part/label/FreeReturn_Label";
// import { ProductDescriptionAccordion } from "../construct/accordion/ProductDescription_Accordion";
import { ProductReviewAccordion } from "../construct/accordion/ProductReview_Accordion";
import { ReviewCount, ReviewRatingNumber } from "../../generic/pure/review";
import { RelatedProductsAccordion } from "../construct/accordion/RelatedProducts_Accordion";
import Addtocart_Btn_2 from "../part/button/AddToCart_Btn_2";
// import { ScrollDetector } from "../../generic/pure/scroll";
import { getProduct } from "@/lib/network/server/gql/product";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import { addItemToCart } from "@/lib/network/client/gql/cart";
import useUserStore from "@/lib/data/stores/UserStore";
import { CartModel } from "@/lib/data/models/CartModel";
import { useRouter } from "next/navigation";
// import { ProductAdditionalInfo_Accordion } from "../construct/accordion/ProductAdditionalInfo_Accordion";
import { share } from "@/lib/helper/share";
import ProductShipping_Bar from "../construct/bar/ProductShipping_Bar";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { ConfigurationModel } from "@/lib/data/models/ConfigurationModel";
import Timer_1 from "../part/timer/Timer_1";
import { useToast } from "../../generic/ui/use-toast";
import { scrollToId } from "@/lib/controller/scrollController";
import { ProductImages_Carousel_2 } from "../construct/carousel/ProductImages_Carousel_2";
import DynamicProduct_Label from "../part/label/DynamicProduct_Label";
import { algoliaEventsSingleton } from "@/lib/core/analytics/Algolia";
import { RewardPointsModel } from "@/lib/data/models/RewardPointsModel";
import Page_Transition from "../part/transition/Page_Transition";
import LeftInStock_Label from "../part/label/LeftInStock_Label";
import dynamic from "next/dynamic";
import ProductOverview_Section from "../construct/section/ProductOverview_Section";
import Description_Table from "../construct/table/Description_Table";
// const Sizes_Drawer = dynamic(() => import("../construct/drawer/Sizes_Drawer"));
// const SizeGuide_Drawer = dynamic(
//   () => import("../construct/drawer/SizeGuide_Drawer"),
// );
const AddedToCart_Drawer = dynamic(
  () => import("../construct/drawer/AddedToCart_Drawer"),
);
// const Sizes_Select = dynamic(() => import("../construct/select/Sizes_Select"));
// const SizeGiude_Sheet = dynamic(
//   () => import("../construct/sheet/SizeGiude_Sheet"),
// );
const AddedToCart_Sheet = dynamic(
  () => import("../construct/sheet/AddedToCart_Sheet"),
);

interface Props extends PageProps {
  configuration: ConfigurationModel;
  product: ProductModel;
  isSmallDevice: boolean;
}

// TODO: split more to outer components
export default function ProductPage({
  params,
  configuration,
  product,
  isSmallDevice = true,
}: Props) {
  const router = useRouter();

  const { toast } = useToast();

  const successSoundRef = useRef<HTMLAudioElement>(null);

  // ===========================================================

  // redirect to parent product
  useEffect(() => {
    if (product?.type === productTypes?.simple) {
      router?.replace(product?.parentUrl);
    }
  }, []);

  // ===========================================================

  const { cart } = useUserStore((state) => state);
  const [cartState, setCartState] = useState<CartModel | null>();
  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  const [addedToCartOpen, setAddedToCartOpen] = useState(false);

  const [addedToCartSuccess, setAddedToCartSuccess] = useState(false);

  const [productCount, setProductCount] = useState<number>(1);

  // ===========================================================

  const [configurableProduct, setConfigurableProduct] =
    useState<ProductModel>(product);
  const [
    configurableProductCurrentVariant,
    setConfigurableProductCurrentVariant,
  ] = useState<ProductModel>(
    configurableProduct?.currentVariant ?? configurableProduct,
  );
  useEffect(() => {
    setConfigurableProductCurrentVariant(
      configurableProduct?.currentVariant ?? configurableProduct,
    );
  }, [configurableProduct]);

  // ===========================================================

  const [sizeVariant, setSizeVariant] = useState<VariantType | undefined>(
    product?.variants?.find((variant) => variant?.code === "size"),
  );
  const [curretSizeVariantOption, setCurretSizeVariantOption] = useState<
    VariantOptionType | undefined
  >();
  const [colorVariant, setColorVariant] = useState<VariantType | undefined>(
    product?.variants?.find((variant) => variant?.code === "color"),
  );
  const [curretColorVariantOption, setCurretColorVariantOption] = useState<
    VariantOptionType | undefined
  >(
    colorVariant?.options?.length === 1
      ? colorVariant?.options?.at(0)
      : undefined,
  );

  function handleVariantChange() {
    if (curretColorVariantOption && curretSizeVariantOption) {
      getProduct({
        params: params,
        id: product.id,
        configurableProductUIds: [
          curretSizeVariantOption?.uId ??
            sizeVariant?.options?.at(0)?.uId ??
            "",
          curretColorVariantOption?.uId ?? "",
        ],
      }).then((configurableProduct) => {
        if (!!configurableProduct?.id && !!configurableProduct?.sku) {
          setConfigurableProduct(configurableProduct);
          setSizeVariant(
            configurableProduct?.variants?.find(
              (variant) => variant?.code === "size",
            ),
          );
          setColorVariant(
            configurableProduct?.variants?.find(
              (variant) => variant?.code === "color",
            ),
          );
        }

        // TODO: fix routing issues
        if (curretColorVariantOption && curretSizeVariantOption) {
          // router?.push(configurableProduct?.currentVariant?.url ?? "", {
          //   scroll: false,
          // });
        }
      });
    }
  }
  useEffect(() => {
    handleVariantChange();
  }, [curretSizeVariantOption, curretColorVariantOption]);

  // ===========================================================

  const [productRewardPoints, setProductRewardPoints] = useState<
    RewardPointsModel | undefined
  >(undefined);

  // ===========================================================

  async function handleAddToCart() {
    if (configurableProductCurrentVariant?.type === productTypes?.simple) {
      setAddedToCartOpen(true);
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
        setProductRewardPoints(addTocartData?.productRewardPoints);
        setAddedToCartSuccess(true);
        successSoundRef?.current?.play();

        const gtmProduct = ProductModel?.toGtm(configurableProduct);

        gtmProduct.quantity = productCount;

        // gtm event
        new GtmEvents({
          gtmProduct: gtmProduct,
        }).addToCart();

        // algolia event
        algoliaEventsSingleton?.addToCart({
          product: configurableProductCurrentVariant,
          quantity: productCount,
        });
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
            storeCode: params?.storeCode,
            text: Texts?.pleaseChooseColor,
          }),
          variant: "destructive",
        });
        scrollToId({ id: "color-scroll-detector" });
      } else if (!curretSizeVariantOption) {
        toast({
          description: getText({
            storeCode: params?.storeCode,
            text: Texts?.pleaseChooseSize,
          }),
          className: " text-center",
          variant: "destructive",
        });
        scrollToId({ id: "size-scroll-detector" });
      } else {
        setAddedToCartOpen(true);
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
          setProductRewardPoints(addTocartData?.productRewardPoints);
          setAddedToCartSuccess(true);
          successSoundRef?.current?.play();

          const gtmProduct = ProductModel?.toGtm(configurableProduct);

          gtmProduct.quantity = productCount;

          // gtm event
          new GtmEvents({
            gtmProduct: gtmProduct,
          }).addToCart();

          // algolia event
          algoliaEventsSingleton?.addToCart({
            product: configurableProductCurrentVariant,
            quantity: productCount,
          });
        } else {
          toast({
            description: addTocartData?.errorMessage,
            variant: "destructive",
          });
        }
      }
    }
  }

  // ============================================================

  useEffect(() => {
    new GtmEvents({
      gtmProduct: ProductModel?.toGtm(configurableProduct),
    }).viewItem();
  }, [configurableProduct]);

  // ============================================================

  const productLabel = useRef(
    product?.labels?.find(
      (label) => label?.type === productLabelTypes?.product,
    ),
  );

  return (
    <Page_Transition>
      {isSmallDevice ? (
        <Product className=" md:hidden">
          <LeftInStock_Label
            storeCode={params?.storeCode}
            quantity={configurableProductCurrentVariant?.quantity}
          />
          <section
            id="mobile-product-images"
            className=" duration-400 relative aspect-square transition-all ease-in-out"
          >
            <ProductImages className=" h-full">
              <ProductImages_Carousel_1
                storeCode={params.storeCode}
                images={configurableProductCurrentVariant?.images}
                productName={configurableProductCurrentVariant?.name}
              />
              <div className=" absolute end-6 top-6 flex flex-col gap-3">
                <Addtowishlist_Btn productId={product?.id} className="" />
                <Shareproduct_Btn
                  className=""
                  onClick={() => {
                    share(
                      `${baseUrl}${
                        product?.parentUrl?.length > 1
                          ? product?.parentUrl
                          : product?.url
                      }`,
                    );
                  }}
                />
              </div>
              <DiscountLabel
                value={configurableProductCurrentVariant?.discountPercentage}
                className=" absolute bottom-[11%] start-0 pl-3 text-2xl"
              />
              <Timer_1
                specialToDate={configurableProductCurrentVariant?.specialToDate}
                className=" absolute bottom-[4%] start-0 rounded-r-none "
              />
              <DynamicProduct_Label label={productLabel?.current} />
            </ProductImages>
          </section>
          <section className=" relative z-10  rounded-t-2xl bg-background p-5 shadow-navbar">
            <ProductName>{configurableProductCurrentVariant?.name}</ProductName>
            <Spacing value={2} />
            <ProductPrice className=" flex items-center justify-start gap-3">
              <p
                className={
                  configurableProductCurrentVariant?.discount > 0
                    ? ` text-xs font-light line-through `
                    : ` text-2xl font-semibold`
                }
              >
                {`${configurableProductCurrentVariant?.regularPrice} ${configurableProductCurrentVariant?.currency?.label}`}
              </p>
              {configurableProductCurrentVariant?.discount > 0 && (
                <p className="text-2xl font-semibold">{`${configurableProductCurrentVariant?.salePrice} ${configurableProductCurrentVariant?.currency?.label}`}</p>
              )}
            </ProductPrice>
            <Spacing value={4} />

            {/* =================================== */}

            {/* product variants */}
            {/* <div className=" block">
              <ScrollDetector id="color-scroll-detector" />
              {(colorVariant?.options?.length ?? 0) > 1 && (
                <>
                  <ProductVariant className="">
                    <ProductVariantHeader>
                      <ProductVariantTitle>
                        {getText({
                          storeCode: params.storeCode,
                          text: Texts.chooseColor,
                        })}
                      </ProductVariantTitle>
                    </ProductVariantHeader>
                    <Spacing value={3} />
                    <ProductVariantOptions>
                      {colorVariant?.options?.map((option, index) => {
                        return (
                          <ProductVariantOption
                            key={index}
                            variant={"color_swatch"}
                            style={{
                              backgroundColor: option?.swatchValue,
                              backgroundImage: option?.swatchValue
                                ? `url(${option?.swatchValue})`
                                : "",
                            }}
                            className={`${
                              curretColorVariantOption?.uId === option?.uId
                                ? " shadow-color_swatch"
                                : ""
                            }`}
                            onClick={() => {
                              setCurretColorVariantOption(option);
                            }}
                            disabled={!option?.isAvailabel}
                          ></ProductVariantOption>
                        );
                      })}
                    </ProductVariantOptions>
                  </ProductVariant>
                  <Spacing value={3} />
                </>
              )}
              <ScrollDetector id="size-scroll-detector" />
              <ProductVariant className="">
                <ProductVariantHeader className=" flex items-center justify-start gap-1">
                  <ProductVariantTitle>
                    {getText({
                      storeCode: params.storeCode,
                      text: Texts.chooseSize,
                    })}
                  </ProductVariantTitle>
                </ProductVariantHeader>
                <Spacing value={3} />
                <section className=" flex items-stretch justify-between gap-3">
                  <Sizes_Drawer
                    storeCode={params.storeCode}
                    sizeVariant={sizeVariant}
                    curretSizeVariantOption={curretSizeVariantOption}
                    setCurretSizeVariantOption={setCurretSizeVariantOption}
                  />
                  <SizeGuide_Drawer storeCode={params.storeCode} />
                </section>
              </ProductVariant>
            </div> */}

            {/* =================================== */}

            {/* <Spacing value={3} /> */}
            <ProductSection className=" flex items-center justify-between">
              <ProductSection className=" flex-1">
                {product?.reviewCount >= 5 && (
                  <>
                    <ProductRatingSummary className=" flex items-center justify-start gap-2">
                      <Stars_Bar
                        rating={configurableProductCurrentVariant?.rating}
                      />
                      <ReviewRatingNumber className=" text-xs text-sub_secondry_text">{`${Number(
                        configurableProductCurrentVariant?.rating,
                      ).toFixed(1)}`}</ReviewRatingNumber>
                      <ReviewCount className=" text-xs text-positive_text">{`(${configurableProductCurrentVariant?.reviewCount} ${getText(
                        {
                          storeCode: params.storeCode,
                          text: Texts.reviewes,
                        },
                      )})`}</ReviewCount>
                    </ProductRatingSummary>
                    <Spacing value={3} />
                  </>
                )}
              </ProductSection>
            </ProductSection>

            {/* =================================== */}

            <Description_Table
              description={configurableProductCurrentVariant?.shortDescription}
            />
            <Spacing value={4} />
            {/* =================================== */}

            <Separator />
            {configuration?.installments?.tamaraAllow && (
              <>
                <Spacing value={5} />
                <TamaraWidget
                  storeCode={params.storeCode}
                  tamaraData={
                    configurableProductCurrentVariant?.paymentMethods.tamara
                  }
                  allow={configuration?.installments?.tamaraAllow}
                />
                <Spacing value={5} />
                <Separator />
              </>
            )}
            {configuration?.installments?.tabbyAllow && (
              <>
                <Spacing value={5} />
                <TabbyWidget
                  storeCode={params.storeCode}
                  tabbyData={
                    configurableProductCurrentVariant?.paymentMethods.tabby
                  }
                  allow={configuration?.installments?.tabbyAllow}
                />
                <Spacing value={5} />
                <Separator />
              </>
            )}
            <Spacing value={5} />
            <ProductShipping_Bar
              storeCode={params.storeCode}
              regions={configuration?.countryRegions}
              shippingInfo={configuration?.shippingInfo}
            />
            <Spacing value={5} />
            <Separator />
            <Spacing value={3} />
            <ProductOverview_Section
              storeCode={params.storeCode}
              longDescription={configurableProductCurrentVariant?.description}
              attributes={configurableProductCurrentVariant?.attributes}
            />
            <Spacing value={3} />
            <ProductReviewAccordion
              storeCode={params.storeCode}
              rating={configurableProductCurrentVariant?.rating}
              reviewCount={configurableProductCurrentVariant?.reviewCount}
              reviews={configurableProductCurrentVariant?.reviews}
            />
            <Spacing value={3} />
            <RelatedProductsAccordion
              storeCode={params.storeCode}
              productIds={[product?.id]}
            />
            <Spacing value={24} />
          </section>
          <Addtocart_Btn_2
            storeCode={params.storeCode}
            inStock={configurableProductCurrentVariant?.inStock}
            productCount={productCount}
            setProductCount={setProductCount}
            disabled={!configurableProductCurrentVariant?.inStock}
            onClick={handleAddToCart}
          />
          <AddedToCart_Drawer
            storeCode={params.storeCode}
            open={addedToCartOpen}
            setOpen={setAddedToCartOpen}
            addedtoCartSuccess={addedToCartSuccess}
            setAddedtoCartSuccess={setAddedToCartSuccess}
            productIds={[product?.id]}
            productRewardPoints={productRewardPoints}
          />
          <audio
            id="audio"
            src="/sound/sound.mp3"
            ref={successSoundRef}
          ></audio>
          <PageType pageType={pageTypes.product} />
          <HeaderOptions
            headerOptions={{
              showHeader: true,
              withBackButton: true,
              withLogo: true,
              withSearch: true,
              searchExpanded: false,
              withBurgerButton: true,
              withWishlist: true,
            }}
          />
          <NavbarOptions navbarOptions={{ showNavbar: false }} />
        </Product>
      ) : (
        <Product className=" relative mx-auto hidden max-w-project md:block">
          <LeftInStock_Label
            storeCode={params?.storeCode}
            quantity={configurableProductCurrentVariant?.quantity}
          />
          <ProductSection className=" relative flex items-start justify-start gap-5">
            <section className=" sticky top-[140px] aspect-auto basis-7/12">
              <Spacing value={8} />
              <ProductImages className=" relative h-full">
                <ProductImages_Carousel_2
                  storeCode={params.storeCode}
                  images={configurableProductCurrentVariant?.images}
                  product={configurableProductCurrentVariant}
                />
                <DynamicProduct_Label label={productLabel?.current} />
              </ProductImages>
            </section>
            <section className=" relative z-10 basis-5/12 px-5">
              <Spacing value={6} />
              <ProductName>
                {configurableProductCurrentVariant?.name}
              </ProductName>
              <Spacing value={3} />
              <ProductPrice className=" flex items-center justify-start gap-3">
                <p
                  className={
                    configurableProductCurrentVariant?.discount > 0
                      ? ` text-xs font-light line-through `
                      : ` text-2xl font-semibold`
                  }
                >
                  {`${configurableProductCurrentVariant?.regularPrice} ${configurableProductCurrentVariant?.currency?.label}`}
                </p>
                {configurableProductCurrentVariant?.discount > 0 && (
                  <p className="text-2xl font-semibold">{`${configurableProductCurrentVariant?.salePrice} ${configurableProductCurrentVariant?.currency?.label}`}</p>
                )}
              </ProductPrice>
              <Spacing value={3} />
              <ProductSection className=" flex items-center justify-between">
                <ProductSection className=" flex-1">
                  {product?.reviewCount >= 5 && (
                    <>
                      <ProductRatingSummary className=" flex items-center justify-start gap-2">
                        <Stars_Bar
                          rating={configurableProductCurrentVariant?.rating}
                        />
                        <ReviewRatingNumber className=" text-xs text-sub_secondry_text">{`${Number(
                          configurableProductCurrentVariant?.rating,
                        ).toFixed(1)}`}</ReviewRatingNumber>
                        <ReviewCount className=" text-xs text-positive_text">{`(${configurableProductCurrentVariant?.reviewCount} ${getText(
                          {
                            storeCode: params.storeCode,
                            text: Texts.reviewes,
                          },
                        )})`}</ReviewCount>
                      </ProductRatingSummary>
                      <Spacing value={3} />
                    </>
                  )}
                </ProductSection>
              </ProductSection>
              <Description_Table
                description={
                  configurableProductCurrentVariant?.shortDescription
                }
              />
              <Spacing value={3} />
              {/* product variants */}
              {/* <section className=" block">
                <ScrollDetector id="color-scroll-detector" />
                {(colorVariant?.options?.length ?? 0) > 1 && (
                  <>
                    <ProductVariant className="">
                      <ProductVariantHeader>
                        <ProductVariantTitle>
                          {getText({
                            storeCode: params.storeCode,
                            text: Texts.chooseColor,
                          })}
                        </ProductVariantTitle>
                      </ProductVariantHeader>
                      <Spacing value={3} />
                      <ProductVariantOptions>
                        {colorVariant?.options?.map((option, index) => {
                          return (
                            <ProductVariantOption
                              key={index}
                              variant={"color_swatch"}
                              style={{
                                backgroundColor: option?.swatchValue,
                                backgroundImage: option?.swatchValue
                                  ? `url(${option?.swatchValue})`
                                  : "",
                              }}
                              className={`${
                                curretColorVariantOption?.uId === option?.uId
                                  ? " shadow-color_swatch"
                                  : ""
                              }`}
                              onClick={() => {
                                setCurretColorVariantOption(option);
                              }}
                              disabled={!option?.isAvailabel}
                            ></ProductVariantOption>
                          );
                        })}
                      </ProductVariantOptions>
                    </ProductVariant>
                    <Spacing value={3} />
                  </>
                )}
                <ScrollDetector id="size-scroll-detector" />
                <ProductVariant className="">
                  <ProductVariantHeader className=" flex items-center justify-start gap-1">
                    <ProductVariantTitle>
                      {getText({
                        storeCode: params.storeCode,
                        text: Texts.chooseSize,
                      })}
                    </ProductVariantTitle>
                  </ProductVariantHeader>
                  <Spacing value={3} />
                  <section className=" flex items-stretch justify-between gap-3">
                    <Sizes_Select
                      storeCode={params.storeCode}
                      sizeVariant={sizeVariant}
                      curretSizeVariantOption={curretSizeVariantOption}
                      setCurretSizeVariantOption={setCurretSizeVariantOption}
                      className=" w-full"
                    />

                    <SizeGiude_Sheet storeCode={params.storeCode} />
                  </section>
                </ProductVariant>
              </section> */}
              {configuration?.installments?.tamaraAllow && (
                <>
                  <Spacing value={4} />
                  <TamaraWidget
                    storeCode={params.storeCode}
                    tamaraData={
                      configurableProductCurrentVariant?.paymentMethods.tamara
                    }
                    allow={configuration?.installments?.tamaraAllow}
                    className=" max-w-md rounded-xl border border-accent p-3"
                  />
                </>
              )}
              {configuration?.installments?.tabbyAllow && (
                <>
                  <Spacing value={4} />
                  <TabbyWidget
                    storeCode={params.storeCode}
                    tabbyData={
                      configurableProductCurrentVariant?.paymentMethods.tabby
                    }
                    allow={configuration?.installments?.tabbyAllow}
                    className=" max-w-md rounded-xl border border-accent p-3"
                  />
                </>
              )}
              <Spacing value={4} />
              <ProductShipping_Bar
                storeCode={params.storeCode}
                regions={configuration?.countryRegions}
                shippingInfo={configuration?.shippingInfo}
              />
              <Spacing value={4} />
              <Addtocart_Btn_2
                storeCode={params.storeCode}
                inStock={configurableProductCurrentVariant?.inStock}
                productCount={productCount}
                setProductCount={setProductCount}
                disabled={!configurableProductCurrentVariant?.inStock}
                onClick={handleAddToCart}
                className=" relative bg-background"
              />
            </section>
          </ProductSection>

          {/* ================================================================================================================== */}

          <ProductSection className=" w-full">
            <Spacing value={8} />
            <ProductOverview_Section
              storeCode={params.storeCode}
              longDescription={configurableProductCurrentVariant?.description}
              attributes={configurableProductCurrentVariant?.attributes}
            />
            <Spacing value={3} />
            <ProductReviewAccordion
              storeCode={params.storeCode}
              rating={configurableProductCurrentVariant?.rating}
              reviewCount={configurableProductCurrentVariant?.reviewCount}
              reviews={configurableProductCurrentVariant?.reviews}
            />
            <Spacing value={3} />
            <RelatedProductsAccordion
              storeCode={params.storeCode}
              productIds={[product?.id]}
            />
          </ProductSection>
          <AddedToCart_Sheet
            storeCode={params.storeCode}
            open={addedToCartOpen}
            setOpen={setAddedToCartOpen}
            addedtoCartSuccess={addedToCartSuccess}
            setAddedtoCartSuccess={setAddedToCartSuccess}
            productIds={[product?.id]}
            productRewardPoints={productRewardPoints}
          />
          <audio
            id="audio"
            src="/sound/sound.mp3"
            ref={successSoundRef}
          ></audio>
          <PageType pageType={pageTypes.product} />
        </Product>
      )}
    </Page_Transition>
  );
}
