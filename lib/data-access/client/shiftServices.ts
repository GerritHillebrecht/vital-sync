import { createClient } from "@/lib/supabase/client";
import { ShiftService } from "@/models/shiftService";

const supbase = createClient();

export async function getShiftService(
  shiftService_id: ShiftService["id"],
  abortController: AbortController
) {
  return await supbase
    .from("shiftServices")
    .select("*, shiftServiceType(*), clients(*)")
    .eq("id", shiftService_id)
    .abortSignal(abortController.signal)
    .single();
}
