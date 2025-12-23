import { getAllAccounts } from "@/apis/getRequests";
import { doTransaction } from "@/apis/postRequests";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { transactionFormSchema } from "@/schemas/formSchemas";
import type { account, accountDetails, transactionForm } from "@/types/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function Transact() {
  const queryClient = useQueryClient();
  const [accountDetails, setAccountDetails] = useState<accountDetails>({
    accountNumber: "0000 0000 0000",
    accountStatus: "NILL",
    balance: 0,
  });

  const accountsQuery = useQuery({
    queryKey: ["accounts-query"],
    queryFn: getAllAccounts,
  });

  const accounts: Array<account> = accountsQuery.data?.data.content ?? [];

  const transactionQuery = useMutation({
    mutationKey: ["do-transaction"],
    mutationFn: (data: transactionForm) => {
      return doTransaction(data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            toast.error("Insufficient balance");
          } else if (status === 404) {
            toast.error("account not found");
          } else {
            toast.error("Internal server error");
          }
        }
      }
    },
    onSuccess: () => {
      toast.success("transaction success");
      queryClient.invalidateQueries({ queryKey: ["accounts-query"] });
    },
  });

  const form = useForm({
    defaultValues: {
      fromAccountNumber: "",
      toAccountNumber: "",
      ifscCode: "",
      payeeName: "",
      bankName: "",
      amount: 0,
      remarks: "",
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = transactionFormSchema.safeParse(value);

        if (!result.success) {
          const fieldErrors: Record<string, string[]> = {};

          for (const issue of result.error.issues) {
            const fieldName = issue.path[0];
            if (typeof fieldName === "string") {
              fieldErrors[fieldName] ??= [];
              fieldErrors[fieldName].push(issue.message);
            }
          }

          return fieldErrors;
        }
      },
    },
    onSubmit: async ({ value }) => {
      const data: transactionForm = {
        fromAccountNumber: accountDetails.accountNumber,
        toAccountNumber: value.toAccountNumber,
        amount: value.amount,
        remarks: value.remarks,
      };

      resetForm();

      transactionQuery.mutate(data);
    },
  });

  function resetForm() {
    form.reset();
    setAccountDetails({
      accountNumber: "0000 0000 0000",
      accountStatus: "NILL",
      balance: 0,
    });
  }

  return (
    <section className="flex flex-col gap-5 bg-sidebar rounded-lg">
      <Card>
        <CardContent>
          <form
            id="transaction-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <FieldGroup>
                <CardTitle className="text-lg pb-5">From</CardTitle>
                <FieldGroup>
                  <div className="flex flex-col xl:grid xl:grid-cols-[minmax(250px,750px)_minmax(750px,1fr)] gap-5">
                    <form.Field
                      name="fromAccountNumber"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-xs"
                            >
                              SELECT ACCOUNT
                            </FieldLabel>
                            <Select
                              onValueChange={(value) => {
                                field.handleChange(value);

                                const account = accounts.find(
                                  (a) => a.accountName === value,
                                );

                                if (account) {
                                  const amount = formatCurrency(
                                    account.balance,
                                  );
                                  setAccountDetails({
                                    accountNumber: account.accountNumber,
                                    accountStatus: account.accountStatus,
                                    balance: parseFloat(amount),
                                  });
                                }
                              }}
                              value={field.state.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="select account" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>select account</SelectLabel>
                                  {accounts.map((a) => (
                                    <SelectItem
                                      key={a.accountId}
                                      value={a.accountName}
                                    >
                                      {a.accountName}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>

                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <div className="flex flex-col gap-5 min-[1126px]:gap-2">
                      <h2 className="text-xs">ACCOUNT DETAILS</h2>
                      <div className="max-[1125px]:flex max-[1125px]:flex-col max-[1125px]:gap-5 min-[1126px]:grid min-[1126px]:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] min-[1126px]:gap-0 min-[1126px]:mt-auto min-[1126px]:mb-auto">
                        <div className="text-xs flex gap-2">
                          <div className="font-medium">Available Balance:</div>
                          <div className="font-bold">
                            {accountDetails.balance}
                          </div>
                        </div>
                        <div className="text-xs flex gap-2">
                          <div className="font-medium">Available Number:</div>
                          <div className="font-bold">
                            {accountDetails.accountNumber}
                          </div>
                        </div>
                        <div className="text-xs flex gap-2">
                          <div className="font-medium">Available Status:</div>
                          <div className="font-bold">
                            {accountDetails.accountStatus}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FieldGroup>
              </FieldGroup>
              <div className="border-sidebar-border border-solid border-t-2 w-full"></div>
              <FieldGroup>
                <CardTitle className="text-lg pb-5">To</CardTitle>
                <FieldGroup>
                  <div className="flex flex-col min-[1126px]:grid min-[1126px]:grid-cols-3 gap-5">
                    <form.Field
                      name="payeeName"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-xs"
                            >
                              PAYEE NAME
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="zenith savings"
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="bankName"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-xs"
                            >
                              BANK NAME
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="zenith savings"
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="toAccountNumber"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-xs"
                            >
                              ACCOUNT NUMBER
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="zenith savings"
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="ifscCode"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-xs"
                            >
                              IFSC CODE
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="zenith savings"
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="amount"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-xs"
                            >
                              AMOUNT
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(parseFloat(e.target.value))
                              }
                              aria-invalid={isInvalid}
                              placeholder="zenith savings"
                              autoComplete="off"
                              type="number"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="remarks"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-xs"
                            >
                              REMARKS
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="zenith savings"
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </div>
                </FieldGroup>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end w-full">
            <Button variant="secondary" onClick={() => resetForm()}>
              {"cancel"}
            </Button>
            <Button type="submit" form="transaction-form">
              {transactionQuery.isPending ? <Spinner /> : "Pay"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
