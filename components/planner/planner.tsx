import { PlannerLoadingBar } from "./components/loading-bar";
import { PlannerToolbar } from "./components/toolbar";

interface PlannerProps {
  children?: React.ReactNode;
}

export function Planner({ children }: PlannerProps) {
  return (
    <>
      <PlannerLoadingBar />
      <PlannerToolbar className="mb-4 mt-2" />
      <div className="grid gap-y-4">{children}</div>
    </>
  );
}
