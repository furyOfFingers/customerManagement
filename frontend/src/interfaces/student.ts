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
  // groups: ['1'],
  // parents: ["2"],
  // payment: ['3'],
  // is_phone_number_client: true,
}

export interface IStudentApi {
  create(data: IStudent): Promise<AxiosResponse>;

  getStudents(): Promise<AxiosResponse<IStudent[]>>;

  deleteStudent(id: string): Promise<AxiosResponse>;

  getStudent(studentId: string): Promise<AxiosResponse<IStudent>>;

  updateStudent(updatedStudent: IStudent): Promise<AxiosResponse>;
}
