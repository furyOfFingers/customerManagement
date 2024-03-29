import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { AxiosError } from "axios";

import TeacherApi from "services/Teacher.api";
import { getInitialData } from "./utils/utils";
import spinStore from "store/spin";
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

  *getTeachers() {
    spinStore.setSpin(true);
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
      spinStore.setSpin(false);
    } catch (err) {
      this.teachers = {
        ...this.teachers,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
      spinStore.setSpin(false);
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

  *updateTeacher(update: ITeacher) {
    this.updateRequest.status = ERequestStatus.PENDING;
    try {
      const { data, status } = yield this.services.updateTeacher(update);

      this.updateRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };

      if (status === 201) {
        message.success(
          {
            content: `teacher: ${update.firstname} updated`,
          },
          3
        );
      }
    } catch (err) {
      this.updateRequest.status = ERequestStatus.FAIL;
      this.updateRequest.error = err as AxiosError;
    }
  }

  findTeacher(id: string) {
    const result = this.teachers.data?.find((teacher) => teacher.id === id);

    return result;
  }
}
const teacherApi = new TeacherApi();

export default new Teacher(teacherApi);
