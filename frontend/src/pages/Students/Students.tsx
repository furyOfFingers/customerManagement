import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import cls from "classnames";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import { useTranslation } from "react-i18next";

import { IStudent } from "interfaces/student";
import StudentForm from "./StudentForm";
import teacherStore from "store/teacher";
import studentStore from "store/student";
import StudentsTable from "./StudentsTable";
import spinStore from "store/spin";
import { ETableView } from "common/enums";
import Uploader from "components/Uploader";
import s from "./Students.styl";

const Students = (): JSX.Element | null => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<IStudent | null>(null);
  const [tableView, setTableView] = useState<ETableView>(ETableView.LIST);
  const [file, setFile] = useState<Blob | null>();

  useEffect(() => {
    teacherStore.getTeachers();
    studentStore.getStudents();
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setPickedStudent(null);
    setIsModalOpen(false);
  }, []);

  const handleUpdateStudent = useCallback(async (data: IStudent) => {
    await studentStore.updateStudent(data);
  }, []);

  const handleAddStudent = useCallback(async (data: IStudent) => {
    await studentStore.createStudent(data as IStudent);
  }, []);

  const handleRemove = (id: string) => {
    if (!studentStore.students.data?.length || !id) return;

    const selectedStudent = studentStore.findStudent(id);

    if (!selectedStudent) return;

    setPickedStudent(selectedStudent);
    Modal.confirm({
      title: t("common.panelControl.remove"),
      content: `${t("common.panelControl.remove")} ${selectedStudent.lastname}
        ${selectedStudent.firstname.substring(0, 1)}.
        ${selectedStudent.patronymic.substring(0, 1)}. ?`,
      okText: t("common.panelControl.ok"),
      cancelText: t("common.panelControl.cancel"),
      onOk: () => confirmHandleRemove(selectedStudent.id!),
      onCancel: handleResetStudent,
    });
  };

  const onFileLoader = (file: Blob) => {
    setFile(file);
  };

  const handleUpload = async () => {
    await studentStore.uploadStudents(file!);
    await studentStore.getStudents();
    setFile(null);
  };

  const handleRemoveFile = () => setFile(null);

  const handleEdit = useCallback((id: string) => {
    if (!studentStore.students.data) return;

    const actualStudent = studentStore.students.data.find(
      (student) => student.id === id
    );

    setPickedStudent(actualStudent!);
    setIsModalOpen(true);
  }, []);

  const handleResetStudent = useCallback(() => {
    setPickedStudent(null);
  }, []);

  const confirmHandleRemove = async (id: string) => {
    await studentStore.removeStudent(id);
    await studentStore.getStudents();
    handleResetStudent();
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

      <div className={s.main_buttons}>
        <Button type="primary" onClick={handleOpenModal}>
          {t("common.panelControl.add")}
        </Button>

        <Uploader
          onRemove={handleRemoveFile}
          text={t("common.panelControl.addFew")}
          onFileLoader={onFileLoader}
        />

        {file && (
          <Button onClick={handleUpload}>{t("common.panelControl.add")}</Button>
        )}
      </div>

      <div
        className={cls(s.container, {
          [s.view_box]: tableView === ETableView.BOX,
        })}
      >
        <StudentsTable
          view={tableView}
          onEdit={handleEdit}
          remove={handleRemove}
          listStudents={studentStore.students.data}
        />
      </div>

      {isModalOpen && (
        <StudentForm
          onAdd={handleAddStudent}
          pickedStudent={pickedStudent}
          onUpdate={handleUpdateStudent}
          onCancel={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default observer(Students);
