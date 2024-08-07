import Image from "@/lib/component/generic/pure/image";

type Props = {
  title: string;
};

export default function Title_2({ title }: Props) {
  return (
    <div className=" relative mx-auto flex w-fit items-center justify-center gap-4 pb-2 text-primary_text before:absolute before:bottom-0 before:h-px before:w-2/3 before:bg-separator after:absolute after:-bottom-1 after:h-2 after:w-2 after:rotate-45 after:bg-background after:ring-1 after:ring-separator">
      <Image
        src="/gif/title_decorator.gif"
        highPeriority={false}
        className=" w-8"
      />
      <p className=" text-base">{title}</p>
      <Image
        src="/gif/title_decorator.gif"
        highPeriority={false}
        className=" w-8"
      />
    </div>
  );
}
