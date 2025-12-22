import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { createAccountFormSchema } from "@/schemas/formSchemas";
import { toast } from "sonner";
import type { createAccountFormType } from "@/types/types";
import { Spinner } from "../ui/spinner";
import { createAccountApi } from "@/apis/postRequests";

export function AccountForm() {
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
        queryKey: ["user-bootstrap"],
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
    <Card className="lg:min-w-[450px]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="create-account-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="accountName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Account name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
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
              name="accountType"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Account type</FieldLabel>
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
            <form.Field
              name="balance"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Balance</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="zenith"
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="create-account-form">
            {userProfileQuery.isPending ? <Spinner /> : "Create account"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
