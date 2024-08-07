import { Status, Wrapper } from "@googlemaps/react-wrapper";
import React, { memo, useEffect, useState } from "react";
import LocationSearch from "./Children/LocationSearch";
import Map from "./Children/Map";
import Marker from "./Children/Marker";
import { getFormattedAddressFromLatLng } from "../../../../../controller/mapController";
import { mapOptions } from "@/lib/core/basic/Constants";
import { AddressModel } from "@/lib/data/models/AddressModel";
import LocateMe_Btn from "../../../part/button/LocateMe_Btn";
import ConfirmLocation_Btn from "../../../part/button/ConfirmLocation_Btn";
// import { SaveAddress_Modal } from "../../modal/SaveAddress_Modal";
import { SaveAddress_Drawer } from "../../drawer/SaveAddress_Drawer";

type Props = {
  storeCode: string;
  editAddressId?: number | undefined | null;
  setOpenMapDrawer: (open: boolean) => void;
};

type LatLngType = {
  lat: number;
  lng: number;
} | null;

export const GoogleMapLoc = ({
  storeCode,
  editAddressId,
  setOpenMapDrawer,
}: Props) => {
  const [click, setClick] = useState<LatLngType>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [zoom, setZoom] = useState(mapOptions.defaultZoom);
  const [center, setCenter] = useState<any>({ lat: 25.73, lng: 44.23 });
  const [chosenLocation, setChosenLocation] = useState<AddressModel | null>(
    null,
  );
  const [isChosenLocationNotValid, setChosenLocationNotValid] = useState(false);
  const [isDeniedLocationPopupShow, setDeniedLocationPopupShow] =
    useState(false);
  const [openSaveAddress, setOpenSaveAddress] = useState(false);

  const onChooseUnsupportedLocation = () => {
    setChosenLocationNotValid(true);
    setChosenLocation(null);
  };

  const onClickOnMap = (e: any) => {
    setChosenLocationNotValid(false);
    const latLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    const successCallback = (address: AddressModel) => {
      setSearchValue(address.street);
      setClick(e.latLng);
      setChosenLocation({
        ...address,
        ...latLng,
      });
    };

    getFormattedAddressFromLatLng({
      latLng: latLng,
      successCallback: successCallback,
      failureCallback: onChooseUnsupportedLocation,
    });
  };

  const onIdle = (m: any) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  function locateMeSuccessCallback(pos: any) {
    setChosenLocationNotValid(false);
    const crd = pos.coords;
    const latLng = {
      lat: crd.latitude,
      lng: crd.longitude,
    };

    const successCallback = (address: AddressModel) => {
      setSearchValue(address.street);
      setZoom(mapOptions.zoomIn);
      setCenter(latLng);
      setClick(latLng);
      setChosenLocation({
        ...address,
        ...latLng,
      });
    };

    getFormattedAddressFromLatLng({
      latLng: latLng,
      successCallback: successCallback,
      failureCallback: onChooseUnsupportedLocation,
    });
  }

  function handleLocateMe() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(locateMeSuccessCallback);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            locateMeSuccessCallback,
            null,
            options,
          );
        } else if (result.state === "denied") {
          setDeniedLocationPopupShow(true);
        }
        result.onchange = () => {};
      });
    } else {
      alert("Sorry this feature Not available in this browser!");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleLocateMe();
    }, 1200);
  }, []);

  async function handleConfirmLocation() {
    if (chosenLocation) {
      setOpenSaveAddress(true);
    }
  }

  return (
    <div className={"relative h-full w-full"}>
      <Wrapper
        language="en"
        apiKey={mapOptions.googleMapsApiKey}
        libraries={["places"]}
        render={(status: Status) => <h1>{status}</h1>}
      >
        <Map
          zoom={zoom}
          center={center}
          style={{ flexGrow: "1", height: "100%" }}
          onIdle={onIdle}
          onClick={onClickOnMap}
        >
          {click && <Marker position={click} />}
          <LocateMe_Btn
            className="absolute bottom-24 left-4"
            onClick={handleLocateMe}
          />
          <LocationSearch
            searchValue={searchValue}
            setCenter={setCenter}
            setZoom={setZoom}
            setClick={setClick}
            setChosenLocation={setChosenLocation}
            className="absolute top-20"
          />
        </Map>
      </Wrapper>
      {/* confirm location button */}
      <ConfirmLocation_Btn
        storeCode={storeCode}
        className={
          "absolute bottom-0 left-0 w-full bg-fixed_btn_container_background px-4 py-3 "
        }
        disabled={chosenLocation === null}
        onClick={handleConfirmLocation}
      />
      {/* Save Address Modal */}
      {/* <SaveAddress_Modal
        storeCode={storeCode}
        openAddressSave={openSaveAddress}
        setOpenAddressSave={setOpenSaveAddress}
        choosenLocation={chosenLocation}
        editAddressId={editAddressId}
        setOpenMapDrawer={setOpenMapDrawer}
      /> */}
      {/* Save Address Drawer */}
      <SaveAddress_Drawer
        storeCode={storeCode}
        openSaveAddressDrawer={openSaveAddress}
        setOpenSaveAddressDrawer={setOpenSaveAddress}
        editAddressId={editAddressId}
        choosenLocation={chosenLocation}
        setOpenMapDrawer={setOpenMapDrawer}
      />
    </div>
  );
};

export default memo(GoogleMapLoc);
