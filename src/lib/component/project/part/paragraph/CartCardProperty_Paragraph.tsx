import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {}

export default function CartCardProperty_Paragraph({ children }: Props) {
  return <p className={cn(" text-sm  text-secondry_text")}>{children}</p>;
}
