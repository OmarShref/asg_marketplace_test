"use server";
import { ServerReqProps } from "@/lib/data/types/ServerReqProps";
import { ServerGqlGetRequest } from "./base-request/ServerGqlGetRequest";
import { RouteModel } from "@/lib/data/models/RouteModel";

export async function getResolvedRoute({
  params,
}: ServerReqProps): Promise<RouteModel> {
  const resolvedRouteQuery = `query vestedRoute {
    vestedRoute(filter: { Request_path: { eq: "/${
      params.storeCode
    }/${params.route?.join("/")}" } }) {
        entity_type
        entity_id
    }
}`;

  const data = await new ServerGqlGetRequest({
    storeCode: params.storeCode,
    query: resolvedRouteQuery,
  }).getData();

  const resolvedRoute = new RouteModel(data).create();

  return resolvedRoute;
}
