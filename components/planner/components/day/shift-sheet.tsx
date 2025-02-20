import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import dayjs from "@/lib/dayjs";
import { Shift } from "@/models";
import { Calendar, SquareChartGantt } from "lucide-react";
import { toast } from "sonner";

interface PlannerDayShiftSheetProps {
  shift: Shift;
  children: React.ReactNode;
}

export function PlannerDayShiftSheet({
  shift,
  children,
}: PlannerDayShiftSheetProps) {
  async function handleDeleteShift(shiftToDelete: Shift) {
    const { error } = await deleteShift(shiftToDelete.id);

    if (error) {
      console.error(error);
      return toast.error(error.message);
    }
  }

  return (
    <Sheet key={shift.id}>
      <SheetTrigger asChild>{children}</SheetTrigger>
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

        <SheetFooter className="sm:justify-start mt-4">
          <SheetClose asChild>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="submit">Delete Shift</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the shift for <strong>{shift.employee?.firstname}</strong>{" "}
                    on the{" "}
                    <strong>
                      {shift.shiftService?.shiftServiceType?.type_name}
                    </strong>{" "}
                    shift on{" "}
                    <strong>{dayjs(shift.date).format("DD.MM.YYYY")}</strong>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteShift(shift)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
