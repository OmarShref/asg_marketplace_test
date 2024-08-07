import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { UAParser } from "ua-parser-js";
import { deviceTypes } from "../core/basic/Constants";

export function getDeviceType(headersList: ReadonlyHeaders) {
  const userAgent = <string>headersList?.get("User-Agent");
  const parser = new UAParser(userAgent);
  const deviceType = <string>parser?.getDevice()?.type;

  return deviceType;
}

export function checkSmallDevice(headersList: ReadonlyHeaders) {
  const deviceType = getDeviceType(headersList);
  return (
    deviceType === deviceTypes?.mobile || deviceType === deviceTypes?.tablet
  );
}
