import { ReactNode } from "react";

export function PlannerRowHeadline({ children }: { children: ReactNode }) {
  return <div className="px-4 lg:px-6 py-2 lg:py-4 flex flex-col gap-2">{children}</div>;
}
