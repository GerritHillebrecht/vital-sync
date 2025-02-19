import { Company } from "./company";
import { Tables } from "./supabase.types";

export interface Account extends Tables<"accounts"> {
  companies?: Company[];
  email?: string;
}
