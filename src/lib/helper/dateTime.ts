import { ShippingInfoType } from "../data/models/ConfigurationModel";

type LeftTime = {
  day: string;
  hour: string;
  minute: string;
  second: string;
};

export function getLocalDate(utcDate: Date): Date {
  return new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
}

export function getCorrectedDateForMagento(date: Date): Date {
  return new Date(date.setDate(date.getDate() + 1));
}

export function getLeftTime(specialToDate: string): LeftTime {
  const utcNow = new Date();
  const now = getLocalDate(utcNow);

  const utcToDate = new Date(specialToDate);
  const toDate = getLocalDate(utcToDate);

  // set day of the month = day of the month + 1 " this correction is for magento only"
  const intendedToDate = getCorrectedDateForMagento(toDate);

  const diff = Math.abs(now.getTime() - intendedToDate.getTime());

  const seconds = diff / 1000;
  const days = Math.trunc(seconds / (24 * 3600));
  const hours = Math.trunc((seconds - days * 24 * 3600) / 3600);
  const minutes = Math.trunc((seconds - days * 24 * 3600 - hours * 3600) / 60);
  const leftedSeconds = Math.trunc(
    seconds - days * 24 * 3600 - hours * 3600 - minutes * 60,
  );

  const leftTime = {
    day: `${days}`,
    hour: `${hours}`,
    minute: `${minutes}`,
    second: `${leftedSeconds}`,
  };

  return leftTime;
}

export function isNowBetweenDates({
  from,
  to,
}: {
  from: string | undefined;
  to: string | undefined;
}): boolean {
  const utcNow = new Date();

  const fromDate = new Date(from ?? "");
  const correctedFromDate = getCorrectedDateForMagento(fromDate);

  const toDate = new Date(to ?? "");
  const correctedToDate = getCorrectedDateForMagento(toDate);

  return (
    utcNow?.getTime() >= correctedFromDate?.getTime() &&
    utcNow?.getTime() <= correctedToDate?.getTime()
  );
}

export function getExpectedShippingTime({
  storeCode,
  shippingInfo,
  regionId,
}: {
  storeCode: string;
  shippingInfo: ShippingInfoType;
  regionId: string;
}): {
  orderWithin: number;
  deliveryDate: string;
} {
  const now = new Date();
  const hours = now.getHours() + 1;
  const timeOption = Number(shippingInfo?.timeOption?.split(":")[0]);
  const hoursDifference = timeOption - hours;

  // 1110 is Geddah region id
  const dateDifference =
    regionId === "1110"
      ? shippingInfo?.daysInGeddah
      : shippingInfo?.daysOutGeddah;

  const fridaysCount =
    now?.getDay() >= 5
      ? Math.floor((now?.getDay() + dateDifference - 7) / 5)
      : Math.floor((now?.getDay() + dateDifference) / 5);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date =
    hoursDifference >= 0
      ? new Date(now.setDate(now.getDate() + dateDifference + fridaysCount))
      : new Date(
          now.setDate(now.getDate() + dateDifference + fridaysCount + 1),
        );

  const deliveryDate = storeCode.includes("_ar")
    ? date.toLocaleDateString("ar", options as any)
    : date.toLocaleDateString("en", options as any);

  const orderWithin =
    hoursDifference === 0
      ? 1
      : hoursDifference < 0
        ? 24 + hoursDifference
        : hoursDifference;

  return {
    orderWithin,
    deliveryDate,
  };
}
