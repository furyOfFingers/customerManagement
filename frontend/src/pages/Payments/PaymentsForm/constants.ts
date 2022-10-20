import moment from "moment";

import { EModalMode } from "common/enums";
import { locale } from "common/locale";

export const ButtonsConfig = {
  [EModalMode.ADD]: {
    SubmitButton: {
      title: locale.form.add,
    },
  },
  [EModalMode.EDIT]: {
    SubmitButton: {
      title: locale.form.update,
    },
  },
};

export const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const initialValues = {
  remember: true,
  type: "trial",
  payer_id: "1",
  teacher_id: "1",
  group_id: "1",
  payment_date: moment("28-01-1990", "DD-MM-YYYY"),
  payment_amount: 2,
};

export const OPTIONS_TYPE = [
  "commercial rent",
  "non commercial rent",
  "trial",
  "1",
  "4",
  "8",
  "16",
  "individual",
  "pause",
  "additional session",
];
