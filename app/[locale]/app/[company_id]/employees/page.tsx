"use client";

import { usePlanner } from "@/components/planner";
import { EmployeeCard } from "../../_components/employee_card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateEmployeeForm } from "@/components/forms/employee/create/employee-form";
import { useScopedI18n } from "@/locales/client";

export default function Page() {
  const { company } = usePlanner();
  const t = useScopedI18n("employee.create");

  return (
    <div>
      <div className="grid md:grid-cols-[2fr,1fr] gap-4">
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>{t("headline")}</CardTitle>
            </CardHeader>
            <CardContent>
              {company?.employees?.length === 0 && <p>{t("noEmployees")}</p>}
              {!!company?.employees?.length && (
                <div className="flex flex-col gap-4">
                  {company?.employees?.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="order-first md:order-last">
          <Card>
            <CardHeader>
              <CardTitle>Add Employee</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateEmployeeForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
