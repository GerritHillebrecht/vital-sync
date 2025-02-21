"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Shift, ShiftService } from "@/models";
import { AvatarImage } from "@radix-ui/react-avatar";
import { PlannerDayShiftHoverCard } from "./shift-hover-card";
import { PlannerDayShiftSheet } from "./shift-sheet";

interface PlannerDayShiftItemProps {
  shiftService: ShiftService;
  shifts: Shift[];
}

export function PlannerDayShiftItemShiftService({
  shiftService,
  shifts,
}: PlannerDayShiftItemProps) {
  return (
    <PlannerDayShiftSheet shift={shifts[0]}>
      <div className="absolute cursor-pointer inset-0 flex items-center justify-center lg:hover:bg-muted-foreground/10">
        {
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center pl-3">
              {shifts?.map((shift) => (
                <PlannerDayShiftHoverCard shift={shift} key={shift.id}>
                  <Avatar
                    color={shiftService.icon_color}
                    className="h-6 w-6 -ml-3"
                  >
                    <AvatarImage />
                    <AvatarFallback>
                      <span className="text-[0.5rem]">
                        {shift.employee?.firstname.charAt(0)}
                        {shift.employee?.lastname?.charAt(0)}
                      </span>
                    </AvatarFallback>
                  </Avatar>
                </PlannerDayShiftHoverCard>
              ))}
            </div>
          </div>
        }
      </div>
    </PlannerDayShiftSheet>
  );
}
