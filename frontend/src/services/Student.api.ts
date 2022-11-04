import axios from "axios";
import { API, STUDENT, STUDENTS, UPLOAD } from "constants/api";
import { IStudentApi, IStudent } from "interfaces/student";

const STUDENT_URL = `${API}${STUDENT}`;

export default class StudentApi implements IStudentApi {
  async create(data: IStudent) {
    return await axios.post(STUDENT_URL, data);
  }

  async getStudents() {
    return await axios.get(`${API}/${STUDENTS}`);
  }

  async deleteStudent(id: string) {
    return await axios.delete(STUDENT_URL, { params: { id } });
  }

  async getStudent(id: string) {
    return await axios.get(STUDENT_URL, { params: { id } });
  }

  async updateStudent(updatedStudent: IStudent) {
    return await axios.put(STUDENT_URL, updatedStudent);
  }

  async uploadStudents(file: Blob) {
    return await axios.post(`${API}${UPLOAD}/${STUDENTS}`, file, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
