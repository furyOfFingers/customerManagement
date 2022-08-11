import axios from "axios";
import { API, GROUP, GROUPS } from "constants/api";
import { IGroup, IGroupApi } from "interfaces/group";

const GROUP_URL = `${API}${GROUP}`;

export default class TeacherApi implements IGroupApi {
  async create(data: IGroup) {
    return await axios.post(GROUP_URL, data);
  }

  async getGroups() {
    return await axios.get(`${API}${GROUPS}`);
  }

  async deleteGroup(id: string) {
    return await axios.delete(GROUP_URL, { params: { id } });
  }

  async getGroup(id: string) {
    return await axios.get(GROUP_URL, { params: { id } });
  }

  async updateGroup(updatedGroup: IGroup) {
    return await axios.put(GROUP_URL, updatedGroup);
  }
}
