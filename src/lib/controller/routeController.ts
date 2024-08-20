import {
  pageTypes,
  targetTypes,
  targetTypesShortHands,
} from "../core/basic/Constants";
import { getResolvedRoute } from "../network/server/gql/resolvedRoute";
import { RouteModel } from "../data/models/RouteModel";
import { ServerReqProps } from "../data/types/ServerReqProps";

export async function getPageType({
  params,
}: ServerReqProps): Promise<RouteModel> {
  // check target with the new route short hands
  const target = params?.route?.at(0);
  if (
    target?.startsWith("m-") ||
    target?.startsWith("c-") ||
    target?.startsWith("p-")
  ) {
    const { targetType, targetId } = getResolvedTarget({ target });
    return { type: targetType, id: Number(targetId) } as RouteModel;
  }

  // check resolved route if above failed as fall back
  if (params?.route?.length === 1 && !params?.route?.at(0)?.endsWith(".html")) {
    return { type: pageTypes.cms, id: 0 } as RouteModel;
  } else {
    const resolvedRoute = await getResolvedRoute({
      params,
    });

    return resolvedRoute;
  }
}

export function getResolvedTarget({ target }: { target: string | undefined }) {
  const splittedTarget = target?.split("-");
  let targetType;

  switch (splittedTarget?.at(0)) {
    case targetTypesShortHands.cms:
      targetType = targetTypes.cms;
      break;

    case targetTypesShortHands.category:
      targetType = targetTypes.category;
      break;

    case targetTypesShortHands.product:
      targetType = targetTypes.product;
      break;

    default:
      targetType = targetTypes.notfound;
  }

  return { targetType, targetId: splittedTarget?.at(1) };
}
