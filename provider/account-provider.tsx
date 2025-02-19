"use client";

import { createClient } from "@/lib/supabase/client";
import { Account } from "@/models";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

const supabase = createClient();

interface AccountContextType {
  user: User | null;
  setUser: (user: User) => void;

  account: Account | null;
  setAccount: (account: Account) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountContextProviderProps {
  children: React.ReactNode;
  // user: AccountContextType["user"];
  // account: AccountContextType["account"];
}

export function AccountContextProvider({
  children,
  // user: initialUser,
  // account: initialAccount,
}: AccountContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

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
        const { data: account, error } = await supabase
          .from("accounts")
          .select("*, companies(*, workspaces(*, shiftServices(*, clients(*)), workspaceType:workspaceTypes(*), clients(*)))")
          // .eq("auth_id", user.id)
          .single();

        setAccount(account);
      }
    }

    if (user) {
      getAccount();
    }
  }, [user]);

  const value: AccountContextType = { user, account, setUser, setAccount };

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
