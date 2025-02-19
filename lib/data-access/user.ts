"use server";

import { createClient } from "../supabase/server";

export async function getUser() {
  const supabase = await createClient();

  return await supabase.auth.getUser();
}
