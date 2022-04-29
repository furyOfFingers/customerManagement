import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { AxiosError } from "axios";

import spin from "store/spin";
import { IStudentApi, IStudents } from "interfaces/student";
import StudentApi from "services/Student.api";
import { getInitialData } from "./utils/utils";
import { ERequestStatus } from "common/enums";

const initial = {
  students: getInitialData<IStudents[]>([]),
  student: getInitialData<IStudents>(null),
  removeRequest: getInitialData(null),
  updateRequest: getInitialData(null),
  createRequest: getInitialData(null),
};

class Student {
  private services: IStudentApi;
  students = initial.students;
  student = initial.student;
  removeRequest = initial.removeRequest;
  updateRequest = initial.updateRequest;
  createRequest = initial.createRequest;

  constructor(services: IStudentApi) {
    this.services = services;
    makeAutoObservable(this);
  }

  async createStudent(student: IStudents) {
    this.createRequest = {
      ...this.createRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { status, data } = await this.services.create(student);

      if (status === 201) {
        message.success(
          {
            content: `student: ${student.firstname} added`,
            style: {
              marginTop: "20vh",
            },
          },
          5
        );
      }
      this.createRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
    } catch (err) {
      this.createRequest = {
        ...this.createRequest,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  async getStudents() {
    spin.setSpin(true);
    this.students = {
      ...this.students,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = await this.services.getStudents();
      this.students = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
      spin.setSpin(false);
    } catch (err) {
      this.students = {
        ...this.students,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
      spin.setSpin(false);
    }
  }

  async removeStudent(id: string) {
    this.removeRequest = {
      ...this.removeRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data, status } = await this.services.deleteStudent(id);
      this.removeRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };

      if (status === 200) {
        message.success(
          {
            content: data,
            style: {
              marginTop: "20vh",
            },
          },
          5
        );
      }
    } catch (err) {
      this.removeRequest = {
        ...this.removeRequest,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  async getStudent(studentId: string) {
    this.student = {
      ...this.student,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = await this.services.getStudent(studentId);
      this.student = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
    } catch (err) {
      this.student = {
        ...this.student,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  async updateStudent(updatedStudent: IStudents) {
    this.updateRequest = {
      ...this.updateRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data, status } = await this.services.updateStudent(
        updatedStudent
      );
      this.updateRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };

      if (status === 201) {
        message.success(
          {
            content: `student: ${updatedStudent.firstname} updated`,
            style: {
              marginTop: "20vh",
            },
          },
          5
        );
      }
    } catch (err) {
      this.updateRequest = {
        ...this.updateRequest,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }
}

const studentApi = new StudentApi();

export default new Student(studentApi);
