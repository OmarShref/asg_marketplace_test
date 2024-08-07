import { apiUrl, stores } from "@/lib/core/basic/Constants";
import { validateResponse } from "@/lib/helper/response";

type ServerGqlGetRequestProps = {
  storeCode: string;
  query: string;
  revalidate?: number;
  apiUrl?: string;
};

export class ServerGqlGetRequest {
  #storeCode;
  #query;
  #revalidate;
  #apiUrl;

  constructor(requestData: ServerGqlGetRequestProps) {
    this.#storeCode = requestData?.storeCode ?? stores?.at(0);
    this.#query = requestData?.query ?? "";
    this.#revalidate = requestData?.revalidate ?? 60;
    this.#apiUrl = requestData?.apiUrl ?? apiUrl.main;
  }

  async getData() {
    const res = await fetch(`${this.#apiUrl}?query=${this.#query}`, {
      headers: { store: this.#storeCode },
      next: { revalidate: this.#revalidate },
    });

    return await validateResponse(res);
  }
}
