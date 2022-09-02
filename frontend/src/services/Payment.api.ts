import axios from "axios";
import { API, PAYMENT, PAYMENTS } from "constants/api";
import { IPaymentApi, IPayment } from "interfaces/payment";

const PAYMENT_URL = `${API}${PAYMENT}`;

export default class PaymentApi implements IPaymentApi {
  async create(data: IPayment) {
    return await axios.post(PAYMENT_URL, data);
  }

  async getPayments() {
    return await axios.get(`${API}${PAYMENTS}`);
  }

  async deletePayment(id: string) {
    return await axios.delete(PAYMENT_URL, { params: { id } });
  }

  async getPayment(id: string) {
    return await axios.get(PAYMENT_URL, { params: { id } });
  }
}
