import { createClient } from "@/lib/supabase/client";

export async function getWorkspaceTypes(
  abortController = new AbortController()
) {
  const supabase = createClient();
  return await supabase
    .from("workspaceTypes")
    .select("*")
    .order("name")
    .abortSignal(abortController.signal);
}
