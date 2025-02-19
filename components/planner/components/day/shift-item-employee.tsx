"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { deleteShift } from "@/lib/data-access/client";
import dayjs, { Dayjs } from "@/lib/dayjs";
import { shiftServiceIcons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Shift, ShiftService } from "@/models";
import { Calendar, SquareChartGantt } from "lucide-react";
import { toast } from "sonner";

interface PlannerDayShiftItemProps {
  shiftService: ShiftService;
  date: Dayjs;
  shifts: Shift[];
}

export function PlannerDayShiftItemEmployee({
  shiftService,
  shifts,
}: PlannerDayShiftItemProps) {
  async function handleDeleteShift(shiftToDelete: Shift) {
    const { error } = await deleteShift(shiftToDelete.id);

    if (error) {
      console.error(error);
      return toast.error(error.message);
    }

    toast.success(
      `${shiftToDelete.employee?.firstname} won't be working on the ${shiftToDelete.shiftService?.shiftServiceType?.type_name} shift on ${dayjs(shiftToDelete.date).format("DD.MM.YYYY")}`
    );
  }

  return shifts?.map((shift) => {
    const IconComponent =
      shiftServiceIcons[
        shift.shiftService?.icon_shape as keyof typeof shiftServiceIcons
      ];

    return (
      <Sheet key={shift.id}>
        <SheetTrigger asChild>
          <div className="absolute cursor-pointer inset-0 flex items-center justify-center lg:hover:bg-muted-foreground/10">
            <div key={shift.id}>
              <IconComponent
                color={shift.shiftService?.icon_color}
                size={34}
                strokeWidth={0.75}
                className={cn(
                  shiftService.id !== shift.shiftService_id &&
                    "opacity-10 mix-blend-multiply"
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  shiftService.id !== shift.shiftService_id && "opacity-40"
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
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {shift.employee?.firstname} {shift.employee?.lastname}
            </SheetTitle>
            <SheetDescription className="flex items-center gap-x-1">
              <SquareChartGantt size={16} />
              <span>
                {shift.shiftService?.clients
                  ?.map(({ firstname }) => firstname)
                  .join(", ")}{" "}
                {shift.shiftService?.shiftServiceType?.type_name}
              </span>
            </SheetDescription>
            <SheetDescription className="flex items-center gap-x-1">
              <Calendar size={16} />
              <span>
                {dayjs(shift.date).format("DD.MM.YYYY")} -{" "}
                {shift.shiftService?.shiftServiceType?.start_time} -{" "}
                {shift.shiftService?.shiftServiceType?.end_time}
              </span>
            </SheetDescription>
          </SheetHeader>

          <SheetFooter className="sm:justify-start">
            <SheetClose asChild>
              {/* <Button type="submit">Save changes</Button> */}
              <Button onClick={() => handleDeleteShift(shift)} type="submit">
                Delete Shift
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  });
}
