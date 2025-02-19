import { Footer } from "@/components/ui/footer";
import { getStaticParams } from "@/locales/server";
import { I18nProviderClient } from "@/locales/client";
import { CSPostHogProvider, ReactQueryClientProvider } from "@/provider";
import { ReactNode } from "react";

export function generateStaticParams() {
  return getStaticParams();
}

// const queryClient = new QueryClient();

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}

export default async function Layout({ params, children }: LayoutProps) {
  const { locale } = await params;

  return (
    <I18nProviderClient locale={locale}>
      <CSPostHogProvider>
        <ReactQueryClientProvider>
          {children}
          <Footer />
        </ReactQueryClientProvider>
      </CSPostHogProvider>
    </I18nProviderClient>
  );
}
