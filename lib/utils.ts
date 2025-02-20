import { Employee, GroupedShifts, Shift, ShiftService } from "@/models";
import { clsx, type ClassValue } from "clsx";
import dayjs, { Dayjs } from "@/lib/dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupShifts(shifts: Shift[]) {
  return shifts.reduce<GroupedShifts>((acc, shift) => {
    const { employee_id, shiftService_id } = shift;
    const date_key = dayjs(shift.date).format("MM-DD");

    if (!acc[employee_id]) {
      acc[employee_id] = {};
    }

    if (!acc[employee_id]["all"]) {
      acc[employee_id]["all"] = [];
    }

    if (!acc[employee_id][date_key]) {
      acc[employee_id][date_key] = [];
    }

    if (!acc[shiftService_id]) {
      acc[shiftService_id] = {};
    }

    if (!acc[shiftService_id][date_key]) {
      acc[shiftService_id][date_key] = [];
    }

    acc[employee_id]["all"].push(shift);
    acc[employee_id][date_key].push(shift);
    acc[shiftService_id][date_key].push(shift);

    return acc;
  }, {});
}

interface CheckEmployeeDateProps {
  employee: Employee;
  shiftService: ShiftService;
  groupedShifts: GroupedShifts | null;
  date: Dayjs;
}

export function checkEmployeeDate({
  employee,
  shiftService,
  groupedShifts,
  date,
}: CheckEmployeeDateProps) {
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

  const isShiftServiceNotRequired = !shiftService.weekdays?.includes(
    date.day().toString()
  );

  const isAddable = ![
    isShiftServiceSatisfied,
    isBlockedByPreviousDay,
    isBlockedByNextDay,
    isShiftServiceNotRequired,
  ].some(Boolean);

  return {
    isShiftServiceSatisfied,
    isBlockedByPreviousDay,
    isBlockedByNextDay,
    isShiftServiceNotRequired,
    isAddable,
  };
}
