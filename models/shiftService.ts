import { Client } from "./clients";
import { Employee } from "./employees";
import { ShiftServiceType } from "./shiftServiceType";
import { Tables } from "./supabase.types";

export interface ShiftService extends Tables<"shiftServices"> {
  clients?: Client[];
  shiftServiceType?: ShiftServiceType;
  employees?: Employee[];
}
