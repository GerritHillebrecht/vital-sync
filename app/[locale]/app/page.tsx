"use client";

import { useAccount } from "@/provider";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { Companies } from "./_components/companies-selector";

export default function Page() {
  const { accountIsLoading, account } = useAccount();

  if (account && (account?.companies?.length || 0) === 0) {
    return redirect("/app/company/create");
  }

  if (account?.companies?.length === 1) {
    return redirect(`/app/${account.companies[0].id}`);
  }

  return (
    <div className="flex items-center justify-center h-96">
      {accountIsLoading && (
        <Loader className="animate-spin lg:w-8 aspect-square" />
      )}
      {!accountIsLoading && <Companies />}
    </div>
  );
}
