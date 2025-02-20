"use client";

import { usePlanner } from "@/components/planner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { shiftServiceColors } from "@/lib/colors";
import { shiftServiceIcons } from "@/lib/icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { getShiftServicTypes } from "@/lib/data-access/client";
import { useScopedI18n } from "@/locales/client";
import { ShiftServiceType } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { shiftServiceFormSchema } from "./shift-service-schema";

export function CreateShiftServiceForm() {
  const { workspace_id } = usePlanner();
  const t = useScopedI18n("shiftService.create");
  const [shiftServiceTypes, setShiftServiceTypes] = useState<
    ShiftServiceType[]
  >([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchWorkspaceTypes() {
      const { data: shiftServiceTypes, error } =
        await getShiftServicTypes(abortController);

      if (error) {
        console.error(error);
        return;
      }

      setShiftServiceTypes(shiftServiceTypes);
    }

    fetchWorkspaceTypes();

    return () => abortController.abort();
  }, []);

  const form = useForm<z.infer<typeof shiftServiceFormSchema>>({
    resolver: zodResolver(shiftServiceFormSchema),
    defaultValues: {
      weekdays: "",
      workspace_id,
      shift_service_type_id: "",
      icon_shape: "",
      icon_color: "",
    },
  });

  return (
    <div className="mt-4">
      {/* <pre>
        <code>{JSON.stringify(form, null, 2)}</code>
      </pre> */}
      <Form {...form}>
        <form>
          <div className="grid md:grid-cols-2 gap-x-4">
            <div className="flex flex-col gap-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Icon {t("icon_shape")} & {t("icon_color")}
                  </CardTitle>
                  <CardDescription>
                    These will be reflected in the planner.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="icon_shape"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("icon_shape")}</FormLabel>
                        <ToggleGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          type="single"
                          size="lg"
                          variant="outline"
                        >
                          {Object.entries(shiftServiceIcons).map(
                            ([key, Icon]) => (
                              <ToggleGroupItem
                                key={key}
                                value={key}
                                aria-label={`Toggle ${key}`}
                              >
                                <Icon />
                              </ToggleGroupItem>
                            )
                          )}
                        </ToggleGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="icon_color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("icon_color")}</FormLabel>
                        <ToggleGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          type="single"
                          size="lg"
                          variant="outline"
                        >
                          {Object.entries(shiftServiceColors).map(
                            ([key, color]) => (
                              <ToggleGroupItem
                                key={key}
                                value={key}
                                aria-label={`Toggle ${key}`}
                              >
                                <div
                                  className="w-4 aspect-square rounded-sm"
                                  style={{ backgroundColor: color }}
                                ></div>
                              </ToggleGroupItem>
                            )
                          )}
                        </ToggleGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <FormField
                control={form.control}
                name="shift_service_type_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("shift_service_type_id")}</FormLabel>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("shift_service_type_placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shiftServiceTypes.map((shiftServiceType) => (
                          <SelectItem
                            key={shiftServiceType.id}
                            value={shiftServiceType.id}
                          >
                            {shiftServiceType.type_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weekdays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("weekdays")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        required
                        minLength={2}
                        type="text"
                        placeholder={t("weekdays_placeholder")}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div></div>
          </div>
          <Button type="submit">{t("cta")}</Button>
        </form>
      </Form>
    </div>
  );
}
