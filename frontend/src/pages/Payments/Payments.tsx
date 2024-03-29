import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal, DatePicker } from "antd";
import cls from "classnames";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import { RangeValue } from "rc-picker/lib/interface";
import { Moment } from "moment";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import { IPayment } from "interfaces/payment";
import { ETableView } from "common/enums";
import PaymentsForm from "./PaymentsForm";
import PaymentsTable from "./PaymentsTable";
import teacherStore from "store/teacher";
import groupStore from "store/group";
import paymentStore from "store/payment";
import moneyReportStore from "store/moneyReport";
import studentStore from "store/student";
import { startDate, endDate } from "utils/date";

import s from "./Payments.styl";

const { RangePicker } = DatePicker;

const Payments = (): JSX.Element | null => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [picked, setPicked] = useState<IPayment | null>(null);
  const [tableView, setTableView] = useState<ETableView>(ETableView.LIST);
  const [date, setDate] = useState<[string, string]>([startDate(), endDate()]);

  useEffect(() => {
    teacherStore.getTeachers();
    groupStore.getGroups();
    studentStore.getStudents();
    paymentStore.getPayments(date[0], date[1]);
    moneyReportStore.getMoneyReportSettings();
  }, []);

  const optionsType = isEmpty(moneyReportStore.moneyReportSettings.data)
    ? []
    : moneyReportStore.moneyReportSettings.data;

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
      title: t("common.panelControl.remove"),
      content: `${t("common.panelControl.remove")} ${selected.method} ${
        selected.payment_amount
      }?`,
      okText: t("common.panelControl.ok"),
      cancelText: t("common.panelControl.cancel"),
      onOk: () => confirmHandleRemove(selected.id!),
      onCancel: handleReset,
    });
  };

  const handleRangePickerChange = (
    _: RangeValue<Moment>,
    formatString: [string, string]
  ) => {
    if (formatString[0] === "") {
      paymentStore.getPayments(startDate(), endDate());
      return setDate([startDate(), endDate()]);
    }
    paymentStore.getPayments(formatString[0], formatString[1]);
    setDate(formatString);
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
    await paymentStore.getPayments(date[0], date[1]);
    handleReset();
  };

  const handleSetView = useCallback(
    (view: ETableView) => () => {
      setTableView(view);
    },
    []
  );

  return (
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

        <RangePicker onChange={handleRangePickerChange} format={"DD.MM.YYYY"} />
      </div>

      <Button type="primary" onClick={handleOpenModal}>
        {t("common.panelControl.add")}
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
          date={date}
          optionsType={optionsType}
          picked={picked}
          onAdd={handleAdd}
          onCancel={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default observer(Payments);
