import { makeAutoObservable } from "mobx";
import axios, { AxiosError } from "axios";

import spin from "store/spin";
import error from "store/errorHandle";
import { IStudents } from "interfaces/student";
import { STUDENT, API } from "constants/api";
import {message} from "antd";

class student {
  students = [];

  constructor() {
    makeAutoObservable(this);
  }

  createStudent(data: IStudents) {
    spin.setSpin(true);
    axios
      .post(`${API}${STUDENT}`, data)
      .then((res) => {
        if (res.status === 201) {
          message.success(
            {
              content: `student: ${data.firstname} added`,
              style: {
                marginTop: "20vh",
              },
            },
            5);
        }
        console.log("--> createStudent", res);
      })
      // .then(() => navigate("/students"))
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }

  getStudents() {
    spin.setSpin(true);
    axios
      .get(`${API}${STUDENT}`)
      .then((res) => {
        this.students = res.data;
        console.log("--> getStudents", res.data);
      })
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }
}

export default new student();
