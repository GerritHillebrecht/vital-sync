"use client";

import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";
import { Employee, Shift, ShiftService } from "@/models";
import dayjs from "dayjs";
import {
  PlannerDayHeadline,
  PlannerDayShiftContainer,
  PlannerDayShiftItemEmployee,
  PlannerRow,
  PlannerRowContentMonthgridWrapper,
  PlannerRowFooter,
  PlannerRowHeadline,
  PlannerRowHeadlineSubtitle,
  PlannerRowHeadlineTitle,
  PlannerRowMonthGrid,
} from "../components";
import { usePlanner } from "../provider";

export function PlannerViewEmployee({
  employee,
  shiftService,
  shifts,
}: {
  shifts: Record<string, Shift[]>;
  shiftService: ShiftService;
  employee: Employee;
}) {
  const { daysInMonth } = usePlanner();

  const locale = useCurrentLocale();
  const allShiftsOfCurrentEmployee = shifts && Object.values(shifts)?.flat();

  const shiftsOfShiftService = allShiftsOfCurrentEmployee?.filter(
    (shift) => shift.shiftService_id === shiftService.id
  );

  const dayShifts = shiftsOfShiftService?.filter(
    (shift) => shift.shiftService?.shiftServiceType?.type_name === "Tagdienst"
  );
  const nightShifts = shiftsOfShiftService?.filter(
    (shift) => shift.shiftService?.shiftServiceType?.type_name === "Nachtdienst"
  );

  return (
    <PlannerRow>
      <PlannerRowHeadline>
        <div className="flex items-center justify-between w-full">
          <div>
            <PlannerRowHeadlineTitle>
              {employee.firstname} {employee.lastname}
            </PlannerRowHeadlineTitle>
            <PlannerRowHeadlineSubtitle>
              <span>
                {shiftsOfShiftService?.length || 0} / {daysInMonth} Dienste abgedeckt
              </span>
              <span>
                Tagdienste:
                {
                  dayShifts?.filter(
                    (shift) => shift.shiftService_id === shiftService.id
                  ).length  || 0
                }
                ({dayShifts?.length  || 0})
              </span>
              -
              <span>
                Nachtdienste:
                {
                  nightShifts?.filter(
                    (shift) => shift.shiftService_id === shiftService.id
                  ).length  || 0
                }
                ({nightShifts?.length || 0})
              </span>
            </PlannerRowHeadlineSubtitle>
          </div>
        </div>
      </PlannerRowHeadline>
      <PlannerRowContentMonthgridWrapper>
        <PlannerRowMonthGrid>
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const date = dayjs().date(index + 1);
            const shiftsForDay = shifts?.[date.format("DD")] ?? [];
            const isDateSatisfied = shiftsForDay.length > 0;

            return (
              <div
                key={index}
                className={cn(
                  "first-of-type:border-l-0 border-l border-y first-of-type:origin-left last-of-type:origin-right lg:hover:z-20 lg:hover:border-x-[hsl(var(--border))] lg:hover:rounded-sm lg:hover:scale-110 lg:hover:border lg:hover:shadow-lg lg:hover:bg-background transition-all duration-200",
                  date.locale(locale).weekday() === 0 &&
                    "border-l-foreground/25",
                  date.locale(locale).weekday() === 6 &&
                    "border-r-foreground/25"
                )}
              >
                <PlannerDayHeadline
                  date={date}
                  satisfied={isDateSatisfied}
                  className={cn(
                    "border-b",
                    date.locale(locale).weekday() === 0 && "bg-primary/10"
                  )}
                />
                <PlannerDayShiftContainer>
                  {isDateSatisfied && (
                    <PlannerDayShiftItemEmployee
                      shiftService={shiftService}
                      date={date}
                      shifts={shiftsForDay}
                    />
                  )}
                </PlannerDayShiftContainer>
              </div>
            );
          })}
        </PlannerRowMonthGrid>
      </PlannerRowContentMonthgridWrapper>
      <PlannerRowFooter>
        <span>Footer</span>
      </PlannerRowFooter>
    </PlannerRow>
  );
}
