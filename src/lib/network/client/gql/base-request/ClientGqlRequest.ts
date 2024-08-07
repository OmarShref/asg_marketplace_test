import { apiUrl } from "@/lib/core/basic/Constants";
import useUserStore from "@/lib/data/stores/UserStore";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { validateResponse } from "@/lib/helper/response";

type ClientGqlRequestProps = {
  storeCode?: string;
  query: string;
  apiUrl?: string;
  authorization?: string;
  headers?: {};
};

export class ClientGqlRequest {
  #storeCode;
  #query;
  #apiUrl;
  #authorization;
  #headers;

  constructor(requestData: ClientGqlRequestProps) {
    this.#storeCode =
      requestData?.storeCode ?? useUtilityStore.getState().storeCode;
    this.#query = requestData?.query ?? "";
    this.#apiUrl = requestData?.apiUrl ?? apiUrl.sales;
    this.#authorization =
      requestData?.authorization ?? useUserStore.getState()?.customer?.token;
    this.#headers =
      requestData?.headers ??
      (this.#authorization
        ? {
            store: this.#storeCode,
            Authorization: `Bearer ${this.#authorization}`,
            "Content-Type": "application/json",
          }
        : {
            store: this.#storeCode,
            "Content-Type": "application/json",
          });
  }

  async getRequest() {
    const res = await fetch(`${this.#apiUrl}?query=${this.#query}`, {
      method: "GET",
      headers: this.#headers,
    });

    return await validateResponse(res);
  }

  async postRequest() {
    const res = await fetch(`${this.#apiUrl}`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify({ query: this.#query }),
    });

    return await validateResponse(res);
  }
}
