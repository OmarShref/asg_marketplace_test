import Timer from "@/lib/component/generic/pure/timer";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  specialToDate: string;
}

export default function Timer_1({ specialToDate, className }: Props) {
  return (
    <Timer
      style={{ direction: "ltr" }}
      className={cn(
        " font-fontEnglish inline-flex items-center justify-center gap-1 rounded bg-timer_background px-3 py-1 text-sm text-primary_text",
        className,
      )}
      specialToDate={specialToDate}
    ></Timer>
  );
}
