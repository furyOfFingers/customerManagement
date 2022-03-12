import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { AxiosError } from "axios";

class ErrorHandle {
  constructor() {
    makeAutoObservable(this);
  }

  errorHandle(error: AxiosError | Error) {
    const e = error as AxiosError;

    message.error(
      {
        content: `status: ${e.response?.status}, data: ${e.response?.data}`,
        style: {
          marginTop: "20vh",
        },
      },
      5
    );
  }
}

export default new ErrorHandle();
