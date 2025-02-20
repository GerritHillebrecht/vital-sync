import { ShiftService } from "@/models";
import { z } from "zod";

export const shiftServiceFormSchema: z.ZodType<
  Omit<ShiftService, "id" | "created_at">
> = z.object({
  service_name: z.string().min(1, "Service name is required."),
  weekdays: z.string(),
  workspace_id: z.string().uuid("The workspace is required."),
  shift_service_type_id: z.string().uuid("The shift service type is required."),
  icon_shape: z.string(),
  icon_color: z.string(),
});
