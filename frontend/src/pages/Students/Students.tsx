import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import { isEmpty } from "ramda";

import { IStudent } from "interfaces/student";
import StudentForm from "./StudentForm";
import s from "./Students.styl";
import studentStore from "store/student";
import StudentsTable from "./StudentsTable";
import spin from "store/spin";
import { isPending } from "common/utils/data.utils";

const Students = (): JSX.Element | null => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<IStudent | null>(null);

  useEffect(() => {
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
      okButtonProps: {
        loading: isPending(studentStore.removeRequest),
      },
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

  const confirmHandleRemove = async (studentId: string) => {
    await studentStore.removeStudent(studentId);
    await studentStore.getStudents();
    handleResetStudent();
  };

  return spin.spin ? null : (
    <div className={s.container}>
      <Button type="primary" onClick={handleOpenModal}>
        Add student
      </Button>

      <StudentsTable
        listStudents={studentStore.students.data}
        remove={handleRemove}
        onEdit={handleEdit}
      />

      {isModalOpen && (
        <StudentForm
          pickedStudent={pickedStudent}
          onCancel={handleCloseEditModal}
          onUpdate={handleUpdateStudent}
          onAdd={handleAddStudent}
        />
      )}
    </div>
  );
};

export default observer(Students);
