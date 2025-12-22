import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "@/schemas/formSchemas";
import { toast } from "sonner";
import type { registerFormRequest } from "@/types/types";
import { registerApi } from "@/apis/postRequests";
import type { AxiosError, AxiosResponse } from "axios";
import { Spinner } from "../ui/spinner";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export function RegisterForm() {
  const navigate = useNavigate();
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);
  const [isConfPassHidden, setIsConfPassHidden] = useState<boolean>(true);

  const registerQuery = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: registerFormRequest) => {
      return registerApi(data);
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data.message);
    },
    onSuccess: (data: AxiosResponse) => {
      toast.success(data.data.message);

      navigate("/login", { replace: true });
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerFormSchema,
    },
    onSubmit: async ({ value }) => {
      const data: registerFormRequest = {
        email: value.email,
        password: value.password,
        isAdmin: false,
      };

      registerQuery.mutate(data);
    },
  });

  return (
    <Card className="lg:min-w-[450px]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
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
                        type={isPassHidden ? "password" : "text"}
                        placeholder="z#Ez3tkDr#$5s*1&"
                      />
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground transition-opacity duration-150 ease-out active:scale-90 active:opacity-70 focus:outline-none"
                        onClick={() => {
                          setIsPassHidden(!isPassHidden);
                        }}
                      >
                        {isPassHidden ? (
                          <EyeClosed size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </div>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="confirmPassword"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type={isConfPassHidden ? "password" : "text"}
                        placeholder="z#Ez3tkDr#$5s*1&"
                      />
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground transition-opacity duration-150 ease-out active:scale-90 active:opacity-70 focus:outline-none"
                        onClick={() => {
                          setIsConfPassHidden(!isConfPassHidden);
                        }}
                      >
                        {isConfPassHidden ? (
                          <EyeClosed size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
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
          <Button type="submit" form="register-form">
            {registerQuery.isPending ? <Spinner /> : "Sign up"}
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <a href="/login">login</a>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
