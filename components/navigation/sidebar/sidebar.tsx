"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { CompanySwitcher } from "./sidebar-company-switcher";
import { AppSidebarFooter } from "./sidebar-footer";
import { NavWorkspaces } from "./sidebar-nav-workspaces";
import { NavCompany } from "./sidebar-nav-company";

export function AppSiderbar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanySwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavCompany />
        <NavWorkspaces />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
