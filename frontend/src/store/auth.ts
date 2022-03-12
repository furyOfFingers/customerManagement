import { makeAutoObservable } from "mobx";
import axios, { AxiosError } from "axios";

import spin from "store/spin";
import error from "store/errorHandle";
import { IAuthSignIn, IAuthSignUp } from "interfaces/auth";
import { AUTH_SIGNIN, AUTH_SIGNUP, API_AUTH } from "constants/api";

class Auth {
  constructor() {
    makeAutoObservable(this);
  }

  signUp(data: IAuthSignUp) {
    spin.setSpin(true);
    axios
      .post(`${API_AUTH}${AUTH_SIGNUP}`, data)
      .then((res) => {
        console.log("--> signUp", res);
      })
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }

  signIn(data: IAuthSignIn) {
    spin.setSpin(true);
    axios
      .post(`${API_AUTH}${AUTH_SIGNIN}`, data)
      .then((res) => {
        console.log("--> signIn", res);
      })
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }
}

export default new Auth();
