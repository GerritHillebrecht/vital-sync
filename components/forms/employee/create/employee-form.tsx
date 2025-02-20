"use client";

import { usePlanner } from "@/components/planner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useScopedI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, Loader, TriangleAlert } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createEmployee } from "./employee-actions";
import { employeeFormSchema } from "./employee-schema";

export function CreateEmployeeForm() {
  const t = useScopedI18n("employee.create");
  const [state, formAction, pending] = useActionState(createEmployee, {
    message: "",
    success: false,
    headline: "",
  });
  const { company_id } = usePlanner();

  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone_number: "",
      company_id,
    },
  });

  useEffect(() => {
    if (state.success) {
      form.reset();
      window.location.reload();
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form action={formAction}>
        <div className="mb-4">
          {state.message && (
            <Alert className="mb-4 md:col-span-2">
              {!state.success && <TriangleAlert className="h-4 w-4" />}
              {state.success && <BadgeCheck className="h-4 w-4" />}
              <AlertTitle>{state.headline}</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="company_id"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    required
                    minLength={2}
                    type="text"
                    autoComplete="given-name"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("firstname")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    required
                    minLength={2}
                    type="text"
                    autoComplete="given-name"
                    placeholder={t("firstname_placeholder")}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{t("lastname")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    required
                    minLength={2}
                    type="text"
                    autoComplete="given-name"
                    placeholder={t("lastname_placeholder")}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{t("phone_number")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    required
                    minLength={2}
                    type="text"
                    autoComplete="given-name"
                    placeholder={t("phone_number_placeholder")}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    required
                    minLength={2}
                    type="text"
                    autoComplete="given-name"
                    placeholder={t("email_placeholder")}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          {t("cta")} {pending && <Loader className="animate-spin" size={16} />}
        </Button>
      </form>
    </Form>
  );
}
