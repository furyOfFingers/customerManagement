export interface IAuthSignIn {
  email: string;
  password: string;
}
export interface IAuthSignUp {
  email: string;
  gender: "female" | "male";
  username: string;
  password: string;
}
