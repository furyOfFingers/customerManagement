import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { AxiosError } from "axios";

import ScheduleListApi from "services/ScheduleList.api";
import { getInitialData } from "./utils/utils";
import spinStore from "store/spin";
import { IScheduleList, IScheduleListApi } from "interfaces/scheduleList";
import { ERequestStatus } from "common/enums";

const initial = {
  scheduleList: getInitialData<IScheduleList | null>(null),
  scheduleLists: getInitialData<IScheduleList[]>([]),
  removeRequest: getInitialData(null),
  updateRequest: getInitialData(null),
  createRequest: getInitialData(null),
};

class ScheduleList {
  private services: IScheduleListApi;
  scheduleList = initial.scheduleList;
  scheduleLists = initial.scheduleLists;
  removeRequest = initial.removeRequest;
  updateRequest = initial.updateRequest;
  createRequest = initial.createRequest;

  constructor(services: IScheduleListApi) {
    this.services = services;
    makeAutoObservable(this);
  }

  *createScheduleList(scheduleList: IScheduleList) {
    this.createRequest = {
      ...this.createRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { status, data } = yield this.services.create(scheduleList);

      if (status === 201) {
        message.success(
          {
            content: `scheduleList: ${scheduleList.schedule_list_name} added`,
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

  *getScheduleLists() {
    spinStore.setSpin(true);
    this.scheduleLists = {
      ...this.scheduleLists,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getScheduleLists();
      this.scheduleLists = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
      spinStore.setSpin(false);
    } catch (err) {
      this.scheduleLists = {
        ...this.scheduleLists,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
      spinStore.setSpin(false);
    }
  }

  *removeScheduleList(id: string) {
    this.removeRequest = {
      ...this.removeRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data, status } = yield this.services.deleteScheduleList(id);

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

  *getScheduleList(id: string) {
    this.scheduleList = {
      ...this.scheduleList,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getScheduleList(id);

      this.scheduleList = {
        data: data as IScheduleList,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
    } catch (err) {
      this.scheduleList = {
        ...this.scheduleList,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  *updateScheduleList(update: IScheduleList) {
    this.updateRequest.status = ERequestStatus.PENDING;
    try {
      const { data, status } = yield this.services.updateScheduleList(update);

      this.updateRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };

      if (status === 201) {
        message.success(
          {
            content: `ScheduleList: ${update.name} updated`,
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

  findScheduleList(id: string) {
    const result = this.scheduleLists.data?.find(
      (scheduleList) => scheduleList.id === id
    );

    return result;
  }
}
const scheduleListApi = new ScheduleListApi();

export default new ScheduleList(scheduleListApi);
