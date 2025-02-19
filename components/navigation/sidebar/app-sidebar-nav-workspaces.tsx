"use client";

import { CalendarRange, ChevronRight, Settings } from "lucide-react";

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
import { useCurrentLocale } from "@/locales/client";
import Link from "next/link";

export function NavWorkspaces() {
  const { company, company_id, workspace_id } = usePlanner();
  const locale = useCurrentLocale();

  return company?.workspaces?.map((workspace) => (
    <SidebarGroup key={workspace.id}>
      <SidebarGroupLabel>{workspace.workspace_name}</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible
          asChild
          defaultOpen={workspace.id === workspace_id}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={`Dienstpläne ${workspace.workspace_name}`}
              >
                <CalendarRange />
                <span>Dienstpläne</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {workspace.shiftServices?.map((shiftService) => (
                  <SidebarMenuSubItem key={shiftService.id}>
                    <SidebarMenuSubButton asChild>
                      <Link
                        href={`/${locale}/app/${company_id}/${workspace.id}/${shiftService.id}`}
                      >
                        <span>
                          {shiftService.clients
                            ?.map(({ firstname }) => firstname)
                            .join(", ")}{" "}
                          {shiftService.shiftServiceType?.type_name}
                        </span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
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
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  ));
}
