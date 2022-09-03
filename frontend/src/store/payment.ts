import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { AxiosError } from "axios";

import spinStore from "store/spin";
import { IPaymentApi, IPayment } from "interfaces/payment";
import PaymentApi from "services/Payment.api";
import { getInitialData } from "./utils/utils";
import { ERequestStatus } from "common/enums";

const initial = {
  payment: getInitialData<IPayment | null>(null),
  payments: getInitialData<IPayment[]>([]),
  removeRequest: getInitialData(null),
  updateRequest: getInitialData(null),
  createRequest: getInitialData(null),
};

class Payment {
  private services: IPaymentApi;
  payments = initial.payments;
  payment = initial.payment;
  removeRequest = initial.removeRequest;
  updateRequest = initial.updateRequest;
  createRequest = initial.createRequest;

  constructor(services: IPaymentApi) {
    this.services = services;
    makeAutoObservable(this);
  }

  *createPayment(payment: IPayment) {
    this.createRequest = {
      ...this.createRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { status, data } = yield this.services.create(payment);

      if (status === 201) {
        message.success(
          {
            content: `payment: with method -  ${payment.method} and amount - ${payment.payment_amount} added`,
            style: {
              marginTop: "20vh",
            },
          },
          5
        );
      }
      this.createRequest = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
    } catch (err) {
      this.createRequest = {
        ...this.createRequest,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  *getPayments() {
    spinStore.setSpin(true);
    this.payments = {
      ...this.payments,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getPayments();
      this.payments = {
        data,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
      spinStore.setSpin(false);
    } catch (err) {
      this.payments = {
        ...this.payments,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
      spinStore.setSpin(false);
    }
  }

  *removePayment(id: string) {
    this.removeRequest = {
      ...this.removeRequest,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data, status } = yield this.services.deletePayment(id);

      if (status === 200) {
        message.success(
          {
            content: data,
            style: {
              marginTop: "20vh",
            },
          },
          5
        );
        this.removeRequest = {
          data,
          status: ERequestStatus.SUCCESS,
          error: null,
        };
      }
    } catch (err) {
      this.removeRequest = {
        ...this.removeRequest,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  *getPayment(id: string) {
    this.payment = {
      ...this.payment,
      status: ERequestStatus.PENDING,
    };
    try {
      const { data } = yield this.services.getPayment(id);

      this.payment = {
        data: data as IPayment,
        status: ERequestStatus.SUCCESS,
        error: null,
      };
    } catch (err) {
      this.payment = {
        ...this.payment,
        status: ERequestStatus.FAIL,
        error: err as AxiosError,
      };
    }
  }

  findPayment(id: string) {
    const result = this.payments.data?.find((payment) => payment.id === id);

    return result;
  }
}

const paymentApi = new PaymentApi();

export default new Payment(paymentApi);
