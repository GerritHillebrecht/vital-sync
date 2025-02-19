"use client";

import { usePlanner } from "@/components/planner";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentLocale } from "@/locales/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PlannerViewShiftService } from "@/components/planner/views/shift-service-view";
import { PlannerViewEmployee } from "@/components/planner/views/employee-view";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const locale = useCurrentLocale();

  const {
    shiftService,
    workspace,
    company,
    company_id,
    workspace_id,
    groupedShifts,
  } = usePlanner();

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
        <PlannerViewShiftService
          shifts={groupedShifts ? groupedShifts[shiftService.id] : {}}
          shiftService={shiftService}
        />
      )}
      <div className="py-6 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="px-3 rounded bg-background text-[0.5rem] font-bold uppercase tracking-widest">
            Employees
          </p>
        </div>
        <Separator />
      </div>
      {shiftService &&
        company &&
        company.employees?.map((employee) => (
          <PlannerViewEmployee
            shiftService={shiftService}
            shifts={groupedShifts ? groupedShifts[employee.id] : {}}
            employee={employee}
            key={employee.id}
          />
        ))}
    </div>
  );
}
