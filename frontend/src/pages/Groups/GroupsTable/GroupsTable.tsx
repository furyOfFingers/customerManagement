import React, { useCallback, useState } from "react";
import cls from "classnames";
import { List } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons";

import { ETableView } from "common/enums";
import { getGridConfig } from "./constants";
import { IGroup } from "interfaces/group";
import s from "./GroupsTable.styl";

interface IGroupsTable {
  view?: ETableView;
  listGroups: IGroup[];
  remove: (id: string) => void;
  onEdit: (id: string) => void;
}

const GroupsTable = ({
  listGroups,
  remove,
  onEdit,
  view = ETableView.LIST,
}: IGroupsTable): JSX.Element => {
  const [groupId, setGroupId] = useState<string>();

  const handleRemove = useCallback((id: string) => {
    remove(id);
    setGroupId("");
  }, []);

  const handleDetail = useCallback((id: string) => {
    setGroupId((groupId) => (groupId ? "" : id));
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
        dataSource={listGroups}
        renderItem={(group: IGroup) => {
          if (!group?.group_name) return null;

          const title = ` ${group.group_name}`;

          return (
            <List.Item
              onBlur={() => setGroupId("")}
              className={s.listItem}
              actions={[
                <ExpandAltOutlined
                  key={group.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => handleDetail(group.id as string)}
                />,

                <EditOutlined
                  key={group.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => onEdit(group.id as string)}
                />,

                <DeleteOutlined
                  key={group.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => handleRemove(group.id as string)}
                />,
              ]}
            >
              <List.Item.Meta
                title={title}
                description={groupId === group.id ? group.group_name : null}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default GroupsTable;
