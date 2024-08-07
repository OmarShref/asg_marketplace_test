import { useEffect, useRef, memo } from "react";
import { getFormattedAddressFromLatLng } from "../../../../../../controller/mapController";
import { mapOptions } from "@/lib/core/basic/Constants";
import { AddressModel } from "@/lib/data/models/AddressModel";
import { cn } from "@/lib/utils/utils";
import { Texts, getText } from "@/lib/assets/text";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { getDirection } from "@/lib/helper/direction";

type Props = {
  map?: any;
  setCenter: any;
  setZoom: any;
  setClick: any;
  searchValue: string;
  setChosenLocation: any;
  className?: string;
};
export function LocationSearch({
  map,
  setCenter,
  setZoom,
  setClick,
  searchValue,
  setChosenLocation,
  className,
}: Props) {
  const direction = getDirection(useUtilityStore.getState().storeCode);
  const autoCompleteRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (map && map.renderingType === "RASTER") {
        const options = {
          fields: ["formatted_address", "geometry", "name"],
          strictBounds: true,
          // componentRestrictions: { country: mapOptions.supportedCountries },
        };
        const autoComplete = new window.google.maps.places.Autocomplete(
          autoCompleteRef.current,
          options,
        );

        autoComplete.setFields(["address_components", "formatted_address"]);
        autoComplete.addListener("place_changed", () => {
          const place = autoComplete.getPlace();
          const loc = place?.geometry?.location;
          const latLng = { lat: loc?.lat(), lng: loc?.lng() };
          if (loc) {
            getFormattedAddressFromLatLng({
              latLng,
              successCallback: (address: AddressModel) => {
                setClick(loc);
                setChosenLocation({
                  latLng,
                  address,
                });
                setCenter(latLng);
                setZoom(mapOptions.zoomIn);
              },
            });
          }
        });
      }
    }, mapOptions.defaultTimeout);
  }, [map, searchValue]);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-transparent",
        className,
      )}
    >
      <input
        defaultValue={searchValue}
        ref={autoCompleteRef}
        placeholder={getText({
          storeCode: useUtilityStore.getState().storeCode,
          text: Texts.enterYourAddress,
        })}
        dir={direction}
        className="mx-4 w-full rounded-md px-4 py-2 text-base font-light"
      />
    </div>
  );
}

export default memo(LocationSearch);
