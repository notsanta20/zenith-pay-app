import { type MouseEvent } from "react";
import SimpleHeading from "../SimpleHeading";
import { useQuery } from "@tanstack/react-query";
import { getTotalBalance } from "@/apis/getRequests";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/formatCurrency";

export default function Balance() {
  const totalBalanceQuery = useQuery({
    queryKey: ["total-balance"],
    queryFn: async () => {
      const data = await getTotalBalance();
      return data;
    },
    retry: false,
  });

  if (totalBalanceQuery.isError) {
    if (totalBalanceQuery.error.status === 404) {
      toast.error("No accounts available, create a account");
    }
  }

  const balance: string = totalBalanceQuery.isSuccess
    ? formatCurrency(totalBalanceQuery.data.data)
    : "(⌐■_■)";

  return (
    <section className="flex flex-col gap-5">
      <SimpleHeading text="Balance" />
      <div>
        <span
          className="font-(family-name:--dm-serif) text-6xl"
          onMouseOver={(e: MouseEvent) => {
            const targetElement: HTMLSpanElement = e.target as HTMLSpanElement;
            targetElement.textContent = balance;
          }}
          onMouseOut={(e: MouseEvent) => {
            const targetElement: HTMLSpanElement = e.target as HTMLSpanElement;
            targetElement.textContent = "(⌐■_■)";
          }}
        >
          (⌐■_■)
        </span>
      </div>
    </section>
  );
}
