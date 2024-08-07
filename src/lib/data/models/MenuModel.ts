export type MenuItemType = {
  name: string;
  url: string;
  icon: string;
  banner: string;
  labelTextColor: string;
  labelBackgroundColor: string;
  pageBuilderJson: string;
  children?: MenuItemType[];
};
interface MenuInterface {
  items: MenuItemType[];
}

// refactor this with recursive
export class MenuModel implements MenuInterface {
  items: MenuItemType[];
  constructor(menuData: any) {
    this.items = menuData?.data?.vestedMegaMenu?.main_menu?.map(
      (item: any): MenuItemType => {
        return {
          name: item?.name ?? "",
          url: item?.url_key ?? "",
          icon: item?.icon ?? "",
          banner: item?.page_builder_json ?? "",
          labelTextColor: item?.label_text_color ?? "",
          labelBackgroundColor: item?.label_background_color ?? "",
          pageBuilderJson: item?.page_builder_json ?? "",
          children: item?.children?.map((child: any): MenuItemType => {
            return {
              name: child?.name ?? "",
              url: child?.url_key ?? "",
              icon: child?.icon ?? "",
              banner: child?.page_builder_json ?? "",
              labelTextColor: child?.label_text_color ?? "",
              labelBackgroundColor: child?.label_background_color ?? "",
              pageBuilderJson: child?.page_builder_json ?? "",
              children: child?.children?.map((child: any): MenuItemType => {
                return {
                  name: child?.name ?? "",
                  url: child?.url_key ?? "",
                  icon: child?.icon ?? "",
                  banner: child?.page_builder_json ?? "",
                  labelTextColor: child?.label_text_color ?? "",
                  labelBackgroundColor: child?.label_background_color ?? "",
                  pageBuilderJson: child?.page_builder_json ?? "",
                };
              }),
            };
          }),
        };
      },
    );
  }

  create(): MenuModel {
    return {
      items: this.items,
    } as MenuModel;
  }
}
