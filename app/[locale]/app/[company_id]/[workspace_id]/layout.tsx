import { Planner } from "@/components/planner";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  console.log(
    "Rendering Layout /app/[locale]/[company_id]/[workspace_id]/layout.tsx"
  );
  return <Planner>{children}</Planner>;
}
