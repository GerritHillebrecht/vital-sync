"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { User } from "@supabase/supabase-js";
import { Loader, TriangleAlert } from "lucide-react";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAccount } from "./actions";
import { accountFormSchema } from "./schema";

interface AccountFormType {
  user: User;
}

export function CreateAccountForm({ user }: AccountFormType) {
  const t = useScopedI18n("account.create");
  const [state, formAction, pending] = useActionState(createAccount, {
    message: "",
  });

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      firstname: user.user_metadata.full_name ?? "",
      lastname: user.user_metadata.display_name ?? "",
      auth_id: user.id,
      avatar: user.user_metadata.avatar_url ?? "",
      selected_company: "",
    },
  });

  return (
    <div>
      <h1 className="mb-4">{t("headline")}</h1>
      <Form {...form}>
        <form action={formAction}>
          <div className="max-w-3xl grid md:grid-cols-2 gap-x-4 gap-y-6 mb-4">
            {state.message && (
              <Alert className="mb-4 md:col-span-2">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Sign-in failed.</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("firstname")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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
                <FormItem>
                  <FormLabel>{t("lastname")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      minLength={2}
                      type="text"
                      autoComplete="family-name"
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
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("avatar")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      required
                      minLength={2}
                      type="text"
                      placeholder={t("avatar")}
                    />
                  </FormControl>
                  <FormDescription>
                    Link to an external unsplash file. Hosting will be added
                    soon. Sources other than unsplash are not supported for
                    security reasons.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selected_company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selected Company</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      minLength={2}
                      type="text"
                      placeholder={t("avatar")}
                    />
                  </FormControl>
                  <FormDescription>
                    Link to an external unsplash file. Hosting will be added
                    soon. Sources other than unsplash are not supported for
                    security reasons.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="auth_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auth_id</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      minLength={2}
                      type="text"
                      placeholder={t("avatar")}
                    />
                  </FormControl>
                  <FormDescription>
                    Link to an external unsplash file. Hosting will be added
                    soon. Sources other than unsplash are not supported for
                    security reasons.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  className="object-cover"
                  src={form.getValues().avatar ?? ""}
                  alt={form.getValues().firstname}
                />
                <AvatarFallback>
                  {form.getValues().firstname?.charAt(0)}{" "}
                  {form.getValues().lastname?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
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
