import { cn } from "@/lib/utils/utils";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  highPeriority?: boolean;
}

export default function Image({
  highPeriority,
  className,
  src,
  ...restProps
}: Props) {
  return (
    <img
      src={
        src?.includes(".jpg") ||
        src?.includes(".jpeg") ||
        src?.includes(".png") ||
        src?.includes(".gif") ||
        src?.includes(".webp") ||
        src?.includes(".svg")
          ? src
          : "/image/default_blooming.png"
      }
      fetchPriority={highPeriority ? "high" : "low"}
      loading={highPeriority ? "eager" : "lazy"}
      className={cn(" h-full w-full object-cover", className)}
      width={"100%"}
      height={"100%"}
      {...restProps}
    />
  );
}
