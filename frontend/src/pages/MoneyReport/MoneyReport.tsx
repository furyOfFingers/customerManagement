import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import CommonMode from "./CommonMode";
import paymentStore from "store/payment";
import studentStore from "store/student";
import teacherStore from "store/teacher";
import moneyReportStore from "store/moneyReport";
import groupStore from "store/group";
import DetailMode from "./DetailMode";
import {
  ICreateReportSettings,
  IUpdateReportSettings,
  settings,
} from "interfaces/moneyReport";
import Add from "./Forms/Add";
import Edit from "./Forms/Edit";
import { isPending } from "common/utils/data.utils";
import { startDate, endDate } from "utils/date";
import s from "./MoneyReport.styl";

const MoneyReport = (): JSX.Element => {
  const { t } = useTranslation();
  const [isCommonMode, setIsCommonMode] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [date, setDate] = useState<[string, string]>(["", ""]);

  const loading =
    isPending(moneyReportStore.updateRequest) ||
    isPending(moneyReportStore.createRequest);

  useEffect(() => {
    teacherStore.getTeachers();
    groupStore.getGroups();
    studentStore.getStudents();
    paymentStore.getPayments(startDate(), endDate());
    moneyReportStore.getMoneyReportSettings();
  }, []);

  const optionsType = isEmpty(moneyReportStore.moneyReportSettings.data)
    ? []
    : moneyReportStore.moneyReportSettings.data;

  const handleOpenAddModal = () => setIsModalAddOpen(true);
  const handleCloseAddModal = () => setIsModalAddOpen(false);

  const handleOpenEditModal = () => setIsModalEditOpen(true);
  const handleCloseEditModal = () => setIsModalEditOpen(false);

  const handleAdd = async (data: ICreateReportSettings) => {
    await moneyReportStore.createMoneyReportSettings(
      data as ICreateReportSettings
    );
    await handleCloseAddModal();
    await handleRequest();
  };

  const handleChangeDate = (value: [string, string]) => setDate(value);

  const handleRequest = async () => {
    await moneyReportStore.getMoneyReportSettings();
  };

  const handleUpdate = async (data: IUpdateReportSettings) => {
    await moneyReportStore.updateMoneyReportSettings(
      data as IUpdateReportSettings
    );
    await handleCloseEditModal();
    await handleRequest();
  };

  const handleChangeReportMode = () => {
    setIsCommonMode(!isCommonMode);
  };

  return (
    <div className={s.container}>
      <div className={s.settings}>
        <Button type="link" onClick={handleChangeReportMode}>
          {isCommonMode ? t("report.detailMode") : t("report.commonMode")}
        </Button>

        <Button type="primary" onClick={handleOpenAddModal}>
          {t("common.panelControl.add")}
        </Button>

        {!isEmpty(settings) && (
          <Button type="primary" onClick={handleOpenEditModal}>
            {t("common.panelControl.edit")}
          </Button>
        )}
      </div>

      {isCommonMode ? (
        <CommonMode
          date={date}
          onDateChange={handleChangeDate}
          students={studentStore.students.data}
          teachers={teacherStore.teachers.data}
          payments={paymentStore.payments.data}
          groups={groupStore.groups.data}
          moneyReport={moneyReportStore.moneyReportSettings.data}
        />
      ) : (
        <DetailMode
          date={date}
          onDateChange={handleChangeDate}
          optionsType={optionsType}
          students={studentStore.students.data}
          teachers={teacherStore.teachers.data}
          payments={paymentStore.payments.data}
          groups={groupStore.groups.data}
        />
      )}

      {isModalAddOpen && (
        <Add
          isLoading={loading}
          onAdd={handleAdd}
          onCancel={handleCloseAddModal}
        />
      )}

      {isModalEditOpen && (
        <Edit
          isLoading={loading}
          onUpdate={handleUpdate}
          onCancel={handleCloseEditModal}
          settings={optionsType}
        />
      )}
    </div>
  );
};

export default observer(MoneyReport);
