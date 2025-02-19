import { createClient } from "@/lib/supabase/client";
import { Company } from "@/models";

const supabase = createClient();

export async function getWorkspaces(
  company_id: Company["id"],
  abortController: AbortController = new AbortController()
) {
  return await supabase
    .from("workspaces")
    .select(
      "*, workspaceType:workspaceTypes(*), shiftServices(*, shiftServiceType:shiftServiceTypes(*), clients(*))"
    )
    .abortSignal(abortController.signal)
    .eq("company_id", company_id);
}

export async function getWorkspace(
  workspace_id: string,
  abortController: AbortController = new AbortController()
) {
  return await supabase
    .from("workspaces")
    .select(
      "*, workspaceType:workspaceTypes(*), shiftServices(*, shiftServiceType(*), clients(*))"
    )
    .eq("id", workspace_id)
    .abortSignal(abortController.signal)
    .single();
}
