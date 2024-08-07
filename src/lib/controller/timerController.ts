import { getLeftTime } from "../helper/dateTime";

export function getTimerArray(specialToDate: string) {
  const leftTime = getLeftTime(specialToDate);
  const leftTimeArray = [
    leftTime.day + "d",
    ":",
    leftTime.hour + "h",
    ":",
    leftTime.minute + "m",
    ":",
    leftTime.second + "s",
  ];
  return leftTimeArray;
}
