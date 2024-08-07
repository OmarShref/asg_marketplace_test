type Props = { value?: number; className?: string; x?: boolean; y?: boolean };

export default function Spacing({
  value = 1,
  className,
  x = false,
  y = true,
}: Props) {
  return (
    <div
      style={{
        height: y ? `${value * 4}px` : "0px",
        width: x ? `${value * 4}px` : "100%",
      }}
      className={className}
    ></div>
  );
}
