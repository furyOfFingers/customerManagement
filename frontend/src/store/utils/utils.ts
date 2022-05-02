import { ERequestStatus } from "common/enums";
import { IRequestData } from "common/types";

export function getInitialData<T extends object | null>(
  data: T
): IRequestData<T> {
  return {
    data,
    error: null,
    status: ERequestStatus.IDLE,
  };
}
