import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import cls from "classnames";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";

import { IPayment } from "interfaces/payment";
import { ETableView } from "common/enums";
import PaymentsForm from "./PaymentsForm";
import PaymentsTable from "./PaymentsTable";
import teacherStore from "store/teacher";
import groupStore from "store/group";
import paymentStore from "store/payment";
import spinStore from "store/spin";
import studentStore from "store/student";

import s from "./Payments.styl";

const Payments = (): JSX.Element | null => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [picked, setPicked] = useState<IPayment | null>(null);
  const [tableView, setTableView] = useState<ETableView>(ETableView.LIST);

  useEffect(() => {
    teacherStore.getTeachers();
    groupStore.getGroups();
    studentStore.getStudents();
    paymentStore.getPayments();
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleAdd = useCallback(async (data: IPayment) => {
    await paymentStore.createPayment(data as IPayment);
  }, []);

  const handleRemove = (id: string) => {
    if (!paymentStore.payments.data?.length || !id) return;

    const selected = paymentStore.findPayment(id);

    if (!selected) return;

    setPicked(selected);
    Modal.confirm({
      title: "Remove payment",
      content: `remove payment ${selected.method} ${selected.payment_amount}?`,
      onOk: () => confirmHandleRemove(selected.id!),
      onCancel: handleReset,
    });
  };

  const handleCloseEditModal = useCallback(() => {
    setPicked(null);
    setIsModalOpen(false);
  }, []);

  const handleReset = useCallback(() => {
    setPicked(null);
  }, []);

  const confirmHandleRemove = async (id: string) => {
    await paymentStore.removePayment(id);
    await paymentStore.getPayments();
    handleReset();
  };

  const handleSetView = useCallback(
    (view: ETableView) => () => {
      setTableView(view);
    },
    []
  );

  return spinStore.get() ? null : (
    <div className={s.form_container}>
      <div className={s.action_panel}>
        <AppstoreOutlined
          className={s.icon}
          onClick={handleSetView(ETableView.BOX)}
        />
        <MenuOutlined
          className={s.icon}
          onClick={handleSetView(ETableView.LIST)}
        />
      </div>

      <Button type="primary" onClick={handleOpenModal}>
        Add payment
      </Button>

      <div
        className={cls(s.container, {
          [s.view_box]: tableView === ETableView.BOX,
        })}
      >
        <PaymentsTable
          view={tableView}
          remove={handleRemove}
          list={paymentStore.payments.data}
        />
      </div>

      {isModalOpen && (
        <PaymentsForm
          picked={picked}
          onAdd={handleAdd}
          onCancel={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default observer(Payments);
