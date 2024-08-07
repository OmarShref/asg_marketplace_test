// import { Social_Payment_Bar } from "@/lib/component/project/construct/bar/Social_Payment_Bar";
import Spacing from "@/lib/component/generic/pure/spacing";
import PageType from "../../generic/utility/PageType";
import { homeUrlIdentifiers, pageTypes } from "@/lib/core/basic/Constants";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import Cms from "../construct/pageBuilder/Cms";
import { PageProps } from "@/lib/data/types/PageProps";
import Page_Transition from "../part/transition/Page_Transition";

interface Props extends PageProps {
  cms: CmsPageModel | undefined;
}

export default function CmsPage({ params, cms }: Props) {
  return (
    <Page_Transition>
      <Spacing value={2} />
      <Cms cms={cms} storeCode={params?.storeCode} classNameArray={[]} />

      {/* <Social_Payment_Bar /> */}

      <PageType
        pageType={
          params?.route?.length === 1 &&
          params?.route[0] === homeUrlIdentifiers?.mobile
            ? pageTypes.home
            : pageTypes.cms
        }
      />
      <HeaderOptions
        headerOptions={{
          showHeader: true,
          withBackButton: true,
          withLogo: true,
          withSearch: true,
          searchExpanded: false,
          withBurgerButton: true,
          withWishlist: true,
        }}
      />
      <NavbarOptions navbarOptions={{ showNavbar: true }} />
    </Page_Transition>
  );
}
