"use client";
import { Texts, getText } from "@/lib/assets/text";
import Anchor from "@/lib/component/generic/pure/anchor";
import Spacing from "@/lib/component/generic/pure/spacing";
import BasicConfirm_Btn from "@/lib/component/project/part/button/BasicConfirm_Btn";
import { useParams } from "next/navigation";

type Props = {};

export default function NotFound({}: Props) {
  const params = useParams();
  const storeCode = params.storeCode as string;

  return (
    <div className=" mx-5 max-w-md md:mx-auto">
      <Spacing value={10} />
      <p className=" font-montserrat-remove text-center text-9xl text-accent">
        404
      </p>
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
  );
}
