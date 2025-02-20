"use server";

import { createClient } from "@/lib/supabase/server";
import { employeeFormSchema } from "./employee-schema";

export async function createEmployee(
  prevState: { message: string },
  formData: FormData
) {
  const formObject = Object.fromEntries(formData.entries());
  const formattedData = { ...formObject, selected_company: null };
  const result = employeeFormSchema.safeParse(formattedData);

  if (!result.success) {
    return {
      message: "Formdata could not be parsed.",
      success: false,
      errors: result.error.flatten(),
      headline: "Formdata could not be parsed.",
    };
  }

  if (!result.data.company_id) {
    return {
      message: "The company ID is required.",
      success: false,
      headline: "Company ID required.",
    };
  }

  const supabase = await createClient();
  const employeeData = { ...result.data, company_id: undefined };

  const { data: employee, error } = await supabase
    .from("employees")
    .insert(employeeData)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    return {
      message: "Employee could not be created.",
      success: false,
      headline: "Couln't create Employee.",
    };
  }

  console.log({ employee });

  await supabase
    .from("companies_employees")
    .insert({
      employee_id: employee.id,
      company_id: result.data.company_id,
    })
    .select("*")
    .single();

  console.log({ company_id: result.data.company_id });

  return {
    message: "Employee created successfully.",
    success: true,
    headline: "Employee created.",
  };

  //   return redirect(`/app/${company.id}/workspace/create`);
}
