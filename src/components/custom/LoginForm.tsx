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
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export function LoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const loginQuery = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: loginFormType) => {
      return loginApi(data);
    },
    onError: (error) => {
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
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      loginQuery.mutate(value);
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
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type={isHidden ? "password" : "text"}
                        placeholder="z#Ez3tkDr#$5s*1&"
                      />
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground transition-opacity duration-150 ease-out active:scale-90 active:opacity-70 focus:outline-none"
                        onClick={() => {
                          setIsHidden(!isHidden);
                        }}
                      >
                        {isHidden ? <EyeClosed size={18} /> : <Eye size={18} />}
                      </div>
                    </div>
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
            {loginQuery.isPending ? <Spinner /> : "Login"}
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <a href="/register">Sign up</a>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
