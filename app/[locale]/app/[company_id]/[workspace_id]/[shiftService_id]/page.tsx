"use client";

import { usePlanner } from "@/components/planner";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentLocale } from "@/locales/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PlannerRowShiftService } from "@/components/planner/views/shift-service-view";

export default function Page() {
  const locale = useCurrentLocale();

  const { shiftService, workspace, company_id, workspace_id, groupedShifts } =
    usePlanner();

  return (
    <div className="grid gap-4">
      <div>
        <Link
          className="inline"
          href={`/${locale}/app/${company_id}/${workspace_id}`}
        >
          <span className="flex items-center gap-x-1">
            <ChevronLeft /> {workspace?.workspace_name}
          </span>
        </Link>
      </div>
      {!shiftService && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      )}
      {shiftService && (
        <PlannerRowShiftService
          shifts={groupedShifts ? groupedShifts[shiftService.id] : {}}
          shiftService={shiftService}
        />
      )}
    </div>
  );
}
