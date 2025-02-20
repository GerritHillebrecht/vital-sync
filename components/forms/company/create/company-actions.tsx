"use server";

import { createClient } from "@/lib/supabase/server";
import { Company } from "@/models";
import { redirect } from "next/navigation";
import { companyFormSchema } from "./company-schema";
import { getCurrentLocale } from "@/locales/server";
import { getAccountByAuthID, getUser } from "@/lib/data-access";

export async function createCompany(
  prevState: { message: string },
  formData: FormData
) {
  const locale = await getCurrentLocale();
  const formObject = Object.fromEntries(formData.entries());
  const formattedData = { ...formObject };
  const result = companyFormSchema.safeParse(formattedData);
  console.log({ formattedData });
  console.log({ error: result.error });
  if (!result.success) {
    return {
      message: "Formdata could not be parsed.",
      success: false,
      errors: result.error.flatten(),
    };
  }

  const companyData: Omit<Company, "id" | "created_at"> = result.data;

  const {
    data: { user },
  } = await getUser();

  if (!user) {
    return redirect(`/${locale}/auth/login`);
  }

  const { data: account, error: accoutError } = await getAccountByAuthID(
    user.id
  );

  console.log({ account, accoutError });

  if (!account) {
    return redirect(`/account/create`);
  }

  const supabase = await createClient();
  const { data: company, error } = await supabase
    .from("companies")
    .insert(companyData)
    .select("*")
    .single();

  console.log({ company, error });

  if (error || !company) {
    return { message: error?.message ?? "" , errors: null };
  }

  const { data, error: companyError } = await supabase
    .from("accounts_companies")
    .insert({
      account_id: account.id,
      company_id: company.id,
    })
    .select("*")
    .single();

  if (companyError || !data) {
    return { message: companyError.message, errors: undefined };
  }

  return redirect(`/${locale}/app/${company.id}/workspace/create`);
}
