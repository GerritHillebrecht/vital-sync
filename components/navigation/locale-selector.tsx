"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentLocale, useChangeLocale, useI18n } from "@/locales/client";
import { US, DE, type FlagComponent } from "country-flag-icons/react/3x2";

export function LocaleSelector() {
  const locale = useCurrentLocale();
  const t = useI18n();
  const changeLocale = useChangeLocale();

  function handleLocaleChange(locale: string) {
    changeLocale(locale as ReturnType<typeof useCurrentLocale>);
  }

  const locales: {
    locale: ReturnType<typeof useCurrentLocale>;
    name: string;
    flag: FlagComponent;
  }[] = [
    {
      locale: "de",
      name: "Deutsch",
      flag: DE,
    },
    {
      locale: "en",
      name: "English",
      flag: US,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{t("localeName")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("localeSelectorDescription")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleLocaleChange}
        >
          {locales.map((locale) => (
            <DropdownMenuRadioItem key={locale.locale} value={locale.locale}>
              <locale.flag className="w-4 mr-2" />
              {locale.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
