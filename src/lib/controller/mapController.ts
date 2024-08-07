import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";
import _ from "lodash";
import { mapOptions } from "@/lib/core/basic/Constants";
import { AddressModel } from "../data/models/AddressModel";
import { useEffect, useRef } from "react";

export const deepCompareEqualsForMaps = createCustomEqual(((deepEqual: any) =>
  (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof window.google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof window.google.maps.LatLng
    ) {
      return new window.google.maps.LatLng(a).equals(
        new window.google.maps.LatLng(b),
      );
    }

    return deepEqual(a, b);
  }) as any);

export function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffectForMaps(callback: any, dependencies: any) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export const findResult = (results: any, name: string, nameType: string) => {
  const result = _.find(results, (obj) => obj.types.includes(name));

  return result ? result[nameType] : null;
};

export const findLocationDataFromGoogleAddress = (result: any) => {
  const { formatted_address } = result;

  const addressObject = result.address_components;

  const countryCode = findResult(addressObject, "country", "short_name");

  const region =
    findResult(addressObject, "administrative_area_level_1", "long_name") ??
    findResult(addressObject, "administrative_area_level_2", "long_name") ??
    null;

  const city =
    findResult(addressObject, "locality", "long_name") ??
    findResult(addressObject, "administrative_area_level_2", "long_name") ??
    findResult(addressObject, "administrative_area_level_1", "long_name") ??
    null;

  const district =
    findResult(addressObject, "sublocality", "long_name") ??
    findResult(addressObject, "sublocality_level_2", "long_name") ??
    findResult(addressObject, "sublocality_level_1", "long_name") ??
    null;

  const postcode =
    findResult(addressObject, "postal_code", "short_name") ?? null;

  const address = {
    street: formatted_address,
    city,
    region,
    company: "",
    countryCode,
    postcode,
  };

  return address;
};

export const fillUnknownAddressDataWithUnknown = (address: any) => {
  const unknownAddress = {
    street: mapOptions.unknown,
    city: mapOptions.unknown,
    region: mapOptions.unknown,
    company: mapOptions.unknown,
    countryCode: mapOptions.unknown,
    postcode: mapOptions.unknown,
  };

  return {
    ...unknownAddress,
    ...address,
  };
};

export function getFormattedAddressFromLatLng({
  latLng,
  successCallback,
  failureCallback = null,
}: {
  latLng: any;
  successCallback: any;
  failureCallback?: any;
}) {
  const geocoder = new window.google.maps.Geocoder();

  geocoder?.geocode({ location: latLng })?.then((response: any) => {
    if (response?.results) {
      const { results } = response;

      const mappedAddresses = results?.map((result: any) =>
        findLocationDataFromGoogleAddress(result),
      );

      const address = mappedAddresses?.reduce(
        (mainResult: any, current: any) => ({
          ..._.omitBy(current, _.isNull),
          ..._.omitBy(mainResult, _.isNull),
        }),
        {},
      );

      const finalAddress = new AddressModel(
        fillUnknownAddressDataWithUnknown(address),
      );

      // if (!mapOptions.supportedCountries.includes(finalAddress.countryCode)) {
      //   failureCallback();
      //   return;
      // }

      successCallback(finalAddress);
    }
  });
}
