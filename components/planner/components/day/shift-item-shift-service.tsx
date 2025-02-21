"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import dayjs from "@/lib/dayjs";
import { Shift, ShiftService } from "@/models";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CalendarIcon } from "lucide-react";
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
                <HoverCard key={shift.id}>
                  <HoverCardTrigger asChild>
                    <Avatar
                      key={shift.id}
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
                  </HoverCardTrigger>
                  <HoverCardContent side="top" className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={
                            shift.employee?.firstname ??
                            "https://github.com/vercel.png"
                          }
                        />
                        <AvatarFallback>
                          {shift.employee?.firstname.charAt(0)}
                          {shift.employee?.lastname?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          {shift.employee?.firstname} {shift.employee?.lastname}
                        </h4>
                        <p className="text-sm">
                          The React Framework – created and maintained by
                          @vercel.
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            {dayjs(shift.date).format("DD.MM.YYYY HH:mm")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        }
      </div>
    </PlannerDayShiftSheet>
  );
}
