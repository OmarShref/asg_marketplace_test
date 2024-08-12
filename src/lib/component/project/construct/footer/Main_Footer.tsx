import { DesktopLogo, SnapChatIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import Spacing from "@/lib/component/generic/pure/spacing";
import { appLinks } from "@/lib/core/basic/Constants";
import { ConfigurationModel } from "@/lib/data/models/ConfigurationModel";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";

type Props = {
  storeCode: string;
  configuration: ConfigurationModel;
};

export default function Main_Footer({ storeCode, configuration }: Props) {
  return (
    <footer className=" relative border-t-2 border-accent md:mt-4">
      {/* footer decorator */}
      <Image
        src="/image/footer-decorator.png"
        alt=""
        className="absolute left-0 top-0 h-auto w-24 opacity-60 md:w-40 md:opacity-100"
      />

      {/* footer content */}
      <section className=" relative z-10 mx-auto max-w-project px-2 py-10">
        {/* logo */}
        <div className=" mx-auto w-fit rounded-lg  border-2 border-accent p-4 md:mx-0">
          <DesktopLogo className=" h-14 w-auto text-accent md:h-20" />
        </div>

        <Spacing value={10} />

        {/* ============================================================================== */}

        <section className=" flex flex-col items-center justify-start gap-6  md:flex-row md:items-start md:justify-between ">
          {/* contact links */}
          <div>
            <h4 className=" mx-auto mb-2 w-fit border-b-2 border-accent pb-2 text-center text-sm text-secondry_text/80 md:mx-0">
              {getText({
                storeCode: storeCode,
                text: Texts.forQuestionsAndComplaints,
              })}
            </h4>

            {/* phone */}
            <Anchor
              href={`tel:${configuration?.phone}`}
              className=" mb-2 flex items-center justify-center gap-1 text-primary_text/80 md:justify-start"
              target="_blank"
            >
              <PhoneIcon className="h-4 w-4" />
              <p className="  ">{configuration?.phone}</p>
            </Anchor>

            {/* whatsapp */}
            <Anchor
              href={"https://wa.me/966920009017"}
              className=" mb-2 flex items-center justify-center gap-1 text-primary_text/80 md:justify-start"
              target="_blank"
            >
              <Image
                src="/image/whatsapp-svgrepo-com.svg"
                className="h-auto w-4"
              />
              <p className="  ">+966920009017</p>
            </Anchor>

            {/* mail */}
            <Anchor
              href={"https://wa.me/966920009017"}
              className=" mb-2 flex items-center justify-center gap-1 text-primary_text/80 md:justify-start"
              target="_blank"
            >
              <MailIcon className="h-4 w-4" />
              <p className="  ">{configuration?.email}</p>
            </Anchor>
          </div>

          {/* ============================================================================== */}

          {/* static pages links */}
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

          {/* social links and download app links */}
          <div className=" flex flex-col items-center justify-start gap-5 md:items-start md:justify-between">
            {/* social links */}
            <div>
              <h4 className=" mx-auto mb-4 w-fit border-b-2 border-accent pb-2 text-center text-sm text-secondry_text/80 md:mx-0">
                {getText({
                  storeCode: storeCode,
                  text: Texts.followUsOn,
                })}
              </h4>
              <div className=" flex items-center justify-center gap-5">
                {configuration.socialAccounts?.map((account, index) => {
                  const accountIcon = () => {
                    switch (account?.code) {
                      case "instagram":
                        return <InstagramIcon className=" h-auto w-6" />;
                      case "snap":
                        return <SnapChatIcon className=" h-auto w-6" />;
                      case "twitter":
                        return (
                          <TwitterIcon className=" h-auto w-6 fill-sky-300 stroke-sky-300" />
                        );
                      case "facebook":
                        return (
                          <FacebookIcon className=" h-auto w-6 fill-blue-600 stroke-blue-600" />
                        );
                      case "linkedin":
                        return (
                          <LinkedinIcon className=" h-auto w-6 fill-blue-400 stroke-blue-400" />
                        );
                      default:
                        return null;
                    }
                  };
                  return (
                    <Anchor key={index} href={account.url}>
                      {accountIcon()}
                    </Anchor>
                  );
                })}
              </div>
            </div>

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
          </div>
        </section>
      </section>

      <Spacing value={20} className=" md:hidden" />
    </footer>
  );
}
