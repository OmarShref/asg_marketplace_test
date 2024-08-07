import CartCardIncreaseCount_Btn from "../../part/button/CartCardIncreaseCount_Btn";
import CartCardDecreaseCount_Btn from "../../part/button/CartCardDecreaseCount_Btn";

type Props = {
  cartItemCount: number;
  setCartItemCount: React.Dispatch<React.SetStateAction<number>>;
  isInStock?: boolean;
  quantity?: number;
};

export default function CartCard_Counter({
  cartItemCount,
  setCartItemCount,
  isInStock,
  quantity,
}: Props) {
  return (
    <div className=" flex w-fit items-center justify-center gap-2 rounded-full px-2 ring-1 ring-sub_secondry_text">
      <CartCardIncreaseCount_Btn
        onClick={() => {
          setCartItemCount(cartItemCount + 1);
        }}
        disabled={cartItemCount === quantity || !isInStock}
      />
      <p className="font-montserrat-remove text-base font-normal text-sub_secondry_text">
        {cartItemCount}
      </p>
      <CartCardDecreaseCount_Btn
        disabled={cartItemCount === 1 || !isInStock}
        onClick={() => {
          setCartItemCount(cartItemCount - 1);
        }}
      />
    </div>
  );
}
