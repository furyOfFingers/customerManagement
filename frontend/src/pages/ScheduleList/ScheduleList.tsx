import React, { useCallback, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import cls from "classnames";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import { useTranslation } from "react-i18next";

import ScheduleListForm from "./ScheduleListForm";
import ScheduleListTable from "./ScheduleListTable";
import scheduleListStore from "store/scheduleList";
import spinStore from "store/spin";
import { ETableView } from "common/enums";
import { IScheduleList } from "interfaces/scheduleList";
import s from "./ScheduleList.styl";

const ScheduleList = (): JSX.Element | null => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedScheduleList, setPickedScheduleList] =
    useState<IScheduleList | null>(null);
  const [tableView, setTableView] = useState<ETableView>(ETableView.LIST);

  useEffect(() => {
    scheduleListStore.getScheduleLists();
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setPickedScheduleList(null);
    setIsModalOpen(false);
  }, []);

  const handleUpdate = useCallback(async (data: IScheduleList) => {
    await scheduleListStore.updateScheduleList(data);
  }, []);

  const handleAdd = useCallback(async (data: IScheduleList) => {
    await scheduleListStore.createScheduleList(data as IScheduleList);
  }, []);

  const handleRemove = (id: string) => {
    if (!scheduleListStore.scheduleLists.data?.length || !id) return;

    const selected = scheduleListStore.findScheduleList(id);

    if (!selected) return;

    setPickedScheduleList(selected);

    Modal.confirm({
      title: t("common.panelControl.remove"),
      content: `${t("common.panelControl.remove")} ${
        selected.schedule_list_name
      } ?`,
      okText: t("common.panelControl.ok"),
      cancelText: t("common.panelControl.cancel"),
      onOk: () => confirmHandleRemove(selected.id!),
      onCancel: handleReset,
    });
  };

  const handleEdit = useCallback((id: string) => {
    if (!scheduleListStore.scheduleLists.data) return;

    const actual = scheduleListStore.scheduleLists.data.find(
      (scheduleList) => scheduleList.id === id
    );

    setPickedScheduleList(actual!);
    setIsModalOpen(true);
  }, []);

  const handleReset = useCallback(() => {
    setPickedScheduleList(null);
  }, []);

  const confirmHandleRemove = async (id: string) => {
    await scheduleListStore.removeScheduleList(id);
    await scheduleListStore.getScheduleLists();
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
        {t("common.panelControl.add")}
      </Button>

      <div
        className={cls(s.container, {
          [s.view_box]: tableView === ETableView.BOX,
        })}
      >
        <ScheduleListTable
          list={scheduleListStore.scheduleLists.data}
          remove={handleRemove}
          onEdit={handleEdit}
          view={tableView}
        />
      </div>

      {isModalOpen && (
        <ScheduleListForm
          pickedScheduleList={pickedScheduleList}
          onCancel={handleCloseEditModal}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default observer(ScheduleList);
