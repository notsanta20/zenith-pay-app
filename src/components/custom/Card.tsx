import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "flex flex-col justify-around p-3 rounded-xl font-(family-name:--kode-mono) text-(--card-text-pri)",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-(--card-green-from) to-(--card-green-to)",
        orange:
          "bg-gradient-to-b from-(--card-orange-from) to-(--card-orange-to)",
        blue: "bg-gradient-to-b from-(--card-blue-from) to-(--card-blue-to)",
        purple:
          "bg-gradient-to-b from-(--card-purple-from) to-(--card-purple-to)",
      },
      size: {
        default: "min-w-[380px] h-[230px]",
        sm: "min-w-[300px] h-[182px]",
        lg: "min-w-[400px] h-[242px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface cardProps extends VariantProps<typeof buttonVariants> {
  accountName: string;
  balance: number;
  outstanding: number;
  accountNumber: string;
}

function Card(prop: cardProps) {
  const { variant, size, accountName, balance, outstanding, accountNumber } =
    prop;

  const convertedBalance: string = formatCurrency(balance);
  const convertedOutstanding: string = formatCurrency(outstanding);

  return (
    <div className={cn(buttonVariants({ variant, size }))}>
      <div className="flex items-center gap-5">
        <img src="./src/assets/icons/infinity.svg" alt="infinity logo" />
        <span>{accountName}</span>
      </div>
      <div className="grid grid-cols-2 gap-5 ">
        <div className="flex flex-col gap-1">
          <span>Balance</span>
          <span>{convertedBalance}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>Outstanding</span>
          <span>{convertedOutstanding}</span>
        </div>
      </div>
      <span
        className="font-(family-name:--space-mono) text-(--card-text-sec)"
        onMouseOver={(e) => {
          e.target.textContent = "*** *** " + accountNumber;
        }}
        onMouseOut={(e) => {
          e.target.textContent = "*** *** ****";
        }}
      >
        *** *** ****
      </span>
    </div>
  );
}

export { Card, buttonVariants };
