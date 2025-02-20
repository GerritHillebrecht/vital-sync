"use client";

import { Employee, Shift, ShiftService } from "@/models";

import { AddShift } from "@/lib/data-access/client";
import { Dayjs } from "dayjs";
import { Info, Plus } from "lucide-react";
import { usePlanner } from "../../provider";

interface PlannerDayAddShiftProps {
  shiftService: ShiftService;
  employee: Employee;
  date: Dayjs;
}

export function PlannerDayAddShiftEmployee({
  shiftService,
  employee,
  date,
}: PlannerDayAddShiftProps) {
  async function handleDateClick() {
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
      employee_id: employee.id,
      start_time: shiftService.shiftServiceType?.start_time ?? "07:00",
      end_time: shiftService.shiftServiceType?.start_time ?? "19:00",
    };

    console.log("Add shift", shift);
    AddShift(shift);
  }

  const { groupedShifts } = usePlanner();
  const isShiftServiceSatisfied =
    (groupedShifts?.[shiftService.id]?.[date.format("MM-DD")]?.length ?? 0) > 0;
  const previousDay = date.subtract(1, "day");
  const nextDay = date.add(1, "day");

  const shiftsOfPreviousDay =
    groupedShifts?.[employee.id]?.[previousDay.format("MM-DD")];

  const shiftsOfNextDay =
    groupedShifts?.[employee.id]?.[nextDay.format("MM-DD")];

  const isBlockedByPreviousDay =
    shiftService.shiftServiceType?.type_name === "Tagdienst" &&
    shiftsOfPreviousDay?.some(
      (shift) =>
        shift.shiftService?.shiftServiceType?.type_name === "Nachtdienst"
    );

  const isBlockedByNextDay =
    shiftService.shiftServiceType?.type_name === "Nachtdienst" &&
    shiftsOfNextDay?.some(
      (shift) => shift.shiftService?.shiftServiceType?.type_name === "Tagdienst"
    );

  const isShiftServiceRequired = shiftService.weekdays?.includes(
    date.day().toString()
  );

  const addable = ![
    isShiftServiceSatisfied,
    isBlockedByPreviousDay,
    isBlockedByNextDay,
    isShiftServiceRequired,
  ].some(Boolean);

  return (
    <>
      {!addable && (
        <div className="group cursor-pointer absolute inset-0 flex items-center justify-center">
          <Info size={16} />
        </div>
      )}
      {addable && (
        <div
          onClick={handleDateClick}
          className="group cursor-pointer absolute inset-0 flex items-center justify-center"
        >
          <Plus className="aspect-square w-2 h-2 opacity-20 group-hover:opacity-100 group-hover:w-5 group-hover:h-5 transition-all duration-200" />
        </div>
      )}
    </>
  );
}
