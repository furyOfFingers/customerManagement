import { AxiosError } from "axios";
import { ERequestStatus } from "./enums";

export type Maybe<T> = T | null | undefined;

export interface IRequestData<T = null> {
  data: T;
  error: Maybe<AxiosError>;
  status: ERequestStatus;
}
