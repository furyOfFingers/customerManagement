import axios from "axios";

import { API, VISITLIST } from "constants/api";
import {
  IRequestVisitList,
  TVisitList,
  IVisitListApi,
} from "interfaces/visitList";

const VISITLIST_URL = `${API}${VISITLIST}`;

export default class VisitListApi implements IVisitListApi {
  async getVisitList(data: IRequestVisitList) {
    return await axios.get(VISITLIST_URL, { params: { data } });
  }

  async setVisitList(data: TVisitList) {
    return await axios.put(VISITLIST_URL, data);
  }
}
