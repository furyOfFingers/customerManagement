import { makeAutoObservable, toJS } from "mobx";
import { is, isEmpty, mergeDeepWith, concat } from "ramda";
import { message } from "antd";
import { AxiosError } from "axios";
// import { IErrorSignIn } from "interfaces/errors";

class ErrorHandle {
  error = {};

  constructor() {
    makeAutoObservable(this);
  }

  removeError(parentPropName?: string, childPropName?: string, kill?: boolean) {
    if (kill) {
      this.error = {};
    } else {
      const targetObj = this.error?.[parentPropName];
      delete targetObj?.[childPropName];

      if (isEmpty(targetObj)) {
        delete this.error?.[parentPropName];
      }
    }
  }

  errorHandle(error: AxiosError | Error) {
    const e = error as AxiosError;

    if (is(Object, e.response?.data)) {
      const err = toJS(this.error);

      this.error = mergeDeepWith(concat, err, e.response?.data);
      console.log("--> e.response?.data", e.response?.data);
    } else {
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
}

export default new ErrorHandle();
