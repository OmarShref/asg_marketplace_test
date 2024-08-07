"use client";
import { useEffect, useState } from "react";
import { ProductCards_Carousel_1 } from "./ProductCards_Carousel_1";
import { algoliaRecommendation } from "@/lib/network/client/rest/algolia";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import { getCmsPage } from "@/lib/network/server/gql/cmsPage";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import Cms from "../pageBuilder/Cms";
import { algoliaOptions } from "@/lib/core/basic/Constants";

type Props = {
  storeCode: string;
  productIds: number[];
};

export default function TrendingItems_Carousel({
  storeCode,
  productIds,
}: Props) {
  const [category, setCategory] = useState<CategoryModel | null>(null);
  const [recommendationCms, setRecommendationCms] = useState<CmsPageModel>();

  async function handleGetRecommendation() {
    const recommendation = await algoliaRecommendation({
      params: { storeCode },
      productIds: [0],
      model: algoliaOptions?.recommendationModels?.trendingItems,
      indexName: algoliaOptions?.productsIndexAR_price_asc,
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

  return (category?.products ?? [])?.length > 0 ? (
    <ProductCards_Carousel_1
      storeCode={storeCode}
      carouselItems={category?.products}
    />
  ) : (
    <Cms storeCode={storeCode} cms={recommendationCms} />
  );
}
