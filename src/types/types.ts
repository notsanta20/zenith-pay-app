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
  fullname: string;
  dob: string;
  phone: string;
}
