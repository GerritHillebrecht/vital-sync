import { Shift } from "./shift";
import { Tables } from "./supabase.types";

export interface Client extends Tables<"clients"> {
  shifts?: Shift[];
}
