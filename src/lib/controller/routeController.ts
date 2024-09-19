"use server";
import { targetTypes, targetTypesShortHands } from "../core/basic/Constants";
import { getResolvedRoute } from "../network/repo/server_repos/gql/resolvedRoute";
import { RouteModel } from "../data/models/RouteModel";
import { ServerReqProps } from "../data/types/ServerReqProps";
import { permanentRedirect } from "next/navigation";

export async function getPageType({
  params,
}: ServerReqProps): Promise<RouteModel | undefined> {
  const target = params?.route?.at(0);

  // check target is resolved in the url already
  if (isTargetResolved({ target })) {
    const resolvedRoute = getResolvedTarget({ target });
    return resolvedRoute;
  }

  // resolve route if above failed as fall back
  const unresolvedRoute = await getUnresolvedTarget({ params });

  const unresolvedRouteShortHand =
    targetTypesShortHands?.[unresolvedRoute?.type];
  const unresolvedRouteId = unresolvedRoute?.id;

  if (
    !!unresolvedRouteShortHand &&
    !!unresolvedRouteId &&
    !isTargetResolved({ target })
  ) {
    const newRoute = `/${params?.storeCode}/${unresolvedRouteShortHand}-${unresolvedRouteId}/${params?.route?.join("/")}`;
    permanentRedirect(newRoute);
  }
}

function isTargetResolved({ target }: { target: string | undefined }) {
  return !!(
    target?.startsWith("m-") ||
    target?.startsWith("c-") ||
    target?.startsWith("p-")
  );
}

function getResolvedTarget({ target }: { target: string | undefined }) {
  const splittedTarget = target?.split("-");

  const targetShortHand = splittedTarget?.at(0);
  let type;

  switch (targetShortHand) {
    case targetTypesShortHands["cms-page"]:
      type = targetTypes.cms;
      break;

    case targetTypesShortHands.category:
      type = targetTypes.category;
      break;

    case targetTypesShortHands.product:
      type = targetTypes.product;
      break;

    default:
      type = targetTypes.notfound;
  }

  return { type, id: Number(splittedTarget?.at(1)) } as RouteModel;
}

async function getUnresolvedTarget({
  params,
}: ServerReqProps): Promise<RouteModel> {
  const resolvedRoute = await getResolvedRoute({
    params,
  });

  return resolvedRoute as RouteModel;
}
