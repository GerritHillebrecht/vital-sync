"use client";

import { ChevronRight, UserRound } from "lucide-react";

import { usePlanner } from "@/components/planner";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavCompany() {
  const { company } = usePlanner();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {company?.short_name ?? company?.company_name}
      </SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={`Mitarbeiter ${company?.company_name}`}
              >
                <UserRound />
                <span>Mitarbeiter</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {company?.employees?.map((employee) => (
                  <SidebarMenuSubItem key={employee.id}>
                    <SidebarMenuSubButton asChild>
                      <Link href="#">
                        <span>
                          {employee.firstname} {employee.lastname}
                        </span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        {/* <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={`Einstellungen ${workspace.workspace_name}`}
              >
                <Settings />
                <span>Settings</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href="#">Workspace Settings</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
