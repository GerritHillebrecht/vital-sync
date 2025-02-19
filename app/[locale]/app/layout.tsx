import {
  AppSidebarInset,
  AppSiderbar,
  SidebarProvider,
} from "@/components/navigation";
import { PlannerContextProvider } from "@/components/planner";

import { AccountContextProvider } from "@/provider";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  console.log("Rendering Layout /app/[locale]/app/layout.tsx");

  return (
    <AccountContextProvider>
      <PlannerContextProvider>
        <SidebarProvider>
          <AppSiderbar />
          <AppSidebarInset>{children}</AppSidebarInset>
        </SidebarProvider>
      </PlannerContextProvider>
    </AccountContextProvider>
  );
}
