import { updatePassApi } from "@/apis/putRequests";
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
import { Spinner } from "@/components/ui/spinner";
import useLogout from "@/hooks/useLogout";
import { updatePassowrdFormSchema } from "@/schemas/formSchemas";
import type { updatePasswordFormRequest } from "@/types/types";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SecurityTab() {
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);
  const [isConfPassHidden, setIsConfPassHidden] = useState<boolean>(true);
  const logout = useLogout();

  const updatePassQuery = useMutation({
    mutationKey: ["update-pass"],
    mutationFn: (data: updatePasswordFormRequest) => {
      return updatePassApi(data);
    },
    onError: (error) => {
      if (error.response.status === 400) {
        toast.error("same password");
      } else {
        toast.error("Failed to udpate password, try again later.");
      }
    },
    onSuccess: () => {
      toast.success(
        "Password udpated succesfully, login again with new password",
      );
      logout.mutate();
    },
  });

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: updatePassowrdFormSchema,
    },
    onSubmit: async ({ value }) => {
      const data: updatePasswordFormRequest = {
        password: value.password,
      };
      updatePassQuery.mutate(data);
    },
  });

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>update your password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="update-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
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
          <Button type="submit" form="update-password-form">
            {updatePassQuery.isPending ? <Spinner /> : "Update password"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
