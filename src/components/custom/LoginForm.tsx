import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "@/schemas/formSchemas";
import { toast } from "sonner";
import type { loginFormType } from "@/types/types";
import { loginApi } from "@/apis/postRequests";
import type { AxiosResponse } from "axios";
import { Spinner } from "../ui/spinner";

export function LoginForm() {
  const navigate = useNavigate();

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: loginFormType) => {
      return loginApi(data);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data: AxiosResponse) => {
      navigate("/create-profile", { replace: true });
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      login.mutate(value);
    },
  });

  return (
    <Card className="lg:min-w-[450px]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="z@example.com"
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
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="password"
                      placeholder="z#Ez3tkDr#$5wj2s*1j&"
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
          <Button type="submit" form="login-form">
            {login.isPending ? <Spinner /> : "Login"}
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <a href="/register">Sign up</a>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
