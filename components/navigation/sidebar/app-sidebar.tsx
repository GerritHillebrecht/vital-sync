"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CompanySwitcher } from "./app-sidebar-company-switcher";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { NavWorkspaces } from "./app-sidebar-nav-workspaces";
import { NavCompany } from "./app-sidebar-nav-company";

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

        {/* <NavWorkspace />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
