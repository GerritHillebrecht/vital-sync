"use client";

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
import { Separator } from "@/components/ui/separator";
import { useScopedI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, TriangleAlert } from "lucide-react";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCompany } from "./actions";
import { companyFormSchema } from "./schema";

export function CreateCompanyForm() {
  const t = useScopedI18n("company.create");
  const [state, formAction, pending] = useActionState(createCompany, {
    message: "",
  });

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      company_name: "",
      short_name: "",
      street_name: "",
      street_number: "",
      postal_code: "",
      city: "",
      country: "",
    },
  });

  return (
    <div className="relative">
      <h1 className="mb-8 text-2xl lg:text-3xl font-bold">{t("headline")}</h1>
      <Form {...form}>
        <form action={formAction} className="max-w-2xl">
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-6 mb-4">
            {state.message && (
              <Alert className="mb-4 md:col-span-2">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Sign-in failed.</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("company_name")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      required
                      minLength={2}
                      type="text"
                      autoComplete="given-name"
                      placeholder={t("company_name_placeholder")}
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
              name="short_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("short_name")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      required
                      minLength={2}
                      type="text"
                      autoComplete="family-name"
                      placeholder={t("short_name_placeholder")}
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
          <div className="py-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="px-3 rounded bg-background text-[0.5rem] font-bold uppercase tracking-widest">
                {t("separator_text")}
              </p>
            </div>
            <Separator />
          </div>
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-6 mb-4">
            <FormField
              control={form.control}
              name="street_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("street_name")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      required
                      minLength={2}
                      type="text"
                      autoComplete="family-name"
                      placeholder={t("street_name_placeholder")}
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
              name="street_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("street_number")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      required
                      minLength={2}
                      type="text"
                      autoComplete="family-name"
                      placeholder={t("street_number_placeholder")}
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
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("postal_code")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      required
                      minLength={2}
                      type="text"
                      autoComplete="family-name"
                      placeholder={t("postal_code_placeholder")}
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("city")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      required
                      minLength={2}
                      type="text"
                      autoComplete="family-name"
                      placeholder={t("city_placeholder")}
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
            {t("cta")}{" "}
            {pending && <Loader className="animate-spin" size={16} />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
