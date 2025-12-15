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
  userId: string;
  fullName: string;
  dob: string;
  phone: string;
}

export interface userIdContext {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export interface createAccountFormType {
  userId: string;
  accountName: string;
  accountType: string;
  balance: number;
}
