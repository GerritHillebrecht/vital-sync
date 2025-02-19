import { Employee } from "./employees";
import { Tables } from "./supabase.types";
import { Workspace } from "./workspace";

export interface Company extends Tables<"companies"> {
  workspaces?: Workspace[];
  employees?: Employee[];
}
