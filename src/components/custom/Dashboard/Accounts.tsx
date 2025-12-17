import SimpleHeading from "../SimpleHeading";
import { Card } from "../Card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getAllAccounts } from "@/apis/getRequests";
import type { AuthContextValue } from "@/types/types";

export default function Accounts() {
  const auth: AuthContextValue = useAuth();

  const accountsQuery = useQuery({
    queryKey: ["accounts-query"],
    queryFn: async () => {
      const data = await getAllAccounts(auth.userId!);
      return data;
    },
  });

  if (accountsQuery.isSuccess) {
    return (
      <section className="flex flex-col gap-5">
        <SimpleHeading text="Accounts" />
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 p-4">
            {accountsQuery.data.data.content.map((c) => (
              <Card
                variant={c.accountType}
                accountName={c.bankName}
                accountNumber={c.accountNumber.substring(8, 13)}
                outstanding={c.outstanding}
                balance={c.balance}
                key={c.accountNumber}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    );
  }
}
