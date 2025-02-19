"use server";

import { createClient } from "@/lib/supabase/server";
import { Account } from "@/models";
import { accountFormSchema } from "./schema";
import { redirect } from "next/navigation";
import { getCurrentLocale } from "@/locales/server";

export async function createAccount(
  prevState: { message: string },
  formData: FormData
) {
  const locale = await getCurrentLocale();
  const formObject = Object.fromEntries(formData.entries());
  const formattedData = { ...formObject, selected_company: null };
  console.log({ formData });
  console.log({ formattedData });
  const result = accountFormSchema.safeParse(formattedData);

  if (!result.success) {
    return {
      message: "Formdata could not be parsed.",
      success: false,
      errors: result.error.flatten(),
    };
  }

  const accountData: Omit<Account, "id" | "created_at"> = result.data;

  const supabase = await createClient();
  const { error } = await supabase
    .from("accounts")
    .insert(accountData)
    .select("*");

  if (error) {
    return { message: error.message };
  }

  return redirect(`/${locale}/app`);
}
