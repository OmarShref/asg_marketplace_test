interface RouteInterface {
  type: string;
  id: number;
}
export class RouteModel implements RouteInterface {
  type: string;
  id: number;
  constructor(routeData: any) {
    const data = routeData?.data?.vestedRoute;
    this.type = data?.entity_type;
    this.id = data?.entity_id;
  }

  create(): RouteModel {
    return {
      type: this.type,
      id: this.id,
    } as RouteModel;
  }
}
