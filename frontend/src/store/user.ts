import { makeAutoObservable, autorun } from "mobx";
import axios, { AxiosError } from "axios";

import spin from "store/spin";
import error from "store/errorHandle";
import { IUser } from "interfaces/user";
import { AUTH_USERS, API } from "constants/api";

class Users {
  user = {};

  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      const userStorage = localStorage.getItem("user");
      if (userStorage) {
        this.user = JSON.parse(userStorage);
      }
    });
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

  setUser(data: IUser) {
    this.user = data;
    localStorage.setItem("user", JSON.stringify(data));
  }

  removeUser() {
    this.user = {};
  }
}

export default new Users();
