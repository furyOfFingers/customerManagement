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
