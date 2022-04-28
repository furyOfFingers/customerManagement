import { EModalMode } from "common/enums";
import { IStudents } from "interfaces/student";

export function getModalMode(id?: IStudents) {
  return function () {
    return id ? EModalMode.EDIT : EModalMode.ADD;
  };
}
