import {EModalMode} from "common/enums";
import {Maybe} from "common/types";

export function getModalMode(id: Maybe<string>) {
  return function() {
    return id
      ? EModalMode.EDIT
      : EModalMode.ADD;
  };
}
