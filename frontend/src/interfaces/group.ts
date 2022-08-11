import { AxiosResponse } from "axios";

export interface IGroup {
  id?: string;
  group_name: string;
  teacher: string;
  class_date: Array<string>;
  students: Array<string>;
}

export interface IGroupApi {
  create(data: IGroup): Promise<AxiosResponse>;

  getGroups(): Promise<AxiosResponse<IGroup[]>>;

  deleteGroup(id: string): Promise<AxiosResponse>;

  getGroup(id: string): Promise<AxiosResponse<IGroup>>;

  updateGroup(update: IGroup): Promise<AxiosResponse>;
}
