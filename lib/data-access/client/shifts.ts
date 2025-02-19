import { createClient } from "@/lib/supabase/client";
import { Company, Shift } from "@/models";
import { toast } from "sonner";

const supabase = createClient();

export async function getShiftsInRangeForService(
  start: Date,
  end: Date,
  company_id: Company["id"],
  abortController: AbortController = new AbortController()
) {
  const { data: company, error } = await supabase
    .from("companies")
    .select("*, employees(*)")
    .eq("id", company_id)
    .abortSignal(abortController.signal)
    .single();

  if (error || !company.employees) {
    // toast.error(error?.message);
    return { data: null, error };
  }

  return await supabase
    .from("shifts")
    .select("*, employee:employees(*)")
    .abortSignal(abortController.signal)
    .gte("date", start.toISOString())
    .lte("date", end.toISOString())
    .in(
      "employee_id",
      company.employees.map(({ id }) => id)
    );
}

export async function AddShift(shift: Omit<Shift, "id" | "created_at">) {
  const { data: createdShift, error } = await supabase
    .from("shifts")
    .insert(shift)
    .select("*");

  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  return { data: createdShift, error };
}
