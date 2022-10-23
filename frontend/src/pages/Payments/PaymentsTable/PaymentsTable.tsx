import React, { useCallback, useState } from "react";
import cls from "classnames";
import { List } from "antd";
import { DeleteOutlined, ExpandAltOutlined } from "@ant-design/icons";
import moment from "moment";

import { IPayment } from "interfaces/payment";
import { ETableView } from "common/enums";
import { getGridConfig } from "common/utils/form";
import s from "./PaymentsTable.styl";

interface IPaymentsTable {
  view?: ETableView;
  list: IPayment[];
  remove: (id: string) => void;
}

const PaymentsTable = ({
  list,
  remove,
  view = ETableView.LIST,
}: IPaymentsTable): JSX.Element => {
  const [pickedId, setPickedId] = useState<string>();

  const handleRemove = useCallback((id: string) => {
    remove(id);
    setPickedId("");
  }, []);

  const handleDetail = useCallback((id: string) => {
    setPickedId((pickedId) => (pickedId ? "" : id));
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
        dataSource={list}
        renderItem={(item: IPayment) => {
          if (!item?.id) return null;

          const title = `type - ${item?.method}, amount - 
            ${item.payment_amount}, date - ${moment(item.payment_date).format(
            "DD-MM-YYYY"
          )}`;

          return (
            <List.Item
              onBlur={() => setPickedId("")}
              className={s.listItem}
              actions={[
                <ExpandAltOutlined
                  key={item.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => handleDetail(item.id as string)}
                />,

                <DeleteOutlined
                  key={item.id}
                  className={cls(s.icon, {
                    [s.icon_size]: view === ETableView.BOX,
                  })}
                  onClick={() => handleRemove(item.id as string)}
                />,
              ]}
            >
              <List.Item.Meta
                title={title}
                description={pickedId === item.id ? item.payer_id : null}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default PaymentsTable;
