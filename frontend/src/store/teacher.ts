import { makeAutoObservable } from "mobx";
import { message } from "antd";
import axios, { AxiosError } from "axios";

import spin from "store/spin";
import error from "store/errorHandle";
import { ITeacher } from "interfaces/teacher";
import { API, TEACHER, TEACHERS } from "constants/api";

class Teacher {
  teachers = [];

  constructor() {
    makeAutoObservable(this);
  }

  createTeacher(data: ITeacher) {
    spin.setSpin(true);
    axios
      .post(`${API}${TEACHER}`, data)
      .then((res) => {
        if (res.status === 201) {
          message.success(
            {
              content: `teacher: ${data.firstname} added`,
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

  getTeachers() {
    spin.setSpin(true);
    axios
      .get(`${API}${TEACHERS}`)
      .then((res) => {
        this.teachers = res.data;
      })
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      })
      .finally(() => spin.setSpin(false));
  }

  removeTeacher(id: string) {
    spin.setSpin(true);
    axios
      .delete(`${API}${TEACHER}`, { params: { id } })
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

  getTeacher(id: string) {
    axios
      .get(`${API}${TEACHER}`, { params: { id } })
      .then((response) => {
        this.teachers = response.data;
      })
      .catch((err: AxiosError) => {
        error.errorHandle(err);
      });
  }

  updateTeacher(data: ITeacher) {
    spin.setSpin(true);
    axios
      .put(`${API}${TEACHER}`, data)
      .then((res) => {
        if (res.status === 201) {
          message.success(
            {
              content: `teacher: ${data.firstname} updated`,
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
}

export default new Teacher();
