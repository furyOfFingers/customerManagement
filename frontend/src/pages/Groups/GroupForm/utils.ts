import { EModalMode } from "common/enums";

export function getModalMode(value?: unknown) {
  return function () {
    return value ? EModalMode.EDIT : EModalMode.ADD;
  };
}
