import { AxiosResponse } from "axios";

export interface IStudents {
  id?: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  phone: string;
  birthday: string;
  gender: "male" | "female";
  photo: Blob | undefined;
  // groups: ['1'],
  // parents: ["2"],
  // payment: ['3'],
  // is_phone_number_client: true,
}

export interface IStudentApi {
  create(data: IStudents): Promise<AxiosResponse>;

  getStudents(): Promise<AxiosResponse<IStudents[]>>;

  deleteStudent(id: string): Promise<AxiosResponse>;

  getStudent(studentId: string): Promise<AxiosResponse<IStudents>>;

  updateStudent(updatedStudent: IStudents): Promise<AxiosResponse>;
}
