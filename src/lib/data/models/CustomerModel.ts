import useUserStore from "../stores/UserStore";
import { AddressModel } from "./AddressModel";
import { OrderModel } from "./OrderModel";

export type GtmCustomerType = {
  city: string | undefined;
  zip: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
  customer_id: number | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  gender: string | undefined;
  date_of_birth: string | undefined;
};
interface CustomerInterface {
  id: number;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  gender: string;
  addresses: AddressModel[];
  defaultAddress: AddressModel;
  orders: OrderModel;
}

export class CustomerModel implements CustomerInterface {
  id: number;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  addresses: AddressModel[];
  defaultAddress: AddressModel;
  orders: OrderModel;

  constructor(customerData: any) {
    const customer =
      customerData?.customer_data?.query?.customer ??
      customerData?.customer_data ??
      customerData;

    this.id = customer?.id;
    this.token =
      useUserStore.getState()?.customer?.token ?? customerData?.token;
    this.firstName = customer?.firstname;
    this.lastName = customer?.lastname;
    this.email = customer?.email;
    this.phone = customer?.mobilenumber;
    this.gender = customer?.gender;
    this.dateOfBirth = customer?.date_of_birth;
    this.createdAt = customer?.created_at;
    this.updatedAt = customer?.updated_at;
    this.addresses = customer?.addresses?.map((address: any): AddressModel => {
      return new AddressModel(address);
    });
    this.defaultAddress = new AddressModel(customer?.default_shipping);
    this.orders = {
      totalCount: 0,
      items: [],
    };
  }

  static toGtm(customer: CustomerModel | null): GtmCustomerType {
    const address = customer?.addresses?.at(0);
    return {
      city: address?.city,
      zip: address?.zip,
      lat: address?.lat,
      lng: address?.lng,
      customer_id: customer?.id,
      first_name: customer?.firstName,
      last_name: customer?.lastName,
      email: customer?.email,
      phone: customer?.phone,
      gender: customer?.gender,
      date_of_birth: customer?.dateOfBirth,
    };
  }
}
