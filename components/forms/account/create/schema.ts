import { Account } from "@/models";
import { z } from "zod";

export const accountFormSchema: z.ZodType<Omit<Account, "id" | "created_at">> =
  z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    auth_id: z.string().min(1, "Auth ID is required"),
    avatar: z.string().min(1,"").nullable(),
    selected_company: z.string().nullable(),
  });
