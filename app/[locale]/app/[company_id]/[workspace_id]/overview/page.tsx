"use client";

import { usePlanner } from "@/components/planner";
import { PlannerViewEmployee } from "@/components/planner/views/employee-view";

export default function Page() {
  const { workspace, groupedShifts } = usePlanner();
  return (
    <div className="grid gap-4">
      {workspace?.employees?.map((employee) => (
        <PlannerViewEmployee
          key={employee.id}
          shifts={groupedShifts?.[employee.id] ?? {}}
          employee={employee}
          employeeOverview={true}
        />
      ))}
    </div>
  );
}
