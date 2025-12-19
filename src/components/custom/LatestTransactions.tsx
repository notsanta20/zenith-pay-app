import { getLatestTransactions } from "@/apis/getRequests";
import type { transaction } from "@/types/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function LatestTransactions() {
  let latestTransactions: Array<transaction> = [];
  const transactions = useQuery({
    queryKey: ["latest-transactions"],
    queryFn: async () => {
      const data = await getLatestTransactions();
      return data;
    },
  });

  if (transactions.isSuccess) {
    latestTransactions = transactions.data.data;
  }

  if (latestTransactions.length === 0) {
    return (
      <section className="flex justify-center items-center">
        <h1>loading....</h1>
      </section>
    );
  }

  return (
    <section className="w-full xl:w-[1000px]">
      <div className="w-full">
        <div className="overflow-hidden rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="border-input">
                <TableHead className="w-25 text-(--text-gray)">Date</TableHead>
                <TableHead className="text-(--text-gray)">From</TableHead>
                <TableHead className="text-(--text-gray)">Remarks</TableHead>
                <TableHead className="text-right text-(--text-gray)">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestTransactions.map((t) => {
                const accountNumber =
                  "**** **** " + t.accountNumber.substring(8);
                return (
                  <TableRow key={t.timestamp} className="border-input">
                    <TableCell className="font-medium text-left">
                      {formatDate(t.timestamp)}
                    </TableCell>
                    <TableCell>{accountNumber}</TableCell>
                    <TableCell>{t.remarks}</TableCell>
                    <TableCell
                      className={
                        "text-right " +
                        (t.type == "DEBIT" ? "text-red-400" : "text-green-400")
                      }
                    >
                      {(t.type === "DEBIT" ? "-" : "+") +
                        formatCurrency(t.amount)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}

export default LatestTransactions;
