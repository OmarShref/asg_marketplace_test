"use client";
import { Fragment, useEffect, useState } from "react";
import Spacing from "../../generic/pure/spacing";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import { PageProps } from "@/lib/data/types/PageProps";
import PageType from "../../generic/utility/PageType";
import { pageTypes } from "@/lib/core/basic/Constants";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import { getSearchCategoryController } from "@/lib/controller/searchController";
import useSearchStore from "@/lib/data/stores/SearchStore";
import { Texts, getText } from "@/lib/assets/text";
import { Row, RowSection } from "../../generic/pure/row";
import Image from "../../generic/pure/image";
import { MoveUpLeftIcon } from "lucide-react";
import { getDirection } from "@/lib/helper/direction";
import Anchor from "../../generic/pure/anchor";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import Cms from "../construct/pageBuilder/Cms";
import Page_Transition from "../part/transition/Page_Transition";

interface Props extends PageProps {
  recommendationCms: CmsPageModel | undefined;
}
export default function SearchPage({ params, recommendationCms }: Props) {
  const direction = getDirection(params.storeCode);

  const { searchTerm, lastSearchedTerms } = useSearchStore((state) => state);
  const [lastSearchedTermsState, setLastSearchedTermsState] = useState<
    string[] | null
  >(null);
  useEffect(() => {
    setLastSearchedTermsState(lastSearchedTerms);
  }, [lastSearchedTerms]);

  const [searchCategory, setSearchCategory] = useState<CategoryModel | null>(
    null
  );

  async function handleSearch() {
    const searchresults = await getSearchCategoryController({
      params: {
        storeCode: params.storeCode,
        searchTerm: searchTerm,
      },
      page: 0,
    });

    setSearchCategory(searchresults);
  }

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      if (searchTerm?.length > 1) {
        handleSearch();
      }
    }, 300);

    return () => {
      clearTimeout(searchDebounce);
    };
  }, [searchTerm]);

  return (
    <Page_Transition>
      <main className=" max-w-md lg:mx-auto">
        {(searchCategory?.products?.length ?? 0) > 0 && !!searchTerm ? (
          <section className=" px-5 pb-20">
            <Spacing value={6} />
            <div key={searchCategory?.id}>
              {searchCategory?.products?.map((product, index) => {
                return (
                  index < 20 && (
                    <Fragment key={index}>
                      <Anchor href={product?.url}>
                        <Row withSeparator={true}>
                          <RowSection>
                            <Image
                              src={product?.smallImage}
                              alt=""
                              className=" h-10 w-auto object-contain"
                            />
                            <RowSection className=" flex-col items-start gap-0.5">
                              <p className=" text-sm">{product?.name}</p>
                              <p className=" text-xs text-faint_text">
                                {product?.parentCategories?.at(0)?.name}
                              </p>
                            </RowSection>
                          </RowSection>
                          <RowSection>
                            <MoveUpLeftIcon
                              className={` h-4 w-4 text-faint_text ${
                                direction === "rtl" ? "rotate-90" : ""
                              }`}
                            />
                          </RowSection>
                        </Row>
                      </Anchor>
                      {<Spacing value={2} />}
                    </Fragment>
                  )
                );
              })}
            </div>
            <Spacing value={3} />
          </section>
        ) : (
          <section className="  pb-20">
            <Spacing value={6} />
            <h3 className="px-5">
              {getText({
                storeCode: params.storeCode,
                text: Texts.youRecentlySearchedFor,
              })}
            </h3>
            <Spacing value={4} />
            <div className=" flex flex-wrap gap-4 px-5">
              {lastSearchedTermsState
                ?.map((term, index) => {
                  return (
                    <Anchor
                      key={index}
                      href={`/${params.storeCode}/search/${term}`}
                      className=" border-text_secondary rounded-md border px-3 py-1 text-sm text-primary_text"
                    >
                      {term}
                    </Anchor>
                  );
                })
                .reverse()}
            </div>
            <Spacing value={3} />
            <Cms storeCode={params?.storeCode} cms={recommendationCms} />
            <Spacing value={3} />
          </section>
        )}
        <PageType pageType={pageTypes.search} />
        <HeaderOptions
          headerOptions={{
            showHeader: true,
            withBackButton: true,
            withLogo: false,
            withSearch: true,
            searchExpanded: true,
            withBurgerButton: true,
            withWishlist: true,
          }}
        />
        <NavbarOptions navbarOptions={{ showNavbar: true }} />
      </main>
    </Page_Transition>
  );
}
