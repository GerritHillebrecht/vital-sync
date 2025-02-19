"use client";

import { Badge } from "@/components/ui/badge";
import { useCurrentLocale } from "@/locales/client";
import { useAccount } from "@/provider";
import Link from "next/link";

export function Companies() {
  const locale = useCurrentLocale();
  const { account } = useAccount();

  return (
    <div className="flex flex-col gap-4">
      {account?.companies?.map((company) => (
        <div key={company.id} className="border rounded-xl shadow p-6">
          <Link href={`/${locale}/app/${company.id}`}>
            {company.company_name}
          </Link>
          <div className="flex flex-col gap-4 mt-4">
            {company.workspaces?.map((workspace) => (
              <div
                key={workspace.id}
                className="flex items-center gap-4 border shadow p-4 rounded-xl"
              >
                <Link href={`/${locale}/app/${company.id}/${workspace.id}`}>
                  <span>{workspace.workspace_name}</span>
                </Link>
                <Badge className="ml-1">
                  {workspace.workspaceType?.short_name}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
