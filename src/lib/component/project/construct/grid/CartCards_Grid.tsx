"use client";
import { Grid } from "@/lib/component/generic/pure/grid";
import Cart_Card from "../card/Cart_Card";
import { CartProductInterface } from "@/lib/data/models/CartModel";

type Props = {
  storeCode: string;
  cartItems: CartProductInterface[] | undefined;
};

export default function CartCards_Grid({ storeCode, cartItems }: Props) {
  return (
    <Grid variant={"one_colomn"}>
      {cartItems?.map((item, index) => {
        return <Cart_Card key={index} storeCode={storeCode} cartItem={item} />;
      })}
    </Grid>
  );
}
