"use server";

import { createClient } from "@/lib/supabase/client";
import { Account } from "@/models";

export async function getAccountByAuthID(auth_id: Account["auth_id"]) {
  const supabase = await createClient();

  return await supabase
    .from("accounts")
    .select("*, companies(*, workspaces(*, shiftServices(*, clients(*)), workspaceType:workspaceTypes(*), clients(*)))")
    .eq("auth_id", auth_id)
    .single();
}
