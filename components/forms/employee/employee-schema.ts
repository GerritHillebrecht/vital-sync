import { Company, Employee } from "@/models";
import { z } from "zod";

export const employeeFormSchema: z.ZodType<
  Omit<Employee, "id" | "created_at"> & { company_id: Company["id"] }
> = z.object({
  firstname: z.string().min(1, "The given name is required."),
  lastname: z.string().min(1, "The birthname is required."),
  email: z.string().email("Enter a valid E-Mail address.").nullable(),
  phone_number: z.string().nullable(),
  company_id: z.string().uuid("The company ID is required."),
});
