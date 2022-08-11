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
  schedule_list_name: "first",
  schedule: {
    monday: ["00:00", "00:00"],
    thursday: ["00:00", "00:00"],
  },
};

export const AVATAR_SIZE = 56;
