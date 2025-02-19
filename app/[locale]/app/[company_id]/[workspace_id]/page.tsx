"use client";

import { usePlanner } from "@/components/planner";
import { Skeleton } from "@/components/ui/skeleton";
import { PlannerViewShiftService } from "@/components/planner/views/shift-service-view";

export default function Page() {
  const { workspace, groupedShifts } = usePlanner();

  return (
    <>
      {!workspace && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      )}
      {workspace?.shiftServices?.map((shiftService) => (
        <PlannerViewShiftService
          key={shiftService.id}
          shiftService={shiftService}
          shifts={groupedShifts ? groupedShifts[shiftService.id] : {}}
        />
      ))}
    </>
  );
}
