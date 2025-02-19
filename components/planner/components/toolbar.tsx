"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePlanner } from "../provider/planner-provider";
import dayjs from "dayjs";
import { useCurrentLocale } from "@/locales/client";
import "dayjs/locale/de";

export function PlannerToolbar({ className }: { className?: string }) {
  const { updateSearchParams, endDate } = usePlanner();
  const locale = useCurrentLocale();

  return (
    <header className={className}>
      <nav className="flex items-center justify-between gap-x-2 mx-auto">
        <h3 className="text-xl tracking-tight uppercase">{dayjs(endDate).locale(locale).format("MMMM YYYY")}</h3>
        <div className="flex items-center gap-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateSearchParams("prev")}
          >
            <ChevronLeft />
            <span className="sr-only">Back</span>
          </Button>
          <Button variant="outline" onClick={() => updateSearchParams("today")}>
            <span>Today</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateSearchParams("next")}
          >
            <ChevronRight />
            <span className="sr-only">Forward</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
