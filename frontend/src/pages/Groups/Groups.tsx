import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import cls from "classnames";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import { useTranslation } from "react-i18next";

import { ETableView } from "common/enums";
import teacherStore from "store/teacher";
import groupStore from "store/group";
import spinStore from "store/spin";
import studentStore from "store/student";
import scheduleListStore from "store/scheduleList";
import { IGroup } from "interfaces/group";
import GroupsTable from "./GroupsTable";
import GroupForm from "./GroupForm";
import s from "./Groups.styl";

const Groups = (): JSX.Element | null => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedGroup, setPickedGroup] = useState<IGroup | null>(null);
  const [tableView, setTableView] = useState<ETableView>(ETableView.LIST);

  useEffect(() => {
    teacherStore.getTeachers();
    scheduleListStore.getScheduleLists();
    studentStore.getStudents();
    groupStore.getGroups();
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setPickedGroup(null);
    setIsModalOpen(false);
  }, []);

  const handleUpdate = useCallback(async (data: IGroup) => {
    await groupStore.updateGroup(data);
  }, []);

  const handleAdd = useCallback(async (data: IGroup) => {
    await groupStore.createGroup(data as IGroup);
  }, []);

  const handleRemove = (id: string) => {
    if (!groupStore.groups.data?.length || !id) return;

    const selectedGroup = groupStore.findGroup(id);

    if (!selectedGroup) return;

    setPickedGroup(selectedGroup);
    Modal.confirm({
      title: t("common.panelControl.remove"),
      content: `${t("common.panelControl.remove")} ${
        selectedGroup.group_name
      } ?`,
      okText: t("common.panelControl.ok"),
      cancelText: t("common.panelControl.cancel"),
      onOk: () => confirmHandleRemove(selectedGroup.id!),
      onCancel: handleResetGroup,
    });
  };

  const handleEdit = useCallback((id: string) => {
    if (!groupStore.groups.data) return;

    const actualGroup = groupStore.groups.data.find((group) => group.id === id);

    setPickedGroup(actualGroup!);
    setIsModalOpen(true);
  }, []);

  const handleResetGroup = useCallback(() => {
    setPickedGroup(null);
  }, []);

  const confirmHandleRemove = async (id: string) => {
    await groupStore.removeGroup(id);
    await groupStore.getGroups();
    handleResetGroup();
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
        <GroupsTable
          listGroups={groupStore.groups.data}
          remove={handleRemove}
          onEdit={handleEdit}
          view={tableView}
        />
      </div>

      {isModalOpen && (
        <GroupForm
          pickedGroup={pickedGroup}
          onCancel={handleCloseEditModal}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default observer(Groups);
