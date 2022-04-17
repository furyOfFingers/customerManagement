import { makeAutoObservable } from "mobx";
import axios, { AxiosError } from "axios";
import { navigate } from "hookrouter";

import spin from "store/spin";
import error from "store/errorHandle";
import user from "store/user";
import { IAuthSignIn, IAuthSignUp } from "interfaces/auth";
import { AUTH_SIGNIN, AUTH_SIGNUP, API, AUTH } from "constants/api";

class Auth {
  constructor() {
    makeAutoObservable(this);
  }

  signUp(data: IAuthSignUp) {
    spin.setSpin(true);
    axios
      .post(`${API}${AUTH}${AUTH_SIGNUP}`, data)
      .then((res) => {
        if (res.status === 201) {
          user.setUser(res.data);
        }
      })
      .then(() => navigate("/students"))
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }

  signIn(data: IAuthSignIn) {
    spin.setSpin(true);
    axios
      .post(`${API}${AUTH}${AUTH_SIGNIN}`, data)
      .then((res) => {
        if (res.status === 201) {
          user.setUser(res.data);
        }
      })
      .then(() => navigate("/students"))
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }

  logout() {
    user.removeUser();
    localStorage.removeItem("user");
    navigate("/");
  }
}

export default new Auth();
