import { GroupedShifts, Shift } from "@/models";
import { clsx, type ClassValue } from "clsx";
import dayjs from "@/lib/dayjs";
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
