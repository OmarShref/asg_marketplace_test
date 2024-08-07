"use client";
import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import { Button } from "@/lib/component/generic/ui/button";
import {
  ConfigurationModel,
  PageIdetifierType,
} from "@/lib/data/models/ConfigurationModel";
import { cn } from "@/lib/utils/utils";
import { useParams } from "next/navigation";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  configuration: ConfigurationModel;
  landingPage: PageIdetifierType;
}

export default function LandingPageTab_Btn({
  configuration,
  landingPage,
  className,
  ...restProps
}: Props) {
  const params = useParams();
  const isHomePage = configuration?.homePage === landingPage?.urlIdentifier;
  return (
    <Anchor
      href={`/${params?.storeCode}${
        isHomePage ? "" : `/${landingPage?.urlIdentifier}`
      }`}
      className=" block flex-1"
    >
      <Button
        className={cn(
          `w-full gap-2 rounded-none border py-2 ${
            params?.route?.includes(landingPage?.urlIdentifier)
              ? ` font-semibold ${
                  landingPage?.urlIdentifier === "secret-room"
                    ? " border-b-secretRoom bg-faint_secretRoom text-secretRoom "
                    : " border-b-accent bg-faint_accent text-accent"
                } `
              : " border-landingPageTabs_border text-secondry_text"
          }`,
          className,
        )}
        {...restProps}
      >
        {landingPage?.urlIdentifier === "secret-room" && (
          <Image
            src="/image/ic_secret_room.webp"
            className=" h-5 w-auto object-contain"
          />
        )}
        <p>{landingPage?.label}</p>
      </Button>
    </Anchor>
  );
}
