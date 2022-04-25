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
import AddForm from "../AddForm";

interface IStudentsTable {
  listStudents: IStudents[];
  remove: (id: string) => void;
}

const StudentsTable = ({
  listStudents,
  remove,
}: IStudentsTable): JSX.Element => {
  const [isEditStudentModalShown, setIsEditStudentModalShown] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);
  const handleEdit = useCallback((id: string) => {
    console.log("--> id", id);
    id && setStudentId(id);
    handleViewEditStudentModal();
  }, []);

  const handleViewEditStudentModal = useCallback(() => {
    setIsEditStudentModalShown(true);
  }, []);

  const handleHideEditStudentModal = useCallback(() => {
    setIsEditStudentModalShown(false);
  }, []);

  const handleRemove = useCallback((id: string) => {
    console.log("--> id", id);
    id && setStudentId(id);
    remove(id);
    setStudentId(null);
  }, []);

  const handleDetail = useCallback((id: string) => {
    console.log("--> id", id);
    setStudentId((studentId) => (studentId ? null : id));
  }, []);

  const handleCloseEditStudentModal = useCallback(() => {
    setStudentId(null);
    handleHideEditStudentModal();
  }, []);

  return (
    <>
      <div className={s.container}>
        <List
          className={s.list}
          dataSource={listStudents}
          itemLayout="horizontal"
          renderItem={(student: IStudents) => {
            if (!student?.firstname) return null;

            const title = `${student?.lastname}
            ${student.firstname.substring(0, 1)}.
            ${student.patronymic.substring(0, 1)}.`;

            return (
              <List.Item
                onBlur={() => setStudentId(null)}
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
      {isEditStudentModalShown && (
        <AddForm onCancel={handleCloseEditStudentModal} id={studentId} />
      )}
    </>
  );
};

export default observer(StudentsTable);
