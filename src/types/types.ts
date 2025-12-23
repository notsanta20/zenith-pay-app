import type { createAccountFormSchema } from "@/schemas/formSchemas";
import type React from "react";
import type z from "zod";

export interface loginFormType {
  email: string;
  password: string;
}

export interface registerFormType {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface registerFormRequest {
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface userProfileFormType {
  fullName: string;
  dob: string;
  phone: string;
}

export const onBoardType = {
  login: "LOGIN",
  profile: "PROFILE",
  account: "ACCOUNT",
  app: "APP",
} as const;

export interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  onBoard: string;
  username: string | null;
  lastLogin: string | null;
  securityNotifications: boolean;
  generalNotifications: boolean;
  setIsLoggingOut: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface createAccountFormType {
  accountName: string;
  accountType: string;
  balance: number;
}

export interface transactAccount {
  accountId: string;
  accountName: string;
  accountNumber: string;
  accountStatus: string;
  balance: number;
}

export interface accountDetails {
  accountNumber: string;
  accountStatus: string;
  balance: number;
}

export interface account {
  accountId: string;
  accountNumber: string;
  accountStatus: string;
  accountType: z.infer<typeof createAccountFormSchema>["accountType"];
  balance: number;
  accountName: string;
  ifscCode: string;
  outstanding: number;
}

export interface transactionForm {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  remarks: string;
}

export interface transaction {
  amount: number;
  accountNumber: string;
  remarks: string;
  timestamp: string;
  type: string;
  txnId: string;
  status: string;
}

export interface userProfileUpdateFormType {
  fullName: string;
  dob: string;
  phone: string;
  password: string;
}

export interface userProfile {
  full_name: string;
  dob: string;
  phone: string;
  created_at: string;
  kyc_status: boolean;
}

export interface updatePasswordFormType {
  password: string;
  confirmPassword: string;
}

export interface updatePasswordFormRequest {
  password: string;
}

export interface notificationsState {
  securityNotification: boolean;
  generalNotification: boolean;
}
