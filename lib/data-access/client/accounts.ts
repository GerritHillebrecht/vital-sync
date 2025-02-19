import { createClient } from "@/lib/supabase/client";

const supbase = createClient();

export async function getAccounts(
  abortController: AbortController = new AbortController()
) {
  return await supbase
    .from("accounts")
    .select(
      "*, companies(*, workspaces(*, shiftServices(*, clients(*)), workspaceType:workspaceTypes(*), clients(*)))"
    )
    .abortSignal(abortController.signal)
    .single();
}
