"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import dayjs, { Dayjs } from "@/lib/dayjs";
import { shiftServiceIcons } from "@/lib/icons";
import { Shift, ShiftService } from "@/models";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CalendarIcon } from "lucide-react";

interface PlannerDayShiftItemProps {
  shiftService: ShiftService;
  type: "employee" | "service";
  date: Dayjs;
  shifts: Shift[];
}

export function PlannerDayShiftItem({
  shiftService,
  type,
  shifts,
}: PlannerDayShiftItemProps) {
  const icon_shape = shiftService.icon_shape as keyof typeof shiftServiceIcons;
  const IconComponent = shiftServiceIcons[icon_shape];

  console.log({ shifts });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="absolute cursor-pointer inset-0 flex items-center justify-center lg:hover:bg-muted-foreground/10">
          {type === "employee" && (
            <>
              <IconComponent
                className="text-cyan-700"
                color={shiftService.icon_color}
                size={34}
                strokeWidth={0.75}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[0.5rem]">
                  {shiftService.shiftServiceType?.type_name.charAt(0)}
                  {shiftService.clients?.[0].firstname.charAt(0)}
                  {shiftService.clients?.[0].lastname.charAt(0)}
                </span>
              </div>
            </>
          )}
          {type === "service" && (
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
                            {shift.employee?.firstname}{" "}
                            {shift.employee?.lastname}
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
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
