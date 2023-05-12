import axios from "axios";

import { API, MONEYREPORT } from "constants/api";
import {
  ICreateReportSettings,
  IUpdateReportSettings,
  IMoneyReportSettingsApi,
} from "interfaces/moneyReport";

const URL = `${API}${MONEYREPORT}`;

export default class MoneyReportSettingsApi implements IMoneyReportSettingsApi {
  async create(data: ICreateReportSettings) {
    return await axios.post(URL, data);
  }

  async getMoneyReportSettings() {
    return await axios.get(URL);
  }

  async updateMoneyReportSettings(update: IUpdateReportSettings) {
    return await axios.put(URL, update);
  }
}
