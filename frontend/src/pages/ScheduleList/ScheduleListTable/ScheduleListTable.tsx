import React, { useCallback, useState } from "react";
import cls from "classnames";
import { List } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons";

import { ETableView } from "common/enums";
import { IScheduleList } from "interfaces/scheduleList";
import { getGridConfig } from ".//constants";
import s from "./ScheduleListTable.styl";

interface IOwnProps {
  view?: ETableView;
  list: IScheduleList[];
  remove: (id: string) => void;
  onEdit: (id: string) => void;
}

const ScheduleListTable = ({
  list,
  remove,
  onEdit,
  view = ETableView.LIST,
}: IOwnProps): JSX.Element => {
  const [scheduleListId, setScheduleListId] = useState<string>();

  const handleRemove = useCallback((id: string) => {
    remove(id);
    setScheduleListId("");
  }, []);

  const handleDetail = useCallback((id: string) => {
    setScheduleListId((scheduleListId) => (scheduleListId ? "" : id));
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
        dataSource={list}
        renderItem={(scheduleList: IScheduleList) => {
          if (!scheduleList?.schedule_list_name) return null;

          return (
            <List.Item
              onBlur={() => setScheduleListId("")}
              className={s.listItem}
              actions={[
                <ExpandAltOutlined
                  key={scheduleList.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => handleDetail(scheduleList.id as string)}
                />,

                <EditOutlined
                  key={scheduleList.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => onEdit(scheduleList.id as string)}
                />,

                <DeleteOutlined
                  key={scheduleList.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => handleRemove(scheduleList.id as string)}
                />,
              ]}
            >
              <List.Item.Meta
                title={scheduleList.schedule_list_name}
                description={
                  scheduleListId === scheduleList.id
                    ? scheduleList.date_created
                    : null
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default ScheduleListTable;
