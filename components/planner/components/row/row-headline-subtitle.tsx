import { ReactNode } from "react";

export function PlannerRowHeadlineSubtitle({ children }: { children: ReactNode }) {
  return <h5 className="text-xs lg:text-sm opacity-75">{children}</h5>;
}
