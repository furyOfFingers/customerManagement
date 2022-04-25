import { ERequestStatus } from "./enums";

export type Maybe<T> = T | null | undefined;

export interface IRequestData<T> {
  data: T;
  error: string;
  status: ERequestStatus;
}
