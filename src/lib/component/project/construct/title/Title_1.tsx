import WatchAll_Btn from "../../part/button/WatchAll_Btn";
import Timer_1 from "../../part/timer/Timer_1";

type Props = {
  storeCode: string;
  title: string;
  specialToDate: string;
  watchAllUrl?: string;
};

export default function Title_1({
  storeCode,
  title,
  specialToDate,
  watchAllUrl,
}: Props) {
  return (
    <div className=" mx-5 flex items-center justify-between text-primary_text">
      <div className="  flex items-center justify-start gap-3 text-primary_text">
        <p className=" text-base">{title}</p>
        {specialToDate?.length > 1 && <Timer_1 specialToDate={specialToDate} />}
      </div>
      <WatchAll_Btn storeCode={storeCode} watchAllUrl={watchAllUrl} />
    </div>
  );
}
