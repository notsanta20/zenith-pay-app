import { getUserProfile } from "@/apis/getRequests";
import { updateUserProfileApi } from "@/apis/putRequests";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { userProfileUpdateFormSchema } from "@/schemas/formSchemas";
import type {
  userProfile,
  userProfileFormType,
  userProfileUpdateFormType,
} from "@/types/types";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PersonalTab() {
  const queryClient = useQueryClient();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const getProfile = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  const userData: userProfile = getProfile.data?.data;

  const userProfileQuery = useMutation({
    mutationKey: ["set-user-profile"],
    mutationFn: (data: userProfileFormType) => {
      return updateUserProfileApi(data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["verify-user"],
      });
    },
  });

  const form = useForm({
    defaultValues: {
      fullname: getProfile.isSuccess ? userData.full_name : "",
      dob: getProfile.isSuccess
        ? new Date(userData.dob)
        : (undefined as Date | undefined),
      phone: getProfile.isSuccess ? userData.phone : "",
      password: "",
    },
    validators: {
      onSubmit: userProfileUpdateFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (value.dob) {
        const data: userProfileUpdateFormType = {
          fullName: value.fullname,
          dob: format(value.dob, "yyy-MM-dd"),
          phone: value.phone,
          password: value.password,
        };

        userProfileQuery.mutate(data);
      }
    },
  });

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and profile information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form
          id="update-profile-form"
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
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        if (e.target.value !== userData.full_name) {
                          setIsChanged(true);
                        } else {
                          setIsChanged(false);
                        }
                      }}
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
                          onSelect={(e) => {
                            if (e) {
                              field.handleChange(e);
                              const newDate = format(e, "yyy-MM-dd");
                              if (newDate !== userData.dob) {
                                setIsChanged(true);
                              } else {
                                setIsChanged(false);
                              }
                            }
                          }}
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
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        if (e.target.value !== userData.phone) {
                          setIsChanged(true);
                        } else {
                          setIsChanged(false);
                        }
                      }}
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
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Enter password to update profile
                    </FieldLabel>
                    <div className="flex justify-around items-center gap-4">
                      <div className="relative flex-1 min-w-[200px] max-w-[500px]">
                        <Input
                          className=""
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type={isHidden ? "password" : "text"}
                          placeholder="z#Ez3tkDr#$5s*1&"
                          disabled={!isChanged}
                        />
                        <div
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground transition-opacity duration-150 ease-out active:scale-90 active:opacity-70 focus:outline-none"
                          onClick={() => {
                            setIsHidden(!isHidden);
                          }}
                        >
                          {isHidden ? (
                            <EyeClosed size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </div>
                      </div>
                      <Button
                        type="submit"
                        form="update-profile-form"
                        disabled={!isChanged}
                      >
                        {userProfileQuery.isPending ? (
                          <Spinner />
                        ) : (
                          "update profile"
                        )}
                      </Button>
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
    </Card>
  );
}
