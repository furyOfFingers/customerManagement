import { AxiosResponse } from "axios";

export interface IGroup {
  id?: string;
  group_name: string;
  teacher: string;
  class_date: string;
  students: string[];
}
export interface IGroupScheduleList extends IGroup {
  schedule_list_name: string;
}

export interface IGroupApi {
  create(data: IGroup): Promise<AxiosResponse>;

  getGroups(): Promise<AxiosResponse<IGroup[]>>;

  deleteGroup(id: string): Promise<AxiosResponse>;

  getGroup(id: string): Promise<AxiosResponse<IGroup>>;

  updateGroup(update: IGroup): Promise<AxiosResponse>;
}
