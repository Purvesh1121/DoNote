export interface ICreateUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
