interface AddressInterface {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  mail: string;
  lat: number;
  lng: number;
  city: string;
  region: string;
  country: string;
  street: string;
  zip: string;
  default: boolean;
  date: string;
  type: string;
}

export class AddressModel implements AddressInterface {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  mail: string;
  lat: number;
  lng: number;
  city: string;
  region: string;
  country: string;
  street: string;
  zip: string;
  default: boolean;
  date: string;
  type: string;

  constructor(addressData: any) {
    const address = addressData?.address ?? addressData;
    const latLng = addressData?.location?.coordinates ?? addressData?.latLng;

    this.id = address?.id ?? address?.customer_address_id;
    this.firstName = address?.firstname ?? addressData?.firstName;
    this.lastName = address?.lastname ?? addressData?.lastName;
    this.phone = address?.telephone ?? addressData?.phone;
    this.mail = address?.email ?? addressData?.email;
    this.lat = address?.lat ?? latLng?.at(1);
    this.lng = address?.lng ?? latLng?.at(0);
    this.city = address?.city;
    this.region = address?.region ?? address?.state;
    this.country =
      address?.countryCode ?? address?.country_id ?? address?.country;
    this.street = Array.isArray(address?.street)
      ? address?.street?.at(0)
      : address?.street;
    this.zip = address?.postcode ?? address?.zip;
    this.default = address?.default;
    this.date = address?.created_at;
    this.type = address?.company;
  }
}
