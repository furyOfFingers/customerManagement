import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { AxiosError } from "axios";

import MoneyReportSettingsApi from "services/MoneyReport.api";
import { getInitialData } from "./utils/utils";
import spinStore from "store/spin";
import {
  IMoneyReportSettings,
  IMoneyReportSettingsApi,
  ICreateReportSettings,
  IUpdateReportSettings,
} from "interfaces/moneyReport";
import { ERequestStatus } from "common/enums";

const initial = {
  moneyReportSettings: getInitialData<IMoneyReportSettings[] | null>(null),
  updateRequest: getInitialData(null),
  createRequest: getInitialData(null),
};

class MoneyReportSettings {
  private services: IMoneyReportSettingsApi;
  moneyReportSettings = initial.moneyReportSettings;
  updateRequest = initial.updateRequest;
  createRequest = initial.createRequest;

  constructor(services: IMoneyReportSettingsApi) {
    this.services = services;
    makeAutoObservable(this);
  }

  *createMoneyReportSettings(settings: ICreateReportSettings) {
    this.createRequest = {
      ...this.createRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { status, data } = yield this.services.create(settings);

      if (status === 201) {
        message.success(
          {
            content: `money report settings: ${data.label} updated`,
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

  *getMoneyReportSettings() {
    spinStore.setSpin(true);
    this.moneyReportSettings = {
      ...this.moneyReportSettings,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getMoneyReportSettings();
      this.moneyReportSettings = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
      spinStore.setSpin(false);
    } catch (err) {
      this.moneyReportSettings = {
        ...this.moneyReportSettings,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
      spinStore.setSpin(false);
    }
  }

  *updateMoneyReportSettings(update: IUpdateReportSettings) {
    this.updateRequest.status = ERequestStatus.PENDING;
    try {
      const { data, status } = yield this.services.updateMoneyReportSettings(
        update as IUpdateReportSettings
      );

      this.updateRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };

      if (status === 201) {
        message.success(
          {
            content: "money report settings updated",
          },
          3
        );
      }
    } catch (err) {
      this.updateRequest.status = ERequestStatus.FAIL;
      this.updateRequest.error = err as AxiosError;
    }
  }
}

const moneyReportSettingsApi = new MoneyReportSettingsApi();

export default new MoneyReportSettings(moneyReportSettingsApi);
