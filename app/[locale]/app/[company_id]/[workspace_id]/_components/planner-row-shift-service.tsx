"use client";

import {
  PlannerDayHeadline,
  PlannerDayShiftContainer,
  PlannerDayShiftItemEmployee,
  PlannerRow,
  PlannerRowClientHoverCard,
  PlannerRowContentMonthgridWrapper,
  PlannerRowFooter,
  PlannerRowHeadline,
  PlannerRowHeadlineSubtitle,
  PlannerRowHeadlineTitle,
  PlannerRowMonthGrid,
  usePlanner,
} from "@/components/planner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";

import dayjs from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";
import { ShiftService, Shift } from "@/models";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { PlannerDayAddShift } from "../../../../../../components/planner/components/day/shift-add";

export function PlannerRowShiftService({
  shiftService,
  shifts,
}: {
  shiftService: ShiftService;
  shifts?: Record<string, Shift[]>;
}) {
  const locale = useCurrentLocale();
  const { daysInMonth, company, company_id, workspace_id } = usePlanner();

  return (
    <PlannerRow key={shiftService.id}>
      <PlannerRowHeadline>
        <div className="flex items-center justify-between w-full">
          <div>
            <PlannerRowHeadlineTitle>
              {shiftService.clients
                ?.map(({ firstname }) => `${firstname}`)
                .join(", ")}{" "}
              {shiftService.shiftServiceType?.type_name}
            </PlannerRowHeadlineTitle>
            <PlannerRowHeadlineSubtitle>
              {shifts ? Object.keys(shifts).length : 0} / {daysInMonth} Dienste
              abgedeckt
            </PlannerRowHeadlineSubtitle>
          </div>
          <div className="flex items-center pl-3">
            {shiftService?.clients?.map((client) => (
              <PlannerRowClientHoverCard key={client.id} client={client}>
                <Avatar className="h-10 w-10 -ml-3">
                  <AvatarImage />
                  <AvatarFallback className="border text-xs border-white">
                    {client.firstname.charAt(0)}
                    {client.lastname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </PlannerRowClientHoverCard>
            ))}
          </div>
        </div>
      </PlannerRowHeadline>
      <PlannerRowContentMonthgridWrapper>
        <PlannerRowMonthGrid className="w-full">
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
                  {!isDateSatisfied && (
                    <PlannerDayAddShift
                      employees={company?.employees ?? []}
                      shiftService={shiftService}
                      date={date}
                    />
                  )}
                </PlannerDayShiftContainer>
              </div>
            );
          })}
        </PlannerRowMonthGrid>
      </PlannerRowContentMonthgridWrapper>
      <PlannerRowFooter>
        <Link
          className={buttonVariants({ variant: "link" })}
          href={`/${locale}/app/${company_id}/${workspace_id}/${shiftService.id}`}
        >
          Zum Dienst <ChevronRight />
        </Link>
      </PlannerRowFooter>
    </PlannerRow>
  );
}
