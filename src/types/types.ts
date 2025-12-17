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
