import { Card } from "@/components/ui/card";
import { DataTable } from "../dataTable/TransactionDataTable";
import { column } from "../dataTable/TransactionColumn";
import type { account, transaction } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { getAccountTransactions, getAllAccounts } from "@/apis/getRequests";
import { Card as CustomCard } from "../Card";
import { useState } from "react";

export default function AllAccounts() {
  const [accountNumber, setAccountnumber] = useState<string | null>(null);
  let allAccounts: account[] = [];
  let accountTransactions: transaction[] = [];

  const accountsQuery = useQuery({
    queryKey: ["accounts-query"],
    queryFn: getAllAccounts,
  });

  const accountTransactionsQuery = useQuery({
    queryKey: ["account-transactions", accountNumber],
    queryFn: async () => {
      const data = await getAccountTransactions(accountNumber!);
      return data;
    },
    enabled: Boolean(accountNumber),
  });

  if (accountsQuery.isSuccess) {
    allAccounts = accountsQuery.data.data.content;
  }

  if (accountTransactionsQuery.isSuccess) {
    accountTransactions = accountTransactionsQuery.data.data.content;
  }

  return (
    <Card className="border-inputh-full flex flex-col h-full min-h-0">
      <div className="flex flex-col md:flex-row gap-4 px-4 flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col gap-4 shrink-0 min-h-0">
          <div>
            <h2 className="text-xl font-bold">All Accounts and Cards</h2>
            <span className="text-sm text-muted-foreground">
              All acitve and inactive accounts and cards
            </span>
          </div>
          <div className="flex-1 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto min-h-0">
            {allAccounts.map((a) => (
              <CustomCard
                variant={a.accountType}
                size={"sm"}
                accountName={a.accountName}
                accountNumber={a.accountNumber.substring(8, 13)}
                outstanding={a.outstanding}
                balance={a.balance}
                key={a.accountNumber}
                onClick={() => {
                  setAccountnumber(a.accountNumber);
                }}
              />
            ))}
          </div>
        </div>
        <section className="w-full h-full min-h-0 flex-1 flex overflow-hidden flex-col gap-4">
          <DataTable<transaction> columns={column} data={accountTransactions} />
        </section>
      </div>
    </Card>
  );
}
