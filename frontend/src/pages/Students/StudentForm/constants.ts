import { EModalMode } from "common/enums";
import { locale } from "common/locale";
import moment from "moment";

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
  firstname: "Марат",
  lastname: "Асадуллаев",
  patronymic: "Абакарович",
  phone: "89064422353",
  birthday: moment("28-01-1990", "DD-MM-YYYY"),
  photo: "photo",
  // groups: ['1'],
  // parents: ["2"],
  // payment: ['3'],
  // is_phone_number_client: true,
};
