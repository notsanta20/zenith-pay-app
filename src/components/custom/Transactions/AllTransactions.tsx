import { getAllTransactions } from "@/apis/getRequests";
import type { transaction } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../dataTable/TransactionDataTable";
import { column } from "../dataTable/TransactionColumn";

export default function AllTransactions() {
  let allTransactions: Array<transaction> | null = null;

  const transactionQuery = useQuery({
    queryKey: ["all-transactions"],
    queryFn: async () => {
      const data = await getAllTransactions();
      return data;
    },
  });

  if (transactionQuery.isSuccess) {
    allTransactions = transactionQuery.data.data;
  }

  if (!allTransactions) {
    return (
      <section className="flex justify-center items-center h-screen">
        <h1>loading....</h1>
      </section>
    );
  }

  if (allTransactions.length === 0) {
    return (
      <section className="flex justify-center h-full py-[25%]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-medium">
            No transactions have been made
          </h1>
          <span className="mt-4 text-xl text-muted-foreground">¯\_(ツ)_/¯</span>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-full flex flex-col gap-4">
      <DataTable<transaction> columns={column} data={allTransactions} />
    </section>
  );
}
