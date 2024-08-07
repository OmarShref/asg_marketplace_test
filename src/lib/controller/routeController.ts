import { pageTypes } from "../core/basic/Constants";
import { getResolvedRoute } from "../network/server/gql/resolvedRoute";
import { RouteModel } from "../data/models/RouteModel";
import { ServerReqProps } from "../data/types/ServerReqProps";

export async function getPageType({
  params,
}: ServerReqProps): Promise<RouteModel> {
  if (params?.route?.length === 1 && !params?.route?.at(0)?.endsWith(".html")) {
    return { type: pageTypes.cms, id: 0 } as RouteModel;
  } else {
    const resolvedRoute = await getResolvedRoute({
      params,
    });

    return resolvedRoute;
  }
}
