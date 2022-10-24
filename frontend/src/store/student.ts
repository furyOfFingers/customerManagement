import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { AxiosError } from "axios";

import spinStore from "store/spin";
import { IStudentApi, IStudent } from "interfaces/student";
import StudentApi from "services/Student.api";
import { getInitialData } from "./utils/utils";
import { ERequestStatus } from "common/enums";

const initial = {
  student: getInitialData<IStudent | null>(null),
  students: getInitialData<IStudent[]>([]),
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

  *createStudent(student: IStudent) {
    this.createRequest = {
      ...this.createRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { status, data } = yield this.services.create(student);

      if (status === 201) {
        message.success(
          {
            content: `student: ${student.firstname} added`,
            style: {
              marginTop: "20vh",
            },
          },
          3
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

  *getStudents() {
    spinStore.setSpin(true);
    this.students = {
      ...this.students,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getStudents();
      this.students = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
      spinStore.setSpin(false);
    } catch (err) {
      this.students = {
        ...this.students,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
      spinStore.setSpin(false);
    }
  }

  *removeStudent(id: string) {
    this.removeRequest = {
      ...this.removeRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data, status } = yield this.services.deleteStudent(id);

      if (status === 200) {
        message.success(
          {
            content: data,
            style: {
              marginTop: "20vh",
            },
          },
          3
        );
        this.removeRequest = {
          data,
          status: ERequestStatus.SUCCESS,
          error: null,
        };
      }
    } catch (err) {
      this.removeRequest = {
        ...this.removeRequest,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  *getStudent(id: string) {
    this.student = {
      ...this.student,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getStudent(id);

      this.student = {
        data: data as IStudent,
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

  *updateStudent(updatedStudent: IStudent) {
    this.updateRequest.status = ERequestStatus.PENDING;
    try {
      const { data, status } = yield this.services.updateStudent(
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
          3
        );
      }
    } catch (err) {
      this.updateRequest.status = ERequestStatus.FAIL;
      this.updateRequest.error = err as AxiosError;
    }
  }

  *uploadStudents(file: Blob) {
    this.updateRequest.status = ERequestStatus.PENDING;
    try {
      const { data, status } = yield this.services.uploadStudents(file);

      this.updateRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };

      if (status === 201) {
        message.success(
          {
            content: "students are uploaded",
            style: {
              marginTop: "20vh",
            },
          },
          3
        );
      }
    } catch (err) {
      this.updateRequest.status = ERequestStatus.FAIL;
      this.updateRequest.error = err as AxiosError;
    }
  }

  findStudent(id: string) {
    const result = this.students.data?.find((student) => student.id === id);

    return result;
  }
}

const studentApi = new StudentApi();

export default new Student(studentApi);
