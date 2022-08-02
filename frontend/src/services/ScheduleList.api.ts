import axios from "axios";

import { API, SCHEDULELIST, SCHEDULELISTS } from "constants/api";
import { IScheduleList, IScheduleListApi } from "interfaces/scheduleList";

const SCHEDULELIST_URL = `${API}${SCHEDULELIST}`;

export default class ScheduleListApi implements IScheduleListApi {
  async create(data: IScheduleList) {
    return await axios.post(SCHEDULELIST_URL, data);
  }

  async getScheduleLists() {
    return await axios.get(`${API}${SCHEDULELISTS}`);
  }

  async deleteScheduleList(id: string) {
    return await axios.delete(SCHEDULELIST_URL, { params: { id } });
  }

  async getScheduleList(id: string) {
    return await axios.get(SCHEDULELIST_URL, { params: { id } });
  }

  async updateScheduleList(updated: IScheduleList) {
    return await axios.put(SCHEDULELIST_URL, updated);
  }
}
