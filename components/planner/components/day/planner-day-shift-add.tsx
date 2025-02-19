import { Employee, Shift, ShiftService } from "@/models";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { AddShift } from "@/lib/data-access/client";
import { Dayjs } from "dayjs";
import { Plus } from "lucide-react";

interface PlannerDayAddShiftProps {
  employees: Employee[];
  shiftService: ShiftService;
  date: Dayjs;
}

export function PlannerDayAddShift({
  employees,
  shiftService,
  date,
}: PlannerDayAddShiftProps) {
  async function handleDateClick(date: Dayjs, employee_id: Employee["id"]) {
    const shift: Omit<Shift, "id" | "created_at"> = {
      date: date
        .set(
          "hour",
          Number(shiftService.shiftServiceType?.start_time.split(":")[0]) ?? 7
        )
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0)
        .toISOString(),
      shiftService_id: shiftService.id,
      employee_id,
      start_time: shiftService.shiftServiceType?.start_time ?? "07:00",
      end_time: shiftService.shiftServiceType?.start_time ?? "19:00",
    };

    console.log("Add shift", shift);
    AddShift(shift);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group cursor-pointer absolute inset-0 flex items-center justify-center">
          <Plus className="aspect-square w-2 h-2 opacity-20 group-hover:opacity-100 group-hover:w-5 group-hover:h-5 transition-all duration-200" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Employee</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {employees
            .sort((a, b) => {
              if (a.firstname < b.firstname) {
                return -1;
              }
              if (a.firstname > b.firstname) {
                return 1;
              }
              return 0;
            })
            .map(({ firstname, lastname, id }, index) => (
              <DropdownMenuItem
                onClick={() => handleDateClick(date, id)}
                key={id}
              >
                {firstname} {lastname}
                <DropdownMenuShortcut className="tabular-nums">
                  ⌘{index + 1}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
