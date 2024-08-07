import { Texts, getText } from "@/lib/assets/text";
import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import { appLinks } from "@/lib/core/basic/Constants";

type Props = {
  storeCode: string;
};

export default function Above_Header({ storeCode }: Props) {
  return (
    <section className=" bg-accent/15 py-0.5 px-5">
      <div className=" max-w-project mx-auto flex flex-nowrap items-center justify-start gap-28 animate-moving-promotion md:duration-20000">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={` flex items-center gap-3 ${
              index === 1 ? "hidden md:flex" : ""
            } ${index === 2 ? "hidden lg:flex" : ""}`}
          >
            <p className=" shrink-0 text-xs">
              {getText({ storeCode: storeCode, text: Texts.downloadTheApp })}
            </p>

            {/* download app links */}
            {appLinks?.map((appLink, index) => (
              <Anchor
                key={index}
                href={appLink?.link}
                className="shrink-0"
                target="_blank"
              >
                <Image src={appLink?.image} className="h-4 w-auto" />
              </Anchor>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
//
