"use server";

import { createClient } from "@/lib/supabase/server";
import { Company } from "@/models";
import { redirect } from "next/navigation";
import { companyFormSchema } from "./schema";
import { getCurrentLocale } from "@/locales/server";
import { getAccountByAuthID, getUser } from "@/lib/data-access";

export async function createCompany(
  prevState: { message: string },
  formData: FormData
) {
  const locale = await getCurrentLocale();
  const formObject = Object.fromEntries(formData.entries());
  const formattedData = { ...formObject, selected_company: null };
  const result = companyFormSchema.safeParse(formattedData);

  if (!result.success) {
    return {
      message: "Formdata could not be parsed.",
      success: false,
      errors: result.error.flatten(),
    };
  }

  const companyData: Omit<Company, "id" | "created_at"> = result.data;

  const supabase = await createClient();
  const { data: company, error } = await supabase
    .from("companies")
    .insert(companyData)
    .select("*")
    .single();

  if (error || !company) {
    return { message: error?.message ?? "" };
  }

  const {
    data: { user },
  } = await getUser();

  if (!user) {
    return redirect(`/${locale}/auth/login`);
  }

  const { data: account } = await getAccountByAuthID(user.id);

  if (!account) {
    return redirect(`/${locale}/app/account/create`);
  }

  const { data, error: workspaceError } = await supabase
    .from("accounts_companies")
    .insert({
      account_id: account.id,
      company_id: company.id,
    })
    .single();

  if (workspaceError || !data) {
    return { message: workspaceError.message };
  }

  return redirect(`/${locale}/app/${company.id}/workspace/create`);
}
