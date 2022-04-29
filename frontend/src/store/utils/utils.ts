import { ERequestStatus } from "common/enums";
import { IRequestData } from "common/types";

export function getInitialData<T>(data: T | null): IRequestData<T> {
  return {
    data,
    error: null,
    status: ERequestStatus.IDLE,
  };
}
