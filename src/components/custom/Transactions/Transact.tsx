import { createAccountApi } from "@/apis/postRequests";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { createAccountFormSchema } from "@/schemas/formSchemas";
import type { createAccountFormType, transactAccount } from "@/types/types";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const allAccounts: Array<transactAccount> = [
  {
    accountId: "asdfa",
    accountName: "savings",
    accountNumber: "12341234",
    accountStatus: "ACTIVE",
    balance: 500.0,
  },
  {
    accountId: "asdasdffa",
    accountName: "savings 2",
    accountNumber: "123412af34",
    accountStatus: "ACTIVE",
    balance: 200.0,
  },
];

export default function Transact() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userProfileQuery = useMutation({
    mutationKey: ["create-account"],
    mutationFn: (data: createAccountFormType) => {
      return createAccountApi(data);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["verify-user"],
      });
      navigate("/app", { replace: true });
    },
  });

  const form = useForm({
    defaultValues: {
      accountName: "",
      accountType: "",
      balance: 0,
    },
    validators: {
      onSubmit: createAccountFormSchema,
    },
    onSubmit: async ({ value }) => {
      const data: createAccountFormType = {
        accountName: value.accountName,
        accountType: value.accountType,
        balance: value.balance,
      };

      userProfileQuery.mutate(data);
    },
  });
  return (
    <section className="flex flex-col gap-5 bg-sidebar rounded-lg p-2">
      <Card className="lg:min-w-[450px]">
        <CardHeader>
          <CardTitle className="text-lg">From</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="transaction-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-wrap gap-5">
                <form.Field
                  name="accountType"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Account type
                        </FieldLabel>
                        <Select
                          onValueChange={field.handleChange}
                          value={field.state.value}
                          {...field}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Account type</SelectLabel>
                              <SelectItem value="SAVINGS">Savings</SelectItem>
                              <SelectItem value="CURRENT">Current</SelectItem>
                              <SelectItem value="CREDIT">Credit</SelectItem>
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
                <div className="flex flex-col gap-2 min-w-[675px]">
                  <h2>Account details</h2>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-xs text-nowrap flex gap-2">
                      <div className="font-medium">Available Balance:</div>
                      <div className="font-bold">Available Balance</div>
                    </div>
                    <div className="text-xs text-nowrap flex gap-2">
                      <div className="font-medium">Available Number:</div>
                      <div className="font-bold">Available Balance</div>
                    </div>
                    <div className="text-xs text-nowrap flex gap-2">
                      <div className="font-medium">Available Status:</div>
                      <div className="font-bold">Available Balance</div>
                    </div>
                  </div>
                </div>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button>
              {userProfileQuery.isPending ? <Spinner /> : "cancel"}
            </Button>
            <Button type="submit" form="transaction-form">
              {userProfileQuery.isPending ? <Spinner /> : "Pay"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </section>
  );
}
