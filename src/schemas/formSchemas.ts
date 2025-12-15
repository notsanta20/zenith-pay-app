import type { registerFormType } from "@/types/types";
import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.email({ error: "enter valid email address" }),
  password: z
    .string()
    .min(8, { error: "password must be at least 8 characters" }),
});

export const registerFormSchema = z
  .object({
    email: z.email({ error: "enter valid email address" }),
    password: z
      .string()
      .min(8, { error: "password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        error: "password must contain at least 1 uppercase letter",
      })
      .regex(/[a-z]/, {
        error: "password must contain at least 1 lowercase letter",
      })
      .regex(/[0-9]/, { error: "password must contain at least 1 number" })
      .regex(/[^A-Za-z0-9]/, {
        error: "password must contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(8, "password must be at least 8 characters")
      .regex(/[A-Z]/, {
        error: "password must contain at least 1 uppercase letter",
      })
      .regex(/[a-z]/, {
        error: "password must contain at least 1 lowercase letter",
      })
      .regex(/[0-9]/, { error: "password must contain at least 1 number" })
      .regex(/[^A-Za-z0-9]/, {
        error: "password must contain at least 1 special character",
      }),
  })
  .refine((data: registerFormType) => data.password === data.confirmPassword, {
    error: "passwords are not matching",
    path: ["confirmPassword"],
  });

export const userProfileFormSchema = z.object({
  fullname: z
    .string({ error: "enter valid name" })
    .min(5, { error: "fullname must be at least 5 characters" })
    .max(30, { error: "fullname must not exceed 30 characters" }),
  dob: z
    .date({ error: "select date of birth" })
    .min(new Date("1920-01-01"), { error: "Too old" })
    .max(new Date("2007-01-01"), { error: "Must be at least 18 years old" }),
  phone: z
    .string({ error: "enter valid phone number" })
    .length(10, { error: "phone number must be 10 numbers" }),
});

const accountTypeEnum = z.enum(["SAVINGS", "CURRENT", "CREDIT"], {
  error: "Select valid option",
});

export const createAccountFormSchema = z.object({
  accountName: z
    .string({ error: "enter valid account name" })
    .min(3, { error: "account name must be at least 3 characters" })
    .max(15, { error: "account name must not exceed 15 characters" }),
  accountType: accountTypeEnum,
  balance: z.coerce
    .number({ error: "enter valid balance" })
    .nonnegative({ error: "Balance should not be negative" })
    .min(1, { error: "balance need to be atleast 1" }),
});
