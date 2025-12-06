import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

type transaction = {
  date: string;
  type: string;
  remark: string;
  amount: number;
};

function LatestTransactions() {
  let count: number = 0;
  const items: Array<transaction> = [
    {
      date: "2025-12-02 06:55:26.957",
      type: "DEBIT",
      remark: "payment to john",
      amount: 560.0,
    },
    {
      date: "2025-12-02 07:45:46.457",
      type: "CREDIT",
      remark: "Interest from debt fund",
      amount: 75560.0,
    },
    {
      date: "2025-12-02 09:33:25.347",
      type: "CREDIT",
      remark: "Rent from julie",
      amount: 20000,
    },
  ];

  return (
    <div className="w-full xl:w-[1000px] flex flex-col gap-4">
      {items.map((t) => (
        <div className="grid grid-cols-[110px_1fr_150px]" key={t.date}>
          <span>{formatDate(t.date)}</span>
          <span className="flex-auto">{t.remark}</span>
          <span
            className={
              "text-right " +
              (t.type == "DEBIT" ? "text-red-400" : "text-green-400")
            }
          >
            {t.type == "DEBIT" ? "- " : "+ "}
            {formatCurrency(t.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default LatestTransactions;
