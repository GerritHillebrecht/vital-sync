import { Client } from "./clients";
import { Tables } from "./supabase.types";
import { ShiftService } from "./shiftService";

export interface Workspace extends Tables<"workspaces"> {
  workspaceType?: Tables<"workspaceTypes">;
  clients?: Client[];
  shiftServices?: ShiftService[];
}
