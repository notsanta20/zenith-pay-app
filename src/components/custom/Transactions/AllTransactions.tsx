import { getAllTransactions } from "@/apis/getRequests";
import type { transaction } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateExtended } from "@/utils/formatDate";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper<transaction>();
const column = [
  columnHelper.accessor("timestamp", {
    header: "Date",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="font-medium">{formatDateExtended(info.getValue())}</div>
      </div>
    ),
  }),
  columnHelper.accessor("txnId", {
    header: "TxnID",
    cell: (info) => {
      const txnId = info.getValue().split("-")[4];
      return (
        <div className="flex items-center gap-3">
          <div className="font-medium">{txnId}</div>
        </div>
      );
    },
  }),
  columnHelper.accessor("accountNumber", {
    header: "Account Number",
    cell: (info) => {
      const accountNumber = "**** **** " + info.getValue().substring(8);

      return (
        <div className="flex items-center gap-3">
          <div
            className="font-medium"
            onMouseOver={(e) => {
              const targetElement: HTMLDivElement = e.target as HTMLDivElement;
              targetElement.textContent = info.getValue();
            }}
            onMouseOut={(e) => {
              const targetElement: HTMLDivElement = e.target as HTMLDivElement;
              targetElement.textContent = accountNumber;
            }}
          >
            {accountNumber}
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => {
      const { type, amount } = info.row.original;

      const styles = {
        CREDIT: "text-green-400",
        DEBIT: "text-destructive",
      }[type];

      return (
        <div
          className={
            (cn(
              "flex items-center gap-3 border-none focus-visible:outline-none",
            ),
            styles)
          }
        >
          <div className="font-medium"></div>
        </div>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();

      const styles = {
        SUCCESS: "bg-green-600/10 text-green-400 border border-green-600/20",
        PENDING: "bg-muted text-muted-foreground border border-border",
        FAILED:
          "bg-destructive/10 text-destructive border border-destructive/20",
      }[status];

      return (
        <Badge
          className={(cn("border-none focus-visible:outline-none"), styles)}
        >
          {status}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("remarks", {
    header: "Remarks",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="font-medium">{info.getValue()}</div>
      </div>
    ),
  }),
];

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
    <section className="w-full flex flex-col gap-4">
      <DataTable<transaction> columns={column} data={allTransactions} />
    </section>
  );
}
