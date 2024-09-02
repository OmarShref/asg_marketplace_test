"use client";
import { Texts, getText } from "@/lib/assets/text";
import Anchor from "@/lib/component/generic/pure/anchor";
import Image from "@/lib/component/generic/pure/image";
import Spacing from "@/lib/component/generic/pure/spacing";
import BasicConfirm_Btn from "@/lib/component/project/part/button/BasicConfirm_Btn";
import { useParams } from "next/navigation";

type Props = {};

export default function NotFound({}: Props) {
  const params = useParams();
  const storeCode = params.storeCode as string;

  return (
    <div className=" mx-5 flex min-h-[calc(100vh-110px)] max-w-md items-center justify-center md:mx-auto lg:min-h-[calc(100vh-140px)]">
      <div>
        <Image src="/image/404.svg" alt="" />
        <Spacing value={10} />
        <p className=" text-center text-3xl">
          {`${getText({
            storeCode: storeCode,
            text: Texts.sorryWecouldnotFindThisPage,
          })} 😅`}
        </p>
        <Spacing value={10} />
        <Anchor href={`/${storeCode}/`}>
          <BasicConfirm_Btn className=" flex max-w-md lg:mx-auto ">
            {getText({ storeCode: storeCode, text: Texts.continueShopping })}
          </BasicConfirm_Btn>
        </Anchor>
      </div>
    </div>
  );
}
