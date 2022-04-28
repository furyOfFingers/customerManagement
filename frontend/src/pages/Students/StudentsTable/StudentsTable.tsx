import React, { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { List, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons";

import { IStudents } from "interfaces/student";
import s from "./StudentsTable.styl";
import StudentForm from "../StudentForm";

interface IStudentsTable {
  listStudents: IStudents[];
  remove: (id: string) => void;
}

const StudentsTable = ({
  listStudents,
  remove,
}: IStudentsTable): JSX.Element => {
  const [isEditMWOpen, setIsEditMWOpen] = useState(false);
  const [studentId, setStudentId] = useState<string>();
  const [pickedStudent, setPickedStudent] = useState<IStudents>();

  const handleEdit = useCallback((id: string) => {
    const actualStudent = listStudents.find((student) => student.id === id);

    setPickedStudent(actualStudent);
    setIsEditMWOpen(true);
  }, []);

  const handleRemove = useCallback((id: string) => {
    remove(id);
    setStudentId("");
  }, []);

  const handleDetail = useCallback((id: string) => {
    setStudentId((studentId) => (studentId ? "" : id));
  }, []);

  const handleCloseEditStudentModal = useCallback(() => {
    setStudentId("");
    setIsEditMWOpen(false);
  }, []);

  return (
    <>
      <div className={s.container}>
        <List
          className={s.list}
          itemLayout="horizontal"
          dataSource={listStudents}
          renderItem={(student: IStudents) => {
            if (!student?.firstname) return null;

            const title = `${student?.lastname}
            ${student.firstname.substring(0, 1)}.
            ${student.patronymic.substring(0, 1)}.`;

            return (
              <List.Item
                onBlur={() => setStudentId("")}
                className={s.listItem}
                actions={[
                  <ExpandAltOutlined
                    key={student.id}
                    className={s.icon}
                    onClick={() => handleDetail(student.id as string)}
                  />,

                  <EditOutlined
                    key={student.id}
                    className={s.icon}
                    onClick={() => handleEdit(student.id as string)}
                  />,

                  <DeleteOutlined
                    key={student.id}
                    className={s.icon}
                    onClick={() => handleRemove(student.id as string)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={title}
                  description={studentId === student.id ? student.phone : null}
                  avatar={
                    <Avatar src={student.photo} icon={<UserOutlined />} />
                  }
                />
              </List.Item>
            );
          }}
        />
      </div>

      {isEditMWOpen && (
        <StudentForm
          pickedStudent={pickedStudent}
          onCancel={handleCloseEditStudentModal}
        />
      )}
    </>
  );
};

export default observer(StudentsTable);
