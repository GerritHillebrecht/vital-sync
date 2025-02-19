"use server";

import { createClient } from "../supabase/server";

export async function getCompanies() {
  const supabase = await createClient();

  return await supabase
    .from("companies")
    .select("*, workspaces(*, workspaceType:workspaceTypes(*))");
}
