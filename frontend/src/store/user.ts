import { makeAutoObservable, autorun } from "mobx";
import axios, { AxiosError } from "axios";

import spinStore from "store/spin";
import error from "store/errorHandle";
import { IUser } from "interfaces/user";
import { AUTH_USERS, API } from "constants/api";

class Users {
  private user = {} as IUser;

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
    spinStore.setSpin(true);
    axios
      .get(`${API}${AUTH_USERS}`)
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spinStore.setSpin(false));
  }

  setUser(data: IUser) {
    this.user = data;
    localStorage.setItem("user", JSON.stringify(data));
  }

  removeUser() {
    this.user = {} as IUser;
  }

  get() {
    return this.user;
  }
}

export default new Users();
