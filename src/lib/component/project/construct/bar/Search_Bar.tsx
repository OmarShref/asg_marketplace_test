import { Search_Form } from "../form/Search_Form";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  storeCode: string;
}

export default function Search_Bar({ storeCode }: Props) {
  return (
    <section className=" flex-1">
      <Search_Form storeCode={storeCode} />
    </section>
  );
}
