import { Fragment } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
}

export default function Repeat({ children, count }: Props) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => {
          return <Fragment key={i}>{children}</Fragment>;
        })}
    </>
  );
}
