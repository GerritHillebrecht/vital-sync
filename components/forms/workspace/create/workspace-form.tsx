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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getWorkspaceTypes } from "@/lib/data-access/client";
import { useScopedI18n } from "@/locales/client";
import { Company, WorkspaceType } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, Loader, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createWorkspace } from "./workspace-actions";
import { workspaceFormSchema } from "./workspace-schema";

interface WorkspaceFormProps {
  company_id: Company["id"];
}

export function CreateWorkspaceForm({ company_id }: WorkspaceFormProps) {
  const [workspaceTypes, setWorkspaceTypes] = useState<WorkspaceType[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchWorkspaceTypes() {
      const { data: workspaceTypes, error } =
        await getWorkspaceTypes(abortController);

      if (error) {
        console.error(error);
        return;
      }

      setWorkspaceTypes(workspaceTypes);
    }

    fetchWorkspaceTypes();

    return () => abortController.abort();
  }, []);

  const t = useScopedI18n("workspace.create");

  const [state, formAction, pending] = useActionState(createWorkspace, {
    message: "",
    success: false,
    headline: "",
  });

  const form = useForm<z.infer<typeof workspaceFormSchema>>({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      workspace_name: "",
      workspace_type_id: "",
      company_id,
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
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workspace_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("workspace_name")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      required
                      minLength={2}
                      type="text"
                      autoComplete="family-name"
                      placeholder={t("workspace_name_placeholder")}
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
              name="workspace_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("workspace_type")}</FormLabel>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("workspace_type_placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workspaceTypes.map((workspaceType) => (
                        <SelectItem
                          key={workspaceType.id}
                          value={workspaceType.id}
                        >
                          {workspaceType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can add new workspace-types in the{" "}
                    <Link href="/app/workspace-types">
                      workspace-type settings
                    </Link>
                    .
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
