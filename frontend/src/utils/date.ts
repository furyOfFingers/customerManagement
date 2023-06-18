import moment, { Moment } from "moment";

export const dateFormat = "DD.MM.YYYY";

type Date = Moment | string | null;

export const getDate = (date: Date, format: string = dateFormat) =>
  moment(date).format(format);

export const startDate = (date?: Date) =>
  date
    ? moment(date).startOf("month").format(dateFormat)
    : moment().startOf("month").format(dateFormat);

export const endDate = (date?: Date) =>
  date
    ? moment(date).endOf("month").format(dateFormat)
    : moment().endOf("month").format(dateFormat);
