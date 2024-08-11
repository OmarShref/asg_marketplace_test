import CmsPage from "@/lib/component/project/page/CmsPage";
import CategoryPage from "@/lib/component/project/page/CategoryPage";
import ProductPage from "@/lib/component/project/page/ProductPage";
import { getPageType } from "@/lib/controller/routeController";
import { pageTypes, sortTypes } from "@/lib/core/basic/Constants";
import { PageProps } from "@/lib/data/types/PageProps";
import { getCategory } from "@/lib/network/server/gql/category";
import { getProduct } from "@/lib/network/server/gql/product";
import { notFound } from "next/navigation";
import { getCmsPage } from "@/lib/network/server/gql/cmsPage";
import { getConfiguration } from "@/lib/network/server/gql/configuration";
import { MetaDataModel } from "@/lib/data/models/MetaDataModel";
import { getProductChildren } from "@/lib/network/server/gql/productChildren";
import { getProductStructuredData } from "@/lib/controller/productController";
import { checkSmallDevice } from "@/lib/helper/devicetype";
import { headers } from "next/headers";

export async function generateMetadata({ params, searchParams }: PageProps) {
  const resolvedRoute = await getPageType({ params });
  if (resolvedRoute.type === pageTypes.cms) {
    const [configuration, cms] = await Promise.all([
      getConfiguration({ params }),
      getCmsPage({
        params,
        urlIdentifier: params?.route?.at(0),
      }),
    ]);

    const metaData: MetaDataModel = new MetaDataModel({
      configuration,
      params,
      searchParams,
      cmsPage: cms?.at(0),
    }).fromCmsPage();

    return metaData;
  } else if (resolvedRoute.type === pageTypes.category) {
    const [configuration, category] = await Promise.all([
      getConfiguration({ params }),
      getCategory({
        id: resolvedRoute.id,
        params,
        searchParams,
        sort: sortTypes.merchandising,
      }),
    ]);

    const metaData: MetaDataModel = new MetaDataModel({
      configuration,
      params,
      searchParams,
      category,
    }).fromCategory();

    return metaData;
  } else if (resolvedRoute.type == pageTypes.product) {
    const [configuration, product] = await Promise.all([
      getConfiguration({ params }),
      getProduct({
        id: resolvedRoute.id,
        params,
      }),
    ]);

    const metaData: MetaDataModel = new MetaDataModel({
      configuration,
      params,
      searchParams,
      product,
    }).fromProduct();

    return metaData;
  }
}

export default async function page({ params, searchParams }: PageProps) {
  const resolvedRoute = await getPageType({ params });
  const isSmallDevice = checkSmallDevice(headers());

  if (resolvedRoute.type === pageTypes.cms) {
    const [cms] = await Promise.all([
      getCmsPage({
        params,
        urlIdentifier: params?.route?.at(0),
      }),
    ]);

    if (!cms?.at(0)?.id) {
      notFound();
    }

    return (
      <>
        <CmsPage params={params} searchParams={searchParams} cms={cms?.at(0)} />
      </>
    );
  } else if (resolvedRoute.type === pageTypes.category) {
    const [category] = await Promise.all([
      getCategory({
        id: resolvedRoute.id,
        params,
        searchParams,
        sort: sortTypes.merchandising,
      }),
    ]);

    if (!category?.id) {
      notFound();
    }

    return (
      <>
        <CategoryPage
          params={params}
          searchParams={searchParams}
          category={category}
        />
      </>
    );
  } else if (resolvedRoute.type == pageTypes.product) {
    const [configuration, product, productChildren] = await Promise.all([
      getConfiguration({ params }),
      getProduct({
        id: resolvedRoute.id,
        params,
      }),
      getProductChildren({
        id: resolvedRoute.id,
        params,
      }),
    ]);

    if (!product?.id) {
      notFound();
    }

    return (
      <>
        {/* product structured data */}
        <script
          id="product-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getProductStructuredData({
                storeCode: params.storeCode,
                configuration: configuration,
                product: product,
                productChildren: productChildren,
                currentRegionId: 1108,
              }),
            ),
          }}
        ></script>
        {/* product page */}
        <ProductPage
          params={params}
          searchParams={searchParams}
          configuration={configuration}
          product={product}
          isSmallDevice={isSmallDevice}
        />
      </>
    );
  } else {
    notFound();
  }
}
