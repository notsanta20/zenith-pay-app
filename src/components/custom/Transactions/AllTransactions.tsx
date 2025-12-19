import { getAllTransactions } from "@/apis/getRequests";
import type { transaction } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../dataTable/TransactionDataTable";
import { column } from "../dataTable/TransactionColumn";

export default function AllTransactions() {
  let allTransactions: Array<transaction> = [];

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

  if (allTransactions.length === 0) {
    return (
      <section className="flex justify-center items-center h-screen">
        <h1>loading....</h1>
      </section>
    );
  }

  return (
    <section className="w-full h-full flex flex-col gap-4">
      <DataTable<transaction> columns={column} data={allTransactions} />
    </section>
  );
}
