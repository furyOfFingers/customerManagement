import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import { isEmpty } from "ramda";
import cls from "classnames";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";

import TeacherForm from "./TeacherForm";
import TeachersTable from "./TeachersTable";
import { ITeacher } from "interfaces/teacher";
import teacherStore from "store/teacher";
import spinStore from "store/spin";
import studentStore from "store/student";
import s from "./Teachers.styl";
import { ETableView } from "common/enums";

const Teachers = (): JSX.Element | null => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedTeacher, setPickedTeacher] = useState<ITeacher | null>(null);
  const [tableView, setTableView] = useState<ETableView>(ETableView.LIST);

  useEffect(() => {
    if (isEmpty(teacherStore.teachers.data)) {
      teacherStore.getTeachers();
    }

    if (isEmpty(studentStore.students.data)) {
      studentStore.getStudents();
    }
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setPickedTeacher(null);
    setIsModalOpen(false);
  }, []);

  const handleUpdate = useCallback(async (data: ITeacher) => {
    await teacherStore.updateTeacher(data);
  }, []);

  const handleAdd = useCallback(async (data: ITeacher) => {
    await teacherStore.createTeacher(data as ITeacher);
  }, []);

  const handleRemove = (id: string) => {
    if (!teacherStore.teachers.data?.length || !id) return;

    const selectedTeacher = teacherStore.findTeacher(id);

    if (!selectedTeacher) return;

    setPickedTeacher(selectedTeacher);
    Modal.confirm({
      title: "Remove teacher",
      content: `remove teacher ${selectedTeacher.lastname}
        ${selectedTeacher.firstname.substring(0, 1)}.
        ${selectedTeacher.patronymic.substring(0, 1)}. ?`,
      onOk: () => confirmHandleRemove(selectedTeacher.id!),
      onCancel: handleResetTeacher,
    });
  };

  const handleEdit = useCallback((id: string) => {
    if (!teacherStore.teachers.data) return;

    const actualTeacher = teacherStore.teachers.data.find(
      (teacher) => teacher.id === id
    );

    setPickedTeacher(actualTeacher!);
    setIsModalOpen(true);
  }, []);

  const handleResetTeacher = useCallback(() => {
    setPickedTeacher(null);
  }, []);

  const confirmHandleRemove = async (id: string) => {
    await teacherStore.removeTeacher(id);
    await teacherStore.getTeachers();
    handleResetTeacher();
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
        Add teacher
      </Button>

      <div
        className={cls(s.container, {
          [s.view_box]: tableView === ETableView.BOX,
        })}
      >
        <TeachersTable
          listTeachers={teacherStore.teachers.data}
          remove={handleRemove}
          onEdit={handleEdit}
          view={tableView}
        />
      </div>

      {isModalOpen && (
        <TeacherForm
          pickedTeacher={pickedTeacher}
          onCancel={handleCloseEditModal}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default observer(Teachers);
