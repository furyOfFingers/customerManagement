import { AxiosResponse } from "axios";

export interface IStudent {
  id?: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  phone: string;
  birthday: string;
  gender: "male" | "female";
  photo: Blob | undefined;
  teachers: string[];
}

export interface IStudentApi {
  create(data: IStudent): Promise<AxiosResponse>;

  getStudents(): Promise<AxiosResponse<IStudent[]>>;

  deleteStudent(id: string): Promise<AxiosResponse>;

  getStudent(id: string): Promise<AxiosResponse<IStudent>>;

  updateStudent(update: IStudent): Promise<AxiosResponse>;

  uploadStudents(file: Blob): Promise<AxiosResponse>;
}
