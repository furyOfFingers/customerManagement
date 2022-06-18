import React, { useCallback, useState } from "react";
import cls from "classnames";
import { List, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons";

import { IStudent } from "interfaces/student";
import { ETableView } from "common/enums";
import { getGridConfig } from "./constants";
import s from "./StudentsTable.styl";

interface IStudentsTable {
  view?: ETableView;
  listStudents: IStudent[];
  remove: (id: string) => void;
  onEdit: (id: string) => void;
}

const StudentsTable = ({
  listStudents,
  remove,
  onEdit,
  view = ETableView.LIST,
}: IStudentsTable): JSX.Element => {
  const [studentId, setStudentId] = useState<string>();

  const handleRemove = useCallback((id: string) => {
    remove(id);
    setStudentId("");
  }, []);

  const handleDetail = useCallback((id: string) => {
    setStudentId((studentId) => (studentId ? "" : id));
  }, []);

  return (
    <div
      className={cls(s.container, {
        [s.view_box]: view === ETableView.BOX,
        [s.view_list]: view === ETableView.LIST,
      })}
    >
      <List
        grid={getGridConfig(view)}
        className={s.list}
        itemLayout="horizontal"
        dataSource={listStudents}
        renderItem={(student: IStudent) => {
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
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => handleDetail(student.id as string)}
                />,

                <EditOutlined
                  key={student.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => onEdit(student.id as string)}
                />,

                <DeleteOutlined
                  key={student.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => handleRemove(student.id as string)}
                />,
              ]}
            >
              <List.Item.Meta
                title={title}
                description={studentId === student.id ? student.phone : null}
                avatar={
                  <Avatar
                    size={view === ETableView.BOX ? 56 : "default"}
                    src={student.photo}
                    icon={<UserOutlined />}
                  />
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default StudentsTable;
