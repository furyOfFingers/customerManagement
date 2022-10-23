import { EModalMode, ETableView } from "common/enums";
import { locale } from "common/locale";

export const getModalMode = (value?: unknown) => () =>
  value ? EModalMode.EDIT : EModalMode.ADD;

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

export const AVATAR_SIZE = 56;

export const getGridConfig = (view: ETableView) => {
  if (!view || view === ETableView.LIST) return;

  return {
    gutter: 16,
  };
};
