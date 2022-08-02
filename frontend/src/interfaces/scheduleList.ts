import { AxiosResponse } from "axios";

import { ISchedule } from "interfaces/schedule";

export interface IScheduleList {
  id?: string;
  schedule_list_name: string;
  schedule: ISchedule | undefined;
  date_created: string;
}

export interface IScheduleListApi {
  create(data: IScheduleList): Promise<AxiosResponse>;

  getScheduleLists(): Promise<AxiosResponse<IScheduleList[]>>;

  deleteScheduleList(id: string): Promise<AxiosResponse>;

  getScheduleList(id: string): Promise<AxiosResponse<IScheduleList>>;

  updateScheduleList(update: IScheduleList): Promise<AxiosResponse>;
}
