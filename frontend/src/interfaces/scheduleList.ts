import { AxiosResponse } from "axios";

export interface IScheduleList {
  id?: string;
  schedule_list_name: string;
  schedule: string[];
  date_created: string;
}

export interface IScheduleListApi {
  create(data: IScheduleList): Promise<AxiosResponse>;

  getScheduleLists(): Promise<AxiosResponse<IScheduleList[]>>;

  deleteScheduleList(id: string): Promise<AxiosResponse>;

  getScheduleList(id: string): Promise<AxiosResponse<IScheduleList>>;

  updateScheduleList(update: IScheduleList): Promise<AxiosResponse>;
}
