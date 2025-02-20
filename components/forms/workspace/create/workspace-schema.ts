import { Workspace } from "@/models";
import { z } from "zod";

export const workspaceFormSchema: z.ZodType<
  Omit<Workspace, "id" | "created_at">
> = z.object({
  workspace_name: z.string().min(1, "Company name is required"),
  workspace_type_id: z.string().uuid("Type-id is required"),
  company_id: z.string().uuid("Company-id is required"),
});
