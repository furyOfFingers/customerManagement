import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import { isEmpty } from "ramda";
import cls from "classnames";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";

import { ETableView } from "common/enums";
import teacherStore from "store/teacher";
import groupStore from "store/group";
import spinStore from "store/spin";
import studentStore from "store/student";
import s from "./Groups.styl";
import { IGroup } from "interfaces/group";
import GroupsTable from "./GroupsTable";
import GroupForm from "./GroupForm";

const Groups = (): JSX.Element | null => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedGroup, setPickedGroup] = useState<IGroup | null>(null);
  const [tableView, setTableView] = useState<ETableView>(ETableView.LIST);

  useEffect(() => {
    if (isEmpty(teacherStore.teachers.data)) {
      teacherStore.getTeachers();
    }

    if (isEmpty(studentStore.students.data)) {
      studentStore.getStudents();
    }

    if (isEmpty(groupStore.groups.data)) {
      groupStore.getGroups();
    }
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
      title: "Remove group",
      content: `remove group ${selectedGroup.group_name} ?`,
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

  return spinStore.spin ? null : (
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
        Add group
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
