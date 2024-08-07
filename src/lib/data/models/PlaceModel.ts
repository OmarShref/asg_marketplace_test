export interface PlaceInterface {
  id?: number;
  code: string;
  name: string;
  flag?: string;
  prefix?: string;
}

export class PlaceModel implements PlaceInterface {
  #placeData: any;

  id?: number = 0;
  code: string = "";
  name: string = "";
  flag?: string = "";
  prefix?: string = "";

  constructor(placeData: any) {
    this.#placeData = placeData;
  }

  fromCountry() {
    this.code = this.#placeData?.code;
    this.name = this.#placeData?.name;
    this.flag = this.#placeData?.flag;
    this.prefix = this.#placeData?.phone || "no-prefix";

    return this;
  }

  fromRegion() {
    this.id = this.#placeData?.region_id;
    this.code = this.#placeData?.region_code;
    this.name = this.#placeData?.region_name;

    return this;
  }

  fromCity() {
    this.code = this.#placeData?.city_code;
    this.name = this.#placeData?.city_name;

    return this;
  }
}
