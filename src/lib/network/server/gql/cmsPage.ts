import { ServerReqProps } from "@/lib/data/types/ServerReqProps";
import { ServerGqlGetRequest } from "./base-request/ServerGqlGetRequest";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import { cleanData } from "@/lib/helper/data";

export async function getCmsPage({
  params,
  urlIdentifier,
  search,
}: ServerReqProps): Promise<CmsPageModel[]> {
  const cmsPageQuery = `{
    vestedCmsPage(
      ${
        urlIdentifier
          ? `filter: { Identifier: { eq: "${urlIdentifier}" } }`
          : ""
      }
      ${search ? `search: "${search}"` : ""}
      ) {
        items {
          page_id
          url
          meta_title
          meta_description
          meta_keywords
          content_heading
          page_builder_json
        }
    }
}`;

  const data = await new ServerGqlGetRequest({
    storeCode: params.storeCode,
    query: cmsPageQuery,
  }).getData();

  const cmsPage: CmsPageModel[] = data?.data?.vestedCmsPage?.items?.map(
    (item: any): CmsPageModel => {
      return new CmsPageModel({
        storeCode: params.storeCode,
        cmsPageData: item,
      }).create();
    },
  );

  return cmsPage;
}
