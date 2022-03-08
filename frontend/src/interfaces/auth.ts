export interface IAuthSignIn{
  username: string,
  password: string,
}
export interface IAuthSignUp extends IAuthSignIn{
  email: string,
  gender: 'female'|'male'
}
