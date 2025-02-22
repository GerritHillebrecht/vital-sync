"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { usePlanner } from "../provider";

export function PlannerLoadingBar() {
  const { shiftsLoading } = usePlanner();

  return (
    shiftsLoading && (
      <Skeleton className="absolute inset-x-0 h-1 bg-primary z-50 top-0"></Skeleton>
    )
  );
}
