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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { userProfileFormSchema } from "@/schemas/formSchemas";
import { toast } from "sonner";
import type { userProfileFormType } from "@/types/types";
import { Spinner } from "../ui/spinner";
import { updateUserProfileApi } from "@/apis/putRequests";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

export function UserProfileForm() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userProfileQuery = useMutation({
    mutationKey: ["set-user-profile"],
    mutationFn: (data: userProfileFormType) => {
      return updateUserProfileApi(data);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["user-bootstrap"],
      });
      navigate("/create-account", { replace: true });
    },
  });

  const form = useForm({
    defaultValues: {
      fullname: "",
      dob: undefined as Date | undefined,
      phone: "",
    },
    validators: {
      onSubmit: userProfileFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (value.dob) {
        const data: userProfileFormType = {
          fullName: value.fullname,
          dob: format(value.dob, "yyy-MM-dd"),
          phone: value.phone,
        };

        userProfileQuery.mutate(data);
      }
    },
  });

  return (
    <Card className="lg:min-w-[450px]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="user-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="fullname"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Fullname</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="zenith"
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
              name="dob"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Date of Birth</FieldLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="justify-between font-normal"
                        >
                          {field.state.value ? (
                            format(field.state.value, "dd/MM/yyy")
                          ) : (
                            <span className="opacity-50 text-xs">
                              20/01/1998
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          captionLayout="dropdown"
                          onSelect={(e) => e && field.handleChange(e)}
                        />
                      </PopoverContent>
                    </Popover>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
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
          <Button type="submit" form="user-profile-form">
            {userProfileQuery.isPending ? <Spinner /> : "Create profile"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
