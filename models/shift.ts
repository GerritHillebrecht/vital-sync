import { Employee } from "./employees";
import { ShiftService } from "./shiftService";
import { Tables } from "./supabase.types";

export interface Shift extends Tables<"shifts"> {
  employee?: Tables<"employees">;
  client?: Tables<"clients">;
}

export type GroupedShifts = Record<
  ShiftService["id"] | Employee["id"],
  Record<string, Shift[]>
>;
