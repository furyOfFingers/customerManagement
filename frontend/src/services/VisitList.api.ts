import axios from "axios";

import { API, VISITLIST } from "constants/api";
import {
  IRequestVisitList,
  TVisitList,
  IVisitListApi,
} from "interfaces/visitList";

const VISITLIST_URL = `${API}${VISITLIST}`;

export default class VisitListApi implements IVisitListApi {
  async getVisitList(params: IRequestVisitList) {
    return await axios.get(VISITLIST_URL, { params });
  }

  async setVisitList(data: TVisitList) {
    return await axios.put(VISITLIST_URL, data);
  }
}
