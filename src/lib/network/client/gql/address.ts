import { PlaceModel } from "@/lib/data/models/PlaceModel";
import { ClientGqlRequest } from "./base-request/ClientGqlRequest";

type AddressRequestProps = {
  countryCode?: string;
  regionId?: number;
};

export async function getAddressCountries(): Promise<PlaceModel[]> {
  const getAddressCountriesQuery = `{
    addressCountries {
        code
        name
        flag
        phone
    }
}`;

  const data = await new ClientGqlRequest({
    query: getAddressCountriesQuery,
  }).getRequest();

  const addressCountries = data?.data?.addressCountries?.map(
    (country: any): PlaceModel => {
      return new PlaceModel(country)?.fromCountry();
    },
  );

  return addressCountries;
}

export async function getAddressyRegions({
  countryCode,
}: AddressRequestProps): Promise<PlaceModel[]> {
  const getAddressRegionsQuery = `
    query addressRegions {
        addressRegions(countryCode: "${countryCode}") {
            region_id
            region_code
            region_name
        }
    }
  `;

  const data = await new ClientGqlRequest({
    query: getAddressRegionsQuery,
  }).getRequest();

  const addressRegions = data?.data?.addressRegions?.map(
    (region: any): PlaceModel => {
      return new PlaceModel(region)?.fromRegion();
    },
  );

  return addressRegions;
}

export async function getAddressCities({
  regionId,
}: AddressRequestProps): Promise<PlaceModel[]> {
  const getAddressCitiesQuery = `
  {
    addressCities(regionId: ${regionId}) {
        city_code
        city_name
    }
}
  `;

  const data = await new ClientGqlRequest({
    query: getAddressCitiesQuery,
  }).getRequest();

  const addresscities = data?.data?.addressCities?.map(
    (city: any): PlaceModel => {
      return new PlaceModel(city)?.fromCity();
    },
  );

  return addresscities;
}
