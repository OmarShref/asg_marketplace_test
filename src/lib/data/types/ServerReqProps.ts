import { PageProps } from "./PageProps";

export type ServerReqProps = PageProps & {
  id?: number;
  urlIdentifier?: string;
  configurableProductUIds?: string[];
  search?: string;
};
