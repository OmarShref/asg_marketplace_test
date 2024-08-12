import {
  Progress,
  ProgressIndicator,
} from "@/lib/component/generic/ui/progress";

interface Props {
  progress: number;
  label: string;
}

export default function DetailedRating_Progress({ progress, label }: Props) {
  return (
    <div className=" w-full">
      <p className=" text-start text-xs text-sub_secondry_text">{label}</p>
      <Progress className=" h-1">
        <ProgressIndicator value={progress} className=" bg-active_star" />
      </Progress>
      <p className=" font-fontEnglish  text-end text-xs text-sub_secondry_text">{`${progress}%`}</p>
    </div>
  );
}
