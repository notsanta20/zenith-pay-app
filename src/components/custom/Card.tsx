import { formatCurrency } from "@/utils/formatCurrency";
import { type VariantProps } from "class-variance-authority";
import { cardVariants } from "./variants/cardVariant";
import type { HTMLAttributes } from "react";

interface cardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  accountName: string;
  balance: number;
  outstanding: number;
  accountNumber: string;
}

export function Card({
  variant,
  size,
  accountName,
  balance,
  outstanding,
  accountNumber,
  ...props
}: cardProps) {
  const convertedBalance: string = formatCurrency(balance);
  const convertedOutstanding: string = formatCurrency(outstanding);

  return (
    <div className={cardVariants({ variant, size })} {...props}>
      <div className="flex items-center gap-5">
        <img src="/src/assets/icons/infinity.svg" alt="infinity logo" />
        <span>{accountName}</span>
      </div>
      <div className="grid grid-cols-2 gap-5 ">
        <div className="flex flex-col gap-1">
          <span>Balance</span>
          <span>{convertedBalance}</span>
        </div>
        {outstanding && (
          <div className="flex flex-col gap-1">
            <span>Outstanding</span>
            <span>{convertedOutstanding}</span>
          </div>
        )}
      </div>
      <div>
        <span
          className="font-(family-name:--space-mono) text-(--card-text-sec)"
          onMouseEnter={(e) => {
            e.stopPropagation();
            const target = e.target as HTMLSpanElement;
            target.textContent = "**** **** " + accountNumber;
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            const target = e.target as HTMLSpanElement;
            target.textContent = "**** **** ****";
          }}
        >
          **** **** ****
        </span>
      </div>
    </div>
  );
}
