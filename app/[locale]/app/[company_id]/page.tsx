"use client";

import { usePlanner } from "@/components/planner";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  const { company_id, company } = usePlanner();

  // Guard clauses
  if (company) {
    if (!company.employees?.length) {
      return redirect(`/app/${company_id}/employees`);
    }

    if (!company.workspaces?.length) {
      return redirect(`/app/${company_id}/workspace/create`);
    }

    if (company.workspaces?.length === 1) {
      return redirect(`/app/${company_id}/${company.workspaces[0].id}/overview`);
    }
  }

  return (
    <div>
      <h1>Workspaces</h1>
      <ul>
        {company?.workspaces?.map((workspace) => (
          <li key={workspace.id}>
            <Link href={`/app/${company_id}/${workspace.id}`}>
              {workspace.workspace_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
