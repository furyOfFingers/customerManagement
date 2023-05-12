import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { isEmpty } from "ramda";

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
import s from "./MoneyReport.styl";

const MoneyReport = (): JSX.Element => {
  const [isCommonMode, setIsCommonMode] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const loading =
    isPending(moneyReportStore.updateRequest) ||
    isPending(moneyReportStore.createRequest);

  useEffect(() => {
    teacherStore.getTeachers();
    groupStore.getGroups();
    studentStore.getStudents();
    paymentStore.getPayments();
  }, []);

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
          {isCommonMode ? "detail mode" : "common mode"}
        </Button>

        <Button type="primary" onClick={handleOpenAddModal}>
          add settings
        </Button>

        {!isEmpty(settings) && (
          <Button type="primary" onClick={handleOpenEditModal}>
            edit settings
          </Button>
        )}
      </div>

      {isCommonMode ? (
        <CommonMode
          students={studentStore.students.data}
          teachers={teacherStore.teachers.data}
          payments={paymentStore.payments.data}
          groups={groupStore.groups.data}
        />
      ) : (
        <DetailMode
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
          settings={settings}
        />
      )}
    </div>
  );
};

export default observer(MoneyReport);
