import { AxiosResponse } from "axios";

export interface ITeacher {
  id?: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  phone: string;
  birthday: string;
  gender: "male" | "female";
  photo: Blob | undefined;
  students: Array<string>;
}

export interface ITeacherApi {
  create(data: ITeacher): Promise<AxiosResponse>;

  getTeachers(): Promise<AxiosResponse<ITeacher[]>>;

  deleteTeacher(id: string): Promise<AxiosResponse>;

  getTeacher(id: string): Promise<AxiosResponse<ITeacher>>;

  updateTeacher(updatedTeacher: ITeacher): Promise<AxiosResponse>;
}
