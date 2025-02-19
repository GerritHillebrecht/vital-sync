import { ReactNode } from "react";

export function PlannerRowHeadlineTitle({ children }: { children: ReactNode }) {
  return <h5 className="lg:text-xl font-bold">{children}</h5>;
}
