import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import { isEmpty } from "ramda";
import cls from "classnames";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";

import { IStudent } from "interfaces/student";
import StudentForm from "./StudentForm";
import teacherStore from "store/teacher";
import studentStore from "store/student";
import StudentsTable from "./StudentsTable";
import spinStore from "store/spin";
import { ETableView } from "common/enums";
import s from "./Students.styl";

const Students = (): JSX.Element | null => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<IStudent | null>(null);
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
      title: "Remove student",
      content: `remove student ${selectedStudent.lastname}
        ${selectedStudent.firstname.substring(0, 1)}.
        ${selectedStudent.patronymic.substring(0, 1)}. ?`,
      onOk: () => confirmHandleRemove(selectedStudent.id!),
      onCancel: handleResetStudent,
    });
  };

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

      <Button type="primary" onClick={handleOpenModal}>
        Add student
      </Button>

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
