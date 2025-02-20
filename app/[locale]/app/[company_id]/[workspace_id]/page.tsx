"use client";

import { usePlanner } from "@/components/planner";
import { Skeleton } from "@/components/ui/skeleton";
import { PlannerViewShiftService } from "@/components/planner/views/shift-service-view";
import { redirect } from "next/navigation";

export default function Page() {
  const { company_id, workspace_id, workspace, groupedShifts } = usePlanner();


  if (workspace && !workspace.clients?.length) {
    redirect(`/app/${company_id}/${workspace_id}/clients/create`);
  }

  if (workspace && !workspace.shiftServices?.length) {
    redirect(`/app/${company_id}/${workspace_id}/shift-services/create`);
  }

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
