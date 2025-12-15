import SimpleHeading from "../SimpleHeading";
import { Card } from "../Card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserIdContext } from "@/context/context";
import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllAccounst } from "@/apis/getRequests";
import { useNavigate } from "react-router";
import type { userIdContext } from "@/types/types";

export default function Accounts() {
  const userId: userIdContext | undefined = useContext(UserIdContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId?.userId == "") {
      navigate("/login", { replace: true });
      return;
    }
  });

  const accountsQuery = useQuery({
    queryKey: ["accounts-query"],
    queryFn: async () => {
      const data = await getAllAccounst(userId!.userId);
      return data;
    },
  });

  if (accountsQuery.isSuccess) {
    if (accountsQuery.data.data.numberOfElements == 0) {
      navigate("/create-account", { replace: true });
      return;
    }
  }

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
