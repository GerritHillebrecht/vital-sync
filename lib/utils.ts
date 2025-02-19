import { GroupedShifts, Shift } from "@/models";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupShifts(shifts: Shift[]) {
  return shifts.reduce<GroupedShifts>((acc, shift) => {
    const { employee_id, shiftService_id } = shift;
    const day = shift.date.split("T")[0].split("-")[2];

    if (!acc[employee_id]) {
      acc[employee_id] = {};
    }

    if (!acc[employee_id]["all"]) {
      acc[employee_id]["all"] = [];
    }

    if (!acc[employee_id][day]) {
      acc[employee_id][day] = [];
    }

    if (!acc[shiftService_id]) {
      acc[shiftService_id] = {};
    }

    if (!acc[shiftService_id][day]) {
      acc[shiftService_id][day] = [];
    }

    acc[employee_id]["all"].push(shift);
    acc[employee_id][day].push(shift);
    acc[shiftService_id][day].push(shift);

    return acc;
  }, {});
}
