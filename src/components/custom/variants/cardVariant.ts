import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "relative overflow-hidden rounded-xl p-5 \
   flex flex-col justify-between \
   font-(family-name:--kode-mono) \
   text-white \
   shadow-lg transition-transform duration-300 hover:scale-[1.015] \
   before:pointer-events-none after:pointer-events-none",
  {
    variants: {
      variant: {
        SAVINGS:
          "bg-neutral-950 \
           border border-white/10 \
           before:absolute before:inset-0 \
           before:bg-[radial-gradient(circle_at_20%_25%,rgba(34,197,94,0.22),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.18),transparent_50%)] \
           after:absolute after:inset-0 \
           after:bg-[repeating-linear-gradient(0deg,transparent,transparent_26px,rgba(255,255,255,0.035)_27px)]",
        CURRENT:
          "bg-neutral-950 \
           border border-white/10 \
           before:absolute before:inset-0 \
           before:bg-[radial-gradient(circle_at_75%_20%,rgba(56,189,248,0.20),transparent_42%),radial-gradient(circle_at_25%_80%,rgba(59,130,246,0.14),transparent_50%)] \
           after:absolute after:inset-0 \
           after:bg-[linear-gradient(transparent_94%,rgba(255,255,255,0.05)_100%),linear-gradient(90deg,transparent_94%,rgba(255,255,255,0.05)_100%)] \
           after:bg-[size:22px_22px]",
        CREDIT:
          "bg-neutral-950 \
           border border-white/10 \
           before:absolute before:inset-0 \
           before:bg-[linear-gradient(120deg,rgba(168,85,247,0.20),rgba(56,189,248,0.18),rgba(244,114,182,0.20),rgba(34,197,94,0.16))] \
           before:opacity-70 \
           after:absolute after:inset-0 \
           after:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_6px)]",
      },

      size: {
        sm: "min-w-[300px] min-h-[182px]",
        lg: "min-w-[400px] min-h-[242px]",
      },
    },

    defaultVariants: {
      variant: "SAVINGS",
      size: "lg",
    },
  },
);
