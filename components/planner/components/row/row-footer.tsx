import { ReactNode } from "react";

export function PlannerRowFooter({ children }: { children: ReactNode }) {
  return <footer className="py-1 px-2 bg-background ">{children}</footer>;
}
