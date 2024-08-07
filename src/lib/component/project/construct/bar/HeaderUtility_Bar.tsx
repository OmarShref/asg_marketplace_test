import { HeartIcon, PhoneIcon } from "@/lib/assets/svg";
import { Row, RowSection } from "@/lib/component/generic/pure/row";
import { Separator } from "@/lib/component/generic/ui/separator";
import { ConfigurationModel } from "@/lib/data/models/ConfigurationModel";
import { MailIcon } from "lucide-react";
import { Country_Drawer } from "../drawer/Country_Drawer";
import { Language_Drawer } from "../drawer/Language_Drawer";
import Anchor from "@/lib/component/generic/pure/anchor";
import { Texts, getText } from "@/lib/assets/text";

type Props = {
  storeCode: string;
  configuration: ConfigurationModel;
};

export default function HeaderUtility_Bar({ storeCode, configuration }: Props) {
  return (
    <section className=" flex h-9 items-center justify-center bg-header_utility_background ">
      <Row className=" h-full w-full max-w-project">
        <RowSection className=" flex items-center justify-start gap-3 ps-1">
          <RowSection className="flex items-center">
            <PhoneIcon className="h-5 w-5 text-accent" />
            <p className="font-montserrat-remove text-sm">
              {configuration?.phone}
            </p>
          </RowSection>
          <Separator orientation="vertical" className="h-5" />
          <RowSection className="flex items-center">
            <MailIcon className="h-5 w-5 text-accent" />
            <p className="font-montserrat-remove text-sm">
              {configuration?.email}
            </p>
          </RowSection>
        </RowSection>
        {/* ============================================================================  */}
        <RowSection className=" flex items-center justify-start gap-3 pe-1">
          <RowSection className="flex items-center">
            <Country_Drawer
              storeCode={storeCode}
              countries={configuration?.countries}
            />
          </RowSection>
          <Separator orientation="vertical" className="h-5" />
          <RowSection className="flex items-center">
            <Language_Drawer storeCode={storeCode} />
          </RowSection>
          <Separator orientation="vertical" className="h-5" />
          <RowSection>
            <Anchor
              href={`/${storeCode}/wishlist`}
              className="flex items-center gap-2"
            >
              <HeartIcon className="h-5 w-5 text-accent" />
              <p className="text-sm">
                {getText({ storeCode, text: Texts.favourites })}
              </p>
            </Anchor>
          </RowSection>
        </RowSection>
      </Row>
    </section>
  );
}
