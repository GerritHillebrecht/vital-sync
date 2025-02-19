"use client";

import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";
import { Dayjs } from "@/lib/dayjs";

interface PlannerDayHeadlineProps {
  date: Dayjs;
  satisfied: boolean;
  className?: string;
}

export function PlannerDayHeadline({
  date,
  satisfied,
  className,
}: PlannerDayHeadlineProps) {
  const locale = useCurrentLocale();

  return (
    <div
      className={cn(
        "group relative flex p-1 flex-col items-center gap-[0.2rem] justify-around",
        className
      )}
    >
      <p className="text-xs opacity-50 text-center leading-none">
        {date.locale(locale).format("dd")}
      </p>
      <p className="text-xs lg:text-sm opacity-75 text-center leading-none">
        {date.format("D")}
      </p>

      <div
        className={cn(
          "rounded h-1 w-3 group-hover:shadow-sm transition-shadow duration-200",
          satisfied
            ? "bg-green-400 group-hover:shadow-green-400"
            : "bg-orange-400 group-hover:shadow-orange-400"
        )}
      ></div>
    </div>
  );
}
