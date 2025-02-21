import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import dayjs from "@/lib/dayjs";
import { Shift } from "@/models";
import { CalendarIcon } from "lucide-react";

interface PlannerDayShiftHoverCardProps {
  shift: Shift;
  children: React.ReactNode;
}

export function PlannerDayShiftHoverCard({
  shift,
  children,
}: PlannerDayShiftHoverCardProps) {
  return (
    <HoverCard key={shift.id}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent side="top" className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage
              src={shift.employee?.firstname ?? "https://github.com/vercel.png"}
            />
            <AvatarFallback>
              {shift.employee?.firstname.charAt(0)}
              {shift.employee?.lastname?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 w-full">
            <h4 className="text-sm font-semibold">
              {shift.employee?.firstname} {shift.employee?.lastname}
            </h4>
            <p className="text-sm">
              {shift.shiftService?.clients
                ?.map(({ firstname }) => firstname)
                .join(", ")}{" "}
              {shift.shiftService?.shiftServiceType?.type_name}
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
  );
}
