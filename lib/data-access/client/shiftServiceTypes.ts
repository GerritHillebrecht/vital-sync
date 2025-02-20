import { createClient } from "@/lib/supabase/client";

export async function getShiftServicTypes(
  abortController = new AbortController()
) {
  const supabase = createClient();
  return await supabase
    .from("shiftServiceType")
    .select("*")
    .order("type_name")
    .abortSignal(abortController.signal);
}
