export function turnStringToBoolean(value: string) {
  const lowerCaseValue = value?.toLowerCase();

  switch (lowerCaseValue) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return !!lowerCaseValue;
  }
}
