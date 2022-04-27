import axios from "axios";
import { API, STUDENT, STUDENTS } from "constants/api";
import { IStudentApi, IStudents } from "interfaces/student";

const STUDENT_URL = `${API}${STUDENT}`;

export default class StudentApi implements IStudentApi {
  async create(data: IStudents) {
    return await axios.post(STUDENT_URL, data);
  }

  async getStudents() {
    return await axios.get(`${API}${STUDENTS}`);
  }

  async deleteStudent(id: string) {
    return await axios.delete(STUDENT_URL, { params: { id } });
  }

  async getStudent(id: string) {
    return await axios.get(STUDENT_URL, { params: { id } });
  }

  async updateStudent(updatedStudent: IStudents) {
    return await axios.put(STUDENT_URL, updatedStudent);
  }
}
