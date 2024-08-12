import ProductIncreaseCount_Btn from "../../part/button/ProductIncreaseCount_Btn";
import ProductDecreaseCount_Btn from "../../part/button/ProductDecreaseCount_Btn";

type Props = {
  productCount: number;
  setProductCount: React.Dispatch<React.SetStateAction<number>>;
};

export default function Product_Counter({
  productCount,
  setProductCount,
}: Props) {
  return (
    <div className=" flex w-fit items-center justify-center gap-4">
      <ProductIncreaseCount_Btn
        onClick={() => setProductCount(productCount + 1)}
      />
      <p className="font-fontEnglish text-xl font-semibold">{productCount}</p>
      <ProductDecreaseCount_Btn
        disabled={productCount === 1}
        onClick={() => setProductCount(productCount - 1)}
      />
    </div>
  );
}
