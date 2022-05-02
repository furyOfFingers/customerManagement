import { ERequestStatus } from "common/enums";
import { IRequestData } from "common/types";

export function isInitial(value: IRequestData | ERequestStatus) {
  if (typeof value === "object") {
    return value.status === ERequestStatus.IDLE;
  }

  return value === ERequestStatus.IDLE;
}

export function isPending(
  value: IRequestData | ERequestStatus,
  includeInitial?: boolean
) {
  if (includeInitial && typeof value === "object") {
    return (
      value.status === ERequestStatus.IDLE ||
      value.status === ERequestStatus.PENDING
    );
  }

  if (typeof value === "object") {
    return value.status === ERequestStatus.PENDING;
  }

  if (includeInitial) {
    return value === ERequestStatus.IDLE || value === ERequestStatus.PENDING;
  }

  return value === ERequestStatus.PENDING;
}

export function isFulfilled(
  value: IRequestData | ERequestStatus,
  includeFailed?: boolean
) {
  if (includeFailed && typeof value === "object") {
    return (
      value.status === ERequestStatus.FAIL ||
      value.status === ERequestStatus.PENDING
    );
  }

  if (typeof value === "object") {
    return value.status === ERequestStatus.PENDING;
  }

  if (includeFailed) {
    return value === ERequestStatus.FAIL || value === ERequestStatus.PENDING;
  }

  return value === ERequestStatus.PENDING;
}
