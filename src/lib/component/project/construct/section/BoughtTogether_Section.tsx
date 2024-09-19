"use client";
import { useEffect, useState } from "react";
import { ProductCards_Carousel_1 } from "../carousel/ProductCards_Carousel_1";
import { algoliaRecommendation } from "@/lib/network/repo/client_repos/rest/algolia";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import { getCmsPage } from "@/lib/network/repo/server_repos/gql/cmsPage";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import Cms from "../pageBuilder/Cms";
import { algoliaOptions } from "@/lib/core/basic/Constants";
import SideSheetProducts_Grid from "../grid/SideSheetProducts_Grid";

type Props = {
  storeCode: string;
  productIds: number[];
  isSmallDevice: boolean;
};

export function BoughtTogether_Section({
  storeCode,
  productIds,
  isSmallDevice,
}: Props) {
  const [category, setCategory] = useState<CategoryModel | null>(null);
  const [recommendationCms, setRecommendationCms] = useState<CmsPageModel>();

  async function handleGetRecommendation() {
    // TODO: fix index name in algolia dashbord for english results also
    const recommendation = await algoliaRecommendation({
      params: { storeCode },
      productIds: productIds,
      model: algoliaOptions?.recommendationModels?.boughtTogether,
      indexName: algoliaOptions?.productsIndexAR_price_desc,
    });

    if ((recommendation?.products ?? [])?.length > 0) {
      setCategory(recommendation);
    } else {
      const recommendationCms = await getCmsPage({
        params: {
          storeCode,
        },
        urlIdentifier: "search-product-block",
      });
      setRecommendationCms(recommendationCms?.at(0));
    }
  }

  useEffect(() => {
    handleGetRecommendation();
  }, []);

  // TODO: fix recommendation cms for desktop view
  return (category?.products ?? [])?.length > 0 ? (
    isSmallDevice ? (
      <ProductCards_Carousel_1
        storeCode={storeCode}
        carouselItems={category?.products}
        className="md:hidden"
      />
    ) : (
      <SideSheetProducts_Grid
        products={category?.products}
        className="hidden md:grid"
      />
    )
  ) : (
    <Cms storeCode={storeCode} cms={recommendationCms} />
  );
}
