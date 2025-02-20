"use client";

import { ChevronsUpDown, GalleryVerticalEnd, Plus } from "lucide-react";

import { usePlanner } from "@/components/planner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useParams } from "next/navigation";

export function WorkspaceSwitcher() {
  const { locale, company_id } = useParams();
  const { isMobile } = useSidebar();
  const { company: activeCompany, workspace: activeWorkspace } = usePlanner();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* <activeWorkspace.logo GalleryVerticalEnd className="size-4" /> */}
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {activeWorkspace && (
                  <>
                    <span className="truncate font-semibold">
                      {activeWorkspace.workspace_name}
                    </span>
                    <span className="truncate text-xs">
                      {activeWorkspace.workspaceType?.name ?? "Free"}
                    </span>
                  </>
                )}
                {!activeWorkspace && (
                  <>
                    <Skeleton className="w-20 h-3 mb-1" />
                    <Skeleton className="w-8 h-2" />
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspace
            </DropdownMenuLabel>
            {activeCompany?.workspaces?.map((workspace, index) => (
              <Link
                key={workspace.id}
                href={`/${locale}/app/${company_id}/${workspace.id}`}
              >
                <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {/* <workspace.logo className="size-4 shrink-0" /> */}
                    <GalleryVerticalEnd className="size-4 shrink-0" />
                  </div>
                  {workspace.workspace_name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />

            <Link href="/ws">
              <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add Workspace
                </div>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
