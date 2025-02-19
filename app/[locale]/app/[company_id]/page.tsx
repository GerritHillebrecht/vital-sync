import { getWorkspaces } from "@/lib/data-access";
import { getCurrentLocale } from "@/locales/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ company_id: string }>;
}) {
  const locale = await getCurrentLocale();
  const { company_id } = await params;
  const { data: workspaces } = await getWorkspaces(company_id);

  if (!workspaces?.length) {
    return redirect(`/${locale}/app/${company_id}/workspace/create`);
  }

  return (
    <div>
      <h1>Workspaces</h1>
      <ul>
        {workspaces?.map((workspace) => (
          <li key={workspace.id}>
            <Link href={`/${locale}/app/${company_id}/${workspace.id}`}>
              {workspace.workspace_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
