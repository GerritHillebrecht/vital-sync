import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export function PlannerRowContentMonthgridWrapper({ children }: WrapperProps) {
  return (
    <div className="grid">
      <div className="w-full overflow-x-auto max-w-full py-20 -my-20">
        <div className="wrapper relative grid">{children}</div>
      </div>
    </div>
  );
}
