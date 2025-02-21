"use client";

import { Employee, Shift, ShiftService } from "@/models";

import { AddShift } from "@/lib/data-access/client";
import { Dayjs } from "dayjs";
import { CalendarIcon, Info, Plus } from "lucide-react";
import { usePlanner } from "../../provider";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { checkEmployeeDate } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";

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
        .set("month", currentMonth)
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

    AddShift(shift);
  }

  const locale = useCurrentLocale();

  const { groupedShifts, currentMonth } = usePlanner();
  const {
    isAddable,
    isBlockedByNextDay,
    isBlockedByPreviousDay,
    isShiftServiceNotRequired,
    isShiftServiceSatisfied,
  } = checkEmployeeDate({ employee, shiftService, groupedShifts, date });

  return (
    <>
      {!isAddable && (
        <div className="group cursor-pointer absolute inset-0 flex items-center justify-center">
          <HoverCard>
            <HoverCardTrigger>
              <Info size={16} className="opacity-60" />
            </HoverCardTrigger>
            <HoverCardContent side="top">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>
                    {employee.firstname.charAt(0)}
                    {employee.lastname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {employee.firstname} {employee.lastname}
                  </h4>
                  {isShiftServiceSatisfied && (
                    <p className="text-xs">
                      {`${date.format("DD.MM.YYYY")} already has a shift`}
                    </p>
                  )}
                  {isBlockedByPreviousDay && (
                    <p className="text-xs">
                      {`Doubleshift: ${date.locale(locale).subtract(1, "day").format("DD.MM.YYYY")} already has a nightshift`}
                    </p>
                  )}
                  {isBlockedByNextDay && (
                    <p className="text-xs">
                      {`Doubleshift: ${date.locale(locale).add(1, "day").format("DD.MM.YYYY")} already has a dayshift`}
                    </p>
                  )}
                  {isShiftServiceNotRequired && (
                    <p className="text-xs">
                      {`Service is not required on ${date.locale(locale).format("dddd")}.`}
                    </p>
                  )}
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )}
      {isAddable && (
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
