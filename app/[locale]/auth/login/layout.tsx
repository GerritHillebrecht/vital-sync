import { getStaticParams } from "@/locales/server";

export function generateStaticParams() {
  return getStaticParams();
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
