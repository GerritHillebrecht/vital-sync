"use server";

import { Company } from "@/models";
import { createClient } from "../supabase/server";

export async function getWorkspaces(company_id: Company["id"]) {
  const supabase = await createClient();

  return supabase.from("workspaces").select("*").eq("company_id", company_id);
}
