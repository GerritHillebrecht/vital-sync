import { Company } from "@/models";
import { z } from "zod";

export const companyFormSchema: z.ZodType<Omit<Company, "id" | "created_at">> =
  z.object({
    company_name: z.string().min(1, "Company name is required"),
    short_name: z.string().min(1, "Company shortname is required"),
  });
