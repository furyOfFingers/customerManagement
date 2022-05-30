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
  // groups: ['1'],
  // students: ["2"],
  // payments: ['3'],
  // is_phone_number_client: true,
}
