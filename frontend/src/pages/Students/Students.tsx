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

const Students = (): JSX.Element | null => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveMWOpen, setIsRemoveMWOpen] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<IStudent | null>(null);

  useEffect(() => {
    if (isEmpty(studentStore.students.data)) {
      studentStore.getStudents();
    }
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

    const selectedStudent = studentStore.students.data.find(
      (el: IStudent) => el.id === id
    );

    setPickedStudent(selectedStudent ? selectedStudent : null);
    handleOpenMW("remove");
  };

  const handleEdit = useCallback((id: string) => {
    if (!studentStore.students.data) return;

    const actualStudent = studentStore.students.data.find(
      (student) => student.id === id
    );

    setPickedStudent(actualStudent!);
    setIsModalOpen(true);
  }, []);

  const handleOpenMW = (name: string) => {
    switch (name) {
      case "add":
        setIsModalOpen(true);
        break;
      // case 'edit':
      //     setIsEditModalOpen(true);
      case "remove":
        setIsRemoveMWOpen(true);
        break;
    }
  };

  const handleCancel = (name: string) => {
    switch (name) {
      // case 'edit':
      //     setIsEditModalOpen(true);
      case "remove":
        setIsRemoveMWOpen(false);
        setPickedStudent(null);
        break;
    }
  };

  const confirmHandleRemove = async () => {
    await studentStore.removeStudent(pickedStudent?.id as string);
    await studentStore.getStudents();
    handleCancel("remove");
    setPickedStudent(null);
  };

  return spin.spin ? null : (
    <div className={s.container}>
      <Button type="primary" onClick={() => handleOpenMW("add")}>
        Add student
      </Button>

      {!!studentStore.students.data?.length && (
        <StudentsTable
          listStudents={studentStore.students.data}
          remove={handleRemove}
          onEdit={handleEdit}
        />
      )}

      <Modal
        title="Remove student"
        onCancel={() => handleCancel("remove")}
        visible={isRemoveMWOpen}
        footer={[
          <Button key="remove" type="primary" onClick={confirmHandleRemove}>
            Remove
          </Button>,

          <Button key="back" onClick={() => handleCancel("remove")}>
            Cancel
          </Button>,
        ]}
      >
        <div>
          remove student{" "}
          <span>
            {`${pickedStudent?.lastname}
            ${pickedStudent?.firstname.substring(0, 1)}.
            ${pickedStudent?.patronymic.substring(0, 1)}.`}{" "}
            ?
          </span>
        </div>
      </Modal>

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
