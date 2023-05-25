import { AxiosResponse } from "axios";
import { EnumPayment } from "enums/payment";

export interface IPayment {
  id: string;
  payment_date: string;
  payment_amount: string;
  type: keyof typeof EnumPayment;
  payer_id: string;
  method: "cash" | "card";
  teacher_id?: string;
  group_id?: string;
}

export interface IPaymentApi {
  create(data: IPayment): Promise<AxiosResponse>;

  getPayments(from: string, to: string): Promise<AxiosResponse<IPayment[]>>;

  deletePayment(id: string): Promise<AxiosResponse>;

  getPayment(id: string): Promise<AxiosResponse<IPayment>>;
}
