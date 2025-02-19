import { Footer } from "@/components/ui/footer";
import { ReactNode } from "react";
import { I18nProviderClient } from "../../locales/client";
import { CSPostHogProvider } from "@/provider";
import { getStaticParams } from "@/locales/server";

export function generateStaticParams() {
  return getStaticParams();
}

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}

export default async function Layout({ params, children }: LayoutProps) {
  const { locale } = await params;

  return (
    <I18nProviderClient locale={locale}>
      <CSPostHogProvider>
        {children}
        <Footer />
      </CSPostHogProvider>
    </I18nProviderClient>
  );
}
