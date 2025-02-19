"use client";

import { usePlanner } from "@/components/planner/provider/planner-provider";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FullscreenToggle } from "@/components/ui/fullscreen-selector";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeModeToggle } from "@/components/ui/theme-selector";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export function AppSidebarInset({ children }: { children: ReactNode }) {
  const { isMobile } = useSidebar();
  const locale = useCurrentLocale();
  const t = useScopedI18n("sidebar.inset");

  const { company_id, company, workspace } = usePlanner();

  return (
    <SidebarInset>
      <header className="print:hidden flex justify-between pr-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-x-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    {t("workspace")}
                    <ChevronDown size={12} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/${locale}/app/${company_id}`}>
                          {t("overview")}
                        </Link>
                      </BreadcrumbLink>
                    </DropdownMenuItem>
                    <Separator />
                    {company?.workspaces?.map((workspace) => (
                      <DropdownMenuItem key={workspace.id}>
                        <BreadcrumbLink asChild>
                          <Link
                            href={`/${locale}/app/${company_id}/${workspace.id}`}
                          >
                            <div className="flex items-center gap-x-2">
                              <Badge className="px-[4px] py-[2px] rounded block text-[0.5rem] leading-none">
                                {workspace.workspaceType?.short_name ??
                                  workspace.workspaceType?.name}
                              </Badge>
                              <span>{workspace.workspace_name}</span>
                            </div>
                          </Link>
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    ))}
                    <Separator />
                    <DropdownMenuItem>
                      <BreadcrumbLink asChild>
                        <Link
                          href={`/${locale}/app/${company_id}/workspace/create`}
                        >
                          Add Workspace
                        </Link>
                      </BreadcrumbLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              {!isMobile && (
                <>
                  <BreadcrumbSeparator>
                    <ChevronRight />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{workspace?.workspace_name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-x-1">
          <FullscreenToggle />
          <ThemeModeToggle />
        </div>
      </header>
      <main className="w-full px-4">{children}</main>
    </SidebarInset>
  );
}
