import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { AxiosError } from "axios";

import TeacherApi from "services/Teacher.api";
import { getInitialData } from "./utils/utils";
import spin from "store/spin";
import { ITeacher, ITeacherApi } from "interfaces/teacher";
import { ERequestStatus } from "common/enums";

const initial = {
  teacher: getInitialData<ITeacher | null>(null),
  teachers: getInitialData<ITeacher[]>([]),
  removeRequest: getInitialData(null),
  updateRequest: getInitialData(null),
  createRequest: getInitialData(null),
};

class Teacher {
  private services: ITeacherApi;
  teacher = initial.teacher;
  teachers = initial.teachers;
  removeRequest = initial.removeRequest;
  updateRequest = initial.updateRequest;
  createRequest = initial.createRequest;

  constructor(services: ITeacherApi) {
    this.services = services;
    makeAutoObservable(this);
  }

  *createTeacher(teacher: ITeacher) {
    this.createRequest = {
      ...this.createRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { status, data } = yield this.services.create(teacher);

      if (status === 201) {
        message.success(
          {
            content: `teacher: ${teacher.firstname} added`,
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

  *getTeachers() {
    spin.setSpin(true);
    this.teachers = {
      ...this.teachers,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getTeachers();
      this.teachers = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
      spin.setSpin(false);
    } catch (err) {
      this.teachers = {
        ...this.teachers,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
      spin.setSpin(false);
    }
  }

  *removeTeacher(id: string) {
    this.removeRequest = {
      ...this.removeRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data, status } = yield this.services.deleteTeacher(id);

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

  *getTeacher(id: string) {
    this.teacher = {
      ...this.teacher,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getTeacher(id);

      this.teacher = {
        data: data as ITeacher,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
    } catch (err) {
      this.teacher = {
        ...this.teacher,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  *updateTeacher(updatedTeacher: ITeacher) {
    this.updateRequest.status = ERequestStatus.PENDING;
    try {
      const { data, status } = yield this.services.updateTeacher(
        updatedTeacher
      );

      this.updateRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };

      if (status === 201) {
        message.success(
          {
            content: `teacher: ${updatedTeacher.firstname} updated`,
            style: {
              marginTop: "20vh",
            },
          },
          5
        );
      }
    } catch (err) {
      this.updateRequest.status = ERequestStatus.FAIL;
      this.updateRequest.error = err as AxiosError;
    }
  }

  findTeacher(id: string) {
    const result = this.teachers.data?.find((student) => student.id === id);

    return result;
  }
}
const teacherApi = new TeacherApi();

export default new Teacher(teacherApi);

// export default new Teacher();
