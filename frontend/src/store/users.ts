import { makeAutoObservable } from "mobx";
import axios, { AxiosError } from "axios";

import spin from "store/spin";
import error from "store/errorHandle";
import { AUTH_USERS, API } from "constants/api";

class Users {
  constructor() {
    makeAutoObservable(this);
  }

  getUsers() {
    spin.setSpin(true);
    axios
      .get(`${API}${AUTH_USERS}`)
      .then((res) => {
        console.log("--> users", res);
      })
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }
}

export default new Users();
