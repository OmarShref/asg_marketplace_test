import { DesktopLogo } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import Spacing from "@/lib/component/generic/pure/spacing";
import { appLinks } from "@/lib/core/basic/Constants";
import { ConfigurationModel } from "@/lib/data/models/ConfigurationModel";
import { isArabic } from "@/lib/helper/language";

type Props = {
  storeCode: string;
  configuration: ConfigurationModel;
};

export default function Main_Footer({ storeCode, configuration }: Props) {
  return (
    <footer className=" border-t-2 border-accent md:mt-4">
      <section className=" mx-auto flex max-w-project flex-col items-center justify-start gap-6 px-2 py-4 md:flex-row md:items-start md:justify-between md:py-10">
        {/* logo */}
        <div className=" rounded-lg border-2 border-dashed border-accent p-4">
          <DesktopLogo className=" h-14 w-auto text-accent md:h-20" />
        </div>

        {/* ============================================================================== */}

        {/* static links */}
        <div>
          <h4 className=" mx-auto mb-2 w-fit border-b-2 border-accent pb-2 text-center text-sm text-secondry_text/80 md:mx-0">
            {getText({
              storeCode: storeCode,
              text: Texts.contactUs,
            })}
          </h4>
          {configuration?.staticPages?.map((staticPage, index) => {
            return (
              <Anchor
                key={index}
                href={`/${storeCode}/${staticPage?.urlIdentifier}`}
                className=" mb-2 text-center text-primary_text/80 md:text-start"
              >
                {staticPage?.label}
              </Anchor>
            );
          })}
        </div>

        {/* ============================================================================== */}

        {/* download the app */}
        <div>
          <h4 className=" mx-auto mb-2 w-fit border-b-2 border-accent pb-2 text-center text-sm text-secondry_text/80 md:mx-0">
            {getText({
              storeCode: storeCode,
              text: Texts.downloadTheApp,
            })}
          </h4>
          {appLinks?.map((appLink, index) => {
            return (
              <Anchor
                key={index}
                href={appLink?.link}
                className=" mb-2"
                target="_blank"
              >
                <Image
                  src={appLink?.image}
                  alt=""
                  className=" h-auto w-40 object-contain"
                />
              </Anchor>
            );
          })}
        </div>
      </section>
      <Spacing value={20} className=" md:hidden" />
    </footer>
  );
}
