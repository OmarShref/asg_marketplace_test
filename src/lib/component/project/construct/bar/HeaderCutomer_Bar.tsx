"use client";
import { CartIcon, DesktopLogo, ProfileIcon } from "@/lib/assets/svg";
import { Row, RowSection } from "@/lib/component/generic/pure/row";
import { isArabic } from "@/lib/helper/language";
import Search_Bar from "./Search_Bar";
import { Texts, getText } from "@/lib/assets/text";
import useUserStore from "@/lib/data/stores/UserStore";
import { useEffect, useState } from "react";
import { CustomerModel } from "@/lib/data/models/CustomerModel";
import { CartModel } from "@/lib/data/models/CartModel";
import Anchor from "@/lib/component/generic/pure/anchor";
import Itemcount_Label from "../../part/label/Itemcount_Label";

type Props = {
  storeCode: string;
};

export default function HeaderCutomer_Bar({ storeCode }: Props) {
  const isArabicLanguage = isArabic(storeCode);

  const { customer, cart } = useUserStore((state) => state);

  const [customerState, setCustomerState] = useState<CustomerModel | null>(
    null,
  );
  useEffect(() => {
    setCustomerState(customer);
  }, [customer]);

  const [cartState, setCartState] = useState<CartModel | null>(null);
  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  return (
    <section className=" flex h-16 items-center justify-center bg-background">
      <Row className=" w-full max-w-project gap-12">
        <RowSection className=" ps-1">
          <Anchor href={`/${storeCode}/`}>
            <DesktopLogo className=" h-14 w-auto text-accent" />
          </Anchor>
        </RowSection>
        <RowSection className=" flex-1">
          <Search_Bar storeCode={storeCode} />
        </RowSection>
        <RowSection className=" gap-5 pe-1">
          <Anchor
            href={`/${storeCode}/account`}
            className=" flex items-center justify-center gap-3"
          >
            <div>
              <ProfileIcon className=" h-10 w-auto text-accent" />
            </div>
            <div>
              <p className=" text-sm text-accent">
                {getText({ storeCode: storeCode, text: Texts.welcome })}
              </p>
              <p className=" text-sm">
                {customerState?.firstName
                  ? `${customerState?.firstName} ${customerState?.lastName}`
                  : getText({ storeCode: storeCode, text: Texts.login })}
              </p>
            </div>
          </Anchor>
          <Anchor
            href={`/${storeCode}/cart`}
            className=" flex items-center justify-center gap-3"
          >
            <div className=" relative">
              <CartIcon className=" h-8 w-auto text-accent" />
              {(cartState?.quantity ?? 0) > 0 && (
                <Itemcount_Label
                  value={cartState?.quantity?.toString() ?? ""}
                  className="absolute top-0 text-background"
                />
              )}
            </div>
            <div>
              <p className=" text-sm text-accent">
                {getText({ storeCode: storeCode, text: Texts.cart })}
              </p>
              <p className=" text-sm">
                {cartState?.grandTotal
                  ? `${cartState?.grandTotal} ${cartState?.currency?.label}`
                  : ``}
              </p>
            </div>
          </Anchor>
        </RowSection>
      </Row>
    </section>
  );
}
