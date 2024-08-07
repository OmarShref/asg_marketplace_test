"use server";
import { ServerReqProps } from "@/lib/data/types/ServerReqProps";
import { ServerGqlGetRequest } from "./base-request/ServerGqlGetRequest";
import { MenuModel } from "@/lib/data/models/MenuModel";

export async function getMenu({ params }: ServerReqProps): Promise<MenuModel> {
  const menuQuery = `
  {
    vestedMegaMenu {
        main_menu {
            name
            icon
            url_key
            page_builder_json
            label_text_color
            label_background_color
            children {
                name
                icon
                url_key
                page_builder_json
                label_text_color
                label_background_color
                children {
                    name
                    icon
                    url_key
                    page_builder_json
                    label_text_color
                    label_background_color
                }
            }
        }
    }
}
`;

  const data = await new ServerGqlGetRequest({
    storeCode: params.storeCode,
    query: menuQuery,
  }).getData();

  const menu = new MenuModel(data)?.create();

  return menu;
}
