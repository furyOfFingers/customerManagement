import React, { useCallback, useState } from "react";
import cls from "classnames";
import { List, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons";

import { ITeacher } from "interfaces/teacher";
import { ETableView } from "common/enums";
import { getGridConfig } from "common/utils/form";
import s from "./TeachersTable.styl";

interface ITeachersTable {
  view?: ETableView;
  listTeachers: ITeacher[];
  remove: (id: string) => void;
  onEdit: (id: string) => void;
}

const TeachersTable = ({
  listTeachers,
  remove,
  onEdit,
  view = ETableView.LIST,
}: ITeachersTable): JSX.Element => {
  const [teacherId, setTeacherId] = useState<string>();

  const handleRemove = useCallback((id: string) => {
    remove(id);
    setTeacherId("");
  }, []);

  const handleDetail = useCallback((id: string) => {
    setTeacherId((teacherId) => (teacherId ? "" : id));
  }, []);

  return (
    <div
      className={cls({
        [s.view_box]: view === ETableView.BOX,
        [s.view_list]: view === ETableView.LIST,
      })}
    >
      <List
        grid={getGridConfig(view)}
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
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => handleDetail(teacher.id as string)}
                />,

                <EditOutlined
                  key={teacher.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => onEdit(teacher.id as string)}
                />,

                <DeleteOutlined
                  key={teacher.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => handleRemove(teacher.id as string)}
                />,
              ]}
            >
              <List.Item.Meta
                title={title}
                description={teacherId === teacher.id ? teacher.phone : null}
                avatar={
                  <Avatar
                    size={view === ETableView.BOX ? 56 : "default"}
                    src={teacher.photo}
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

export default TeachersTable;
