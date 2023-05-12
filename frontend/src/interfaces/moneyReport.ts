import { AxiosResponse } from "axios";

export interface IMoneyReportSettings {
  id: string;
  /** Наименование свойства объекта. */
  value: string;
  /** Наименование поля свойства объекта. */
  label: string;
  /** Подсказка для свойства объекта. */
  hint: string;
  /** Вычитаемая часть из оплаты за АБ учителю. */
  teacher_salary: string;
}

export interface IUpdateReportSettings {
  /** Вычитаемая часть из оплаты за АБ учителю. */
  [id: number]: string;
}

export interface ICreateReportSettings {
  /** Наименование свойства объекта. */
  value: string;
  /** Наименование поля свойства объекта. */
  label: string;
  /** Подсказка для свойства объекта. */
  hint: string;
  /** Вычитаемая часть из оплаты за АБ учителю. */
  teacher_salary: string;
}

export interface IMoneyReportSettingsApi {
  create(data: ICreateReportSettings): Promise<AxiosResponse>;

  getMoneyReportSettings(): Promise<AxiosResponse<IMoneyReportSettings[]>>;

  updateMoneyReportSettings(
    update: IUpdateReportSettings
  ): Promise<AxiosResponse>;
}

export const settings = [
  {
    id: "0",
    value: "commercial rent",
    label: "commercial rent",
    hint: "commercial rent",
    teacher_salary: "",
  },
  {
    id: "1",
    value: "1",
    label: "1",
    hint: "1 lesson",
    teacher_salary: "200",
  },
  {
    id: "2",
    value: "4",
    label: "4",
    hint: "4 lesson",
    teacher_salary: "500",
  },
  {
    id: "3",
    value: "8",
    label: "8",
    hint: "8 lesson",
    teacher_salary: "700",
  },
];
