import {EModalMode} from "common/enums";
import {locale} from "common/locale";

export const ButtonsConfig = {
  [EModalMode.ADD]: {
    SubmitButton: {
      title: locale.form.add,
    }
  },
  [EModalMode.EDIT]: {
    SubmitButton: {
      title: locale.form.update
    }
  }
};

export const formItemLayout = {
  labelCol: {
    span: 8 ,

  },
  wrapperCol: {
    span: 16,
  },
};