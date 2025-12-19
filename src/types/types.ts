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

export interface accountDetails {
  accountNumber: string;
  accountStatus: string;
  balance: number;
}

export interface account {
  accountId: string;
  accountNumber: string;
  accountStatus: string;
  accountType: string;
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
