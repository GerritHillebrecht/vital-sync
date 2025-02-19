"use client";

import { LocaleSelector } from "../navigation/locale-selector";
import { Logo } from "./logo";
import { ThemeModeToggle } from "./theme-selector";

export function Footer() {
  return (
    <footer className="py-8 border-t bg-background">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between gap-x-2">
          <Logo />
          <div className="flex items-center gap-x-2">
            <LocaleSelector />
            <ThemeModeToggle />
          </div>
        </nav>
      </div>
    </footer>
  );
}
