"use server";

import { Workspace } from "@/models";
import { workspaceFormSchema } from "./workspace-schema";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createWorkspace(
  prevState: { message: string },
  formData: FormData
) {
  const formObject = Object.fromEntries(formData.entries());
  const formattedData = { ...formObject };
  console.log({ formattedData });
  const result = workspaceFormSchema.safeParse(formattedData);

  if (!result.success) {
    return {
      message: "Formdata could not be parsed.",
      headline: "Error",
      success: false,
    };
  }

  const companyData: Omit<Workspace, "id" | "created_at"> = result.data;

  const supabase = await createClient();

  const { error } = await supabase
    .from("workspaces")
    .insert(companyData)
    .select("*")
    .single();

  if (error) {
    return {
      message: "Workspace could not be created.",
      headline: "Error",
      success: false,
    };
  }
  redirect(`/app/${result.data.company_id}`);

  return {
    message: "Workspace created successfully.",
    headline: "Success",
    success: true,
  };
}
