import {EModalMode} from "common/enums";

export function getModalMode(id?: string) {
  return function() {
    return id
      ? EModalMode.EDIT
      : EModalMode.ADD;
  };
}
