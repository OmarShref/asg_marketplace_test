import { validateResponse } from "@/lib/helper/response";

type ClientRestRequestProps = {
  query: string | {};
  apiUrl?: string;
  authorization?: string;
  headers?: {};
};

export class ClientRestRequest {
  #query;
  #apiUrl;
  #authorization;
  #headers;

  constructor(requestData: ClientRestRequestProps) {
    this.#query = requestData?.query ?? "";
    this.#apiUrl = requestData?.apiUrl;
    this.#authorization = requestData?.authorization;
    this.#headers =
      requestData?.headers ??
      (this.#authorization
        ? {
            Authorization: `Bearer ${this.#authorization}`,
            "Content-Type": "application/json",
          }
        : {
            "Content-Type": "application/json",
          });
  }

  async getRequest() {
    const res = await fetch(`${this.#apiUrl}`, {
      method: "GET",
      headers: this.#headers,
    });

    return await validateResponse(res);
  }

  async postRequest() {
    const res = await fetch(`${this.#apiUrl}`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(this.#query),
    });

    return await validateResponse(res);
  }
}
