import { createAccountApi } from "@/apis/postRequests";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import type { createAccountFormType } from "@/types/types";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function AccounstTab() {
  const userProfileQuery = useMutation({
    mutationKey: ["create-account"],
    mutationFn: (data: createAccountFormType) => {
      return createAccountApi(data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");
    },
  });

  const form = useForm({
    defaultValues: {
      accountName: "",
      accountType: "",
      balance: 0,
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = createAccountFormSchema.safeParse(value);

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
      const data: createAccountFormType = {
        accountName: value.accountName,
        accountType: value.accountType,
        balance: value.balance,
      };
      form.reset();
      userProfileQuery.mutate(data);
    },
  });

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Add account</CardTitle>
        <CardDescription>Create new account.</CardDescription>
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
                      onChange={(e) =>
                        field.handleChange(parseFloat(e.target.value))
                      }
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
