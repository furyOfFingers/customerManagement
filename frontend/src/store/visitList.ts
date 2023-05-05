import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { AxiosError } from "axios";

import VisitListApi from "services/VisitList.api";
import { getInitialData } from "./utils/utils";
import { ERequestStatus } from "common/enums";
import {
  IRequestVisitList,
  IVisitListApi,
  TVisitList,
} from "interfaces/visitList";

const initial = {
  visitList: getInitialData<TVisitList | null>(null),
  updateRequest: getInitialData<TVisitList | null>(null),
  setVisitList: getInitialData(null),
};

class VisitList {
  private services: IVisitListApi;
  visitList = initial.visitList;
  updateRequest = initial.updateRequest;
  public loader = false;

  constructor(services: IVisitListApi) {
    this.services = services;
    makeAutoObservable(this);
  }

  *getVisitList(params: IRequestVisitList) {
    this.visitList = {
      ...this.visitList,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getVisitList(params);
      this.visitList = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
    } catch (err) {
      this.visitList = {
        ...this.visitList,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  *setVisitList(params: TVisitList) {
    this.updateRequest.status = ERequestStatus.PENDING;
    try {
      const { data, status } = yield this.services.setVisitList(params);

      this.updateRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };

      if (status === 201) {
        message.success(
          {
            content: "shedule updated",
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

  public get getVisitListData() {
    return this.visitList.data;
  }
}
const visitListApi = new VisitListApi();

export default new VisitList(visitListApi);
