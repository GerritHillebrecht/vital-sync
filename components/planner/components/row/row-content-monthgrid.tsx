"use client";

import { ReactNode } from "react";
import { usePlanner } from "../../provider";
import { cn } from "@/lib/utils";

interface PlannerRowProps {
  children: ReactNode;
  className?: string;
}

export function PlannerRowMonthGrid({ children, className }: PlannerRowProps) {
  const { daysInMonth } = usePlanner();

  return (
    <div
      className={cn("grid", className)}
      style={{ gridTemplateColumns: `repeat(${daysInMonth}, 1fr)` }}
    >
      {children}
    </div>
  );
}
