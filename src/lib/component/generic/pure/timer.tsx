"use client";
import { getTimerArray } from "@/lib/controller/timerController";
import { useEffect, useState } from "react";

type Props = { specialToDate: string; className?: string; style?: {} };

export default function Timer({ specialToDate, className, style }: Props) {
  const [timerArray, setTimerArray] = useState([""]);


  useEffect(() => {
    if (specialToDate) {
      const timerInterval = setInterval(() => {
        const _timerArray = getTimerArray(specialToDate);
        setTimerArray(_timerArray);
      }, 1000);
      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [specialToDate]);

  return (
    specialToDate && (
      <div style={style} className={className}>
        {timerArray?.map((dateSegment, index) => {
          return <p key={index}>{dateSegment}</p>;
        })}
      </div>
    )
  );
}
