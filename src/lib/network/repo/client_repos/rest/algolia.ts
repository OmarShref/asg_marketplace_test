import { algoliaOptions } from "@/lib/core/basic/Constants";
import { ClientRestRequest } from "./base-request/ClientRestRequest";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { PageProps } from "@/lib/data/types/PageProps";
import { isArabic } from "@/lib/helper/language";

export interface algoliaProps extends PageProps {
  pageSize?: number;
  page?: number;
  productIds?: number[];
  model?: string;
  threshold?: number;
  maxRecommendations?: number;
  indexName?: string;
}
export async function algoliaTextSearch({
  params,
  pageSize = 20,
  page = 0,
}: algoliaProps) {
  const getSearchFromTextQuery = {
    requests: [
      isArabic(params?.storeCode)
        ? {
            indexName: algoliaOptions?.productsIndexAR,
            params: `query=${params?.searchTerm}&hitsPerPage=${pageSize}&page=${page}`,
          }
        : {
            indexName: algoliaOptions?.productsIndexEN,
            params: `query=${params?.searchTerm}&hitsPerPage=${pageSize}&page=${page}`,
          },
    ],
  };
  const data = await new ClientRestRequest({
    apiUrl: algoliaOptions?.searchApiUrl,
    headers: {
      "Content-Type": "text/plain",
      "X-Algolia-API-Key": algoliaOptions?.apiKey,
      "X-Algolia-Application-Id": algoliaOptions?.appId,
    },
    query: getSearchFromTextQuery,
  }).postRequest();

  const search = new CategoryModel({
    categoryData: data,
    storeCode: useUtilityStore?.getState()?.storeCode,
  }).fromAlgolia();

  return search;
}

export async function algoliaRecommendation({
  model = algoliaOptions?.recommendationModels?.relatedProducts,
  threshold = 30,
  maxRecommendations = 10,
  productIds,
  indexName,
}: algoliaProps) {
  const getSearchFromTextQuery = {
    requests: productIds?.map((productId) => {
      return {
        indexName:
          indexName ??
          (isArabic(useUtilityStore?.getState()?.storeCode)
            ? algoliaOptions?.productsIndexAR
            : algoliaOptions?.productsIndexEN),
        model: model,
        threshold: threshold,
        maxRecommendations: maxRecommendations,
        ...(productId && { objectID: `${productId}` }),
      };
    }),
  };
  const data = await new ClientRestRequest({
    apiUrl: algoliaOptions?.recommendationApiUrl,
    headers: {
      "Content-Type": "text/plain",
      "X-Algolia-API-Key": algoliaOptions?.apiKey,
      "X-Algolia-Application-Id": algoliaOptions?.appId,
    },
    query: getSearchFromTextQuery,
  }).postRequest();

  const recommendation = new CategoryModel({
    categoryData: data,
    storeCode: useUtilityStore?.getState()?.storeCode,
  }).fromAlgolia();

  return recommendation;
}
