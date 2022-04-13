import { makeAutoObservable } from "mobx";
import { message } from "antd";

import axios, { AxiosError } from "axios";

import spin from "store/spin";
import error from "store/errorHandle";
import { IStudents } from "interfaces/student";
import { STUDENT, API } from "constants/api";

class Student {
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
            5
          );
        }
      })
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
      })
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }
}

export default new Student();
