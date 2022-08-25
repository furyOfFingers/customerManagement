import { AxiosResponse } from "axios";
import { EnumPayment } from "enums/payment";

export interface IPayment {
  id: string;
  date: string;
  payment_amount: number;
  type: keyof typeof EnumPayment;
  payerId: string;
  method: "cash" | "card";
  teacherId?: string;
  groupId?: string;
}

export interface IPaymentApi {
  create(data: IPayment): Promise<AxiosResponse>;

  getPayments(): Promise<AxiosResponse<IPayment[]>>;

  deletePayment(id: string): Promise<AxiosResponse>;

  getPayment(id: string): Promise<AxiosResponse<IPayment>>;

  updatePayment(update: IPayment): Promise<AxiosResponse>;
}
