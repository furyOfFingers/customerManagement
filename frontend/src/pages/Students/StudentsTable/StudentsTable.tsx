import React, {useCallback, useState} from "react";
import { observer } from "mobx-react";
import { List, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { IStudents } from "interfaces/student";
import s from "./StudentsTable.styl";
import AddForm from "../AddForm";

interface IStudentsTable {
  students: IStudents[];
}

const StudentsTable = ({ students }: IStudentsTable): JSX.Element => {
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
  }, []);

  const handleDetail = useCallback((id: string) => {
    console.log("--> id", id);
    id && setStudentId(id);
  }, []);

  const handleUpdateStudent = useCallback(() => {
    handleHideEditStudentModal();
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
        itemLayout="horizontal"
        dataSource={students}
        renderItem={(student: IStudents) => {
          const title = `${student.lastname}
            ${student.firstname.substring(0, 1)}.
            ${student.patronymic.substring(0, 1)}.`;

          return (
            <List.Item
              className={s.listItem}
              onClick={() => handleDetail(student.id as string)}
              actions={[
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
                avatar={<Avatar src={student.photo} />}
                // title={<a href="https://ant.design">{item.name.last}</a>}
                title={title}
                // description="description"
              />
            </List.Item>
          );
        }}
      />
    </div>
    {isEditStudentModalShown && (
      <AddForm onSubmit={handleUpdateStudent} onReject={handleCloseEditStudentModal} id={studentId}/>
    )}
    </>
  );
};

export default observer(StudentsTable);
