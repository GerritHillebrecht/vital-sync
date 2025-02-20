"use client";

import { createClient } from "@/lib/supabase/client";
import { Account } from "@/models";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const supabase = createClient();

interface AccountContextType {
  user: User | null;
  setUser: (user: User) => void;

  account: Account | null;
  accountIsLoading: boolean;
  setAccount: (account: Account) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountContextProviderProps {
  children: React.ReactNode;
}

export function AccountContextProvider({
  children,
}: AccountContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [accountIsLoading, setAccountIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  useEffect(() => {
    async function getAccount() {
      if (user) {
        setAccountIsLoading(true);
        const { data: account, error } = await supabase
          .from("accounts")
          .select(
            "*, companies(*, workspaces(*, shiftServices(*, clients(*)), workspaceType:workspaceTypes(*), clients!clients_workspace_id_fkey(*)))"
          )
          .single();

        setAccount(account);
        setAccountIsLoading(false);

        if (!account) {
          redirect("/account/create");
        }

        if (!account?.companies) {
          redirect("/app/company/create");
        }
      }
    }

    if (user) {
      getAccount();
    }
  }, [user]);

  const value: AccountContextType = {
    user,
    account,
    accountIsLoading,
    setUser,
    setAccount,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);

  if (context === undefined) {
    throw new Error("useAccount must be used within a AccountContextProvider");
  }

  return context;
}
