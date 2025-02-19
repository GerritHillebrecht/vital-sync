import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getCompanies(abortController: AbortController = new AbortController()) {
  return await supabase.from("companies").select("*").abortSignal(abortController.signal);
}

export async function getCompany(
  company_id: string,
  abortController: AbortController = new AbortController()
) {
  return await supabase
    .from("companies")
    .select("*, employees(*), workspaces(*, clients(*), shiftServices(*, clients(*), shiftServiceType(*)), workspaceType:workspaceTypes(*))")
    .eq("id", company_id)
    .abortSignal(abortController.signal)
    .single();
}
