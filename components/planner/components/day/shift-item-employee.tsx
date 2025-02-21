"use client";

import { shiftServiceColors } from "@/lib/colors";
import { Dayjs } from "@/lib/dayjs";
import { shiftServiceIcons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Shift, ShiftService } from "@/models";
import { PlannerDayShiftSheet } from "./shift-sheet";
import { useIsMobile } from "@/hooks";

interface PlannerDayShiftItemProps {
  shiftService: ShiftService;
  date: Dayjs;
  shifts: Shift[];
}

export function PlannerDayShiftItemEmployee({
  shiftService,
  shifts,
}: PlannerDayShiftItemProps) {
  const isMobile = useIsMobile();

  return shifts?.map((shift) => {
    const IconComponent =
      shiftServiceIcons[
        shift.shiftService?.icon_shape as keyof typeof shiftServiceIcons
      ];

    return (
      <PlannerDayShiftSheet shift={shift} key={shift.id}>
        <div className="absolute cursor-pointer inset-0 flex items-center justify-center lg:hover:bg-muted-foreground/10">
          <div key={shift.id}>
            <IconComponent
              color={
                shiftServiceColors[
                  (shift.shiftService
                    ?.icon_color as keyof typeof shiftServiceColors) ?? "rose"
                ]
              }
              size={isMobile ? 24 : 34}
              strokeWidth={0.75}
              className={cn(
                shiftService.id !== shift.shiftService_id && "opacity-40"
              )}
            />
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                shiftService.id !== shift.shiftService_id && "opacity-50"
              )}
            >
              <span className="text-[0.5rem]">
                {shift.shiftService?.shiftServiceType?.type_name.charAt(0)}
                {shift.shiftService?.clients?.[0].firstname.charAt(0)}
                {shift.shiftService?.clients?.[0].lastname.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </PlannerDayShiftSheet>
    );
  });
}
