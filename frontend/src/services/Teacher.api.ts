import axios from "axios";
import { API, TEACHER, TEACHERS } from "constants/api";
import { ITeacher, ITeacherApi } from "interfaces/teacher";

const TEACHER_URL = `${API}${TEACHER}`;

export default class TeacherApi implements ITeacherApi {
  async create(data: ITeacher) {
    return await axios.post(TEACHER_URL, data);
  }

  async getTeachers() {
    return await axios.get(`${API}${TEACHERS}`);
  }

  async deleteTeacher(id: string) {
    return await axios.delete(TEACHER_URL, { params: { id } });
  }

  async getTeacher(id: string) {
    return await axios.get(TEACHER_URL, { params: { id } });
  }

  async updateTeacher(updatedTeacher: ITeacher) {
    return await axios.put(TEACHER_URL, updatedTeacher);
  }
}
