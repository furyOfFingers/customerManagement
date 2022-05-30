import React, { useCallback, useState } from "react";
import { List, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons";

import { ITeacher } from "interfaces/teacher";
import s from "./TeachersTable.styl";
import TeacherForm from "../TeacherForm";

interface ITeachersTable {
  listTeachers: ITeacher[];
  remove: (id: string) => void;
}

const TeachersTable = ({
  listTeachers,
  remove,
}: ITeachersTable): JSX.Element => {
  const [isEditMWOpen, setIsEditMWOpen] = useState(false);
  const [teacherId, setTeacherId] = useState<string>();
  const [pickedTeacher, setPickedTeacher] = useState<ITeacher>();

  const handleEdit = useCallback((id: string) => {
    const actualTeacher = listTeachers.find((teacher) => teacher.id === id);

    setPickedTeacher(actualTeacher);
    setIsEditMWOpen(true);
  }, []);

  const handleRemove = useCallback((id: string) => {
    remove(id);
    setTeacherId("");
  }, []);

  const handleDetail = useCallback((id: string) => {
    setTeacherId((teacherId) => (teacherId ? "" : id));
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setTeacherId("");
    setPickedTeacher(undefined);
    setIsEditMWOpen(false);
  }, []);

  return (
    <>
      <div className={s.container}>
        <List
          className={s.list}
          itemLayout="horizontal"
          dataSource={listTeachers}
          renderItem={(teacher: ITeacher) => {
            if (!teacher?.firstname) return null;

            const title = `${teacher?.lastname}
            ${teacher.firstname.substring(0, 1)}.
            ${teacher.patronymic.substring(0, 1)}.`;

            return (
              <List.Item
                onBlur={() => setTeacherId("")}
                className={s.listItem}
                actions={[
                  <ExpandAltOutlined
                    key={teacher.id}
                    className={s.icon}
                    onClick={() => handleDetail(teacher.id as string)}
                  />,

                  <EditOutlined
                    key={teacher.id}
                    className={s.icon}
                    onClick={() => handleEdit(teacher.id as string)}
                  />,

                  <DeleteOutlined
                    key={teacher.id}
                    className={s.icon}
                    onClick={() => handleRemove(teacher.id as string)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={title}
                  description={teacherId === teacher.id ? teacher.phone : null}
                  avatar={
                    <Avatar src={teacher.photo} icon={<UserOutlined />} />
                  }
                />
              </List.Item>
            );
          }}
        />
      </div>

      {isEditMWOpen && (
        <TeacherForm
          pickedTeacher={pickedTeacher}
          onCancel={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default TeachersTable;
