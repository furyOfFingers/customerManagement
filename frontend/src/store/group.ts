import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { AxiosError } from "axios";

import GroupApi from "services/Group.api";
import { getInitialData } from "./utils/utils";
import spinStore from "store/spin";
import { IGroup, IGroupApi } from "interfaces/group";
import { ERequestStatus } from "common/enums";

const initial = {
  group: getInitialData<IGroup | null>(null),
  groups: getInitialData<IGroup[]>([]),
  removeRequest: getInitialData(null),
  updateRequest: getInitialData(null),
  createRequest: getInitialData(null),
};

class Group {
  private services: IGroupApi;
  group = initial.group;
  groups = initial.groups;
  removeRequest = initial.removeRequest;
  updateRequest = initial.updateRequest;
  createRequest = initial.createRequest;

  constructor(services: IGroupApi) {
    this.services = services;
    makeAutoObservable(this);
  }

  *createGroup(group: IGroup) {
    this.createRequest = {
      ...this.createRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { status, data } = yield this.services.create(group);

      if (status === 201) {
        message.success(
          {
            content: `group: ${group.group_name} added`,
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

  *getGroups() {
    spinStore.setSpin(true);
    this.groups = {
      ...this.groups,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getGroups();
      this.groups = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
      spinStore.setSpin(false);
    } catch (err) {
      this.groups = {
        ...this.groups,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
      spinStore.setSpin(false);
    }
  }

  *removeGroup(id: string) {
    this.removeRequest = {
      ...this.removeRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data, status } = yield this.services.deleteGroup(id);

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

  *getGroup(id: string) {
    this.group = {
      ...this.group,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getGroup(id);

      this.group = {
        data: data as IGroup,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
    } catch (err) {
      this.group = {
        ...this.group,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  *updateGroup(update: IGroup) {
    this.updateRequest.status = ERequestStatus.PENDING;
    try {
      const { data, status } = yield this.services.updateGroup(update);

      this.updateRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };

      if (status === 201) {
        message.success(
          {
            content: `group: ${update.group_name} updated`,
          },
          3
        );
      }
    } catch (err) {
      this.updateRequest.status = ERequestStatus.FAIL;
      this.updateRequest.error = err as AxiosError;
    }
  }

  findGroup(id: string) {
    const result = this.groups.data?.find((group) => group.id === id);

    return result;
  }
}
const groupApi = new GroupApi();

export default new Group(groupApi);
