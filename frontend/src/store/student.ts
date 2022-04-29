import { makeAutoObservable } from "mobx";
import { message } from "antd";
import axios, { AxiosError } from "axios";

import spin from "store/spin";
import error from "store/errorHandle";
import { IStudents } from "interfaces/student";
import { STUDENT, STUDENTS, API } from "constants/api";

class Student {
  students = [];
  student = null;

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
      .get(`${API}${STUDENTS}`)
      .then((res) => {
        this.students = res.data;
      })
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }

  removeStudent(id: string) {
    spin.setSpin(true);
    axios
      .delete(`${API}${STUDENT}`, { params: { id } })
      .then((res) => {
        if (res.status === 200) {
          message.success(
            {
              content: res.data,
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

  getStudent(id: string) {
    axios
      .get(`${API}${STUDENT}`, { params: { id } })
      .then((response) => {
        this.student = response.data;
      })
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      });
  }

  updateStudent(data: IStudents) {
    spin.setSpin(true);
    axios
      .put(`${API}${STUDENT}`, data)
      .then((res) => {
        if (res.status === 201) {
          message.success(
            {
              content: `student: ${data.firstname} updated`,
              style: {
                marginTop: "20vh",
              },
            },
            5
          );
        }
        console.log("--> updateStudent", res);
      })
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }
}

export default new Student();
