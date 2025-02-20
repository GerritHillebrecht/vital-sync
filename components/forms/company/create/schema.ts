import { Company } from "@/models";
import { z } from "zod";

export const companyFormSchema: z.ZodType<Omit<Company, "id" | "created_at">> =
  z.object({
    company_name: z.string().min(1, "Company name is required"),
    short_name: z.string().min(1, "Company shortname is required"),
    street_name: z.string().min(1, "Street name is required").nullable(),
    street_number: z.string().min(1, "Street number is required").nullable(),
    postal_code: z
      .string()
      .min(1, "Postal code is required")
      .max(5, "Postal Code is too long")
      .nullable(),
    city: z.string().min(1, "City is required").nullable(),
    country: z.string().min(1, "Country is required").nullable(),
  });
