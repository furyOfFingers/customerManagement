import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import { isEmpty } from "ramda";

import { IStudents } from "interfaces/student";
import StudentForm from "./StudentForm";
import s from "./Students.styl";
import studentStore from "store/student";
import StudentsTable from "./StudentsTable";
import spin from "store/spin";

const Students = (): JSX.Element | null => {
  const [isAddMWOpen, setIsAddMWOpen] = useState(false);
  const [isRemoveMWOpen, setIsRemoveMWOpen] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<IStudents | null>(null);

  useEffect(() => {
    if (isEmpty(studentStore.students.data)) {
      studentStore.getStudents();
    }
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsAddMWOpen(false);
  }, []);

  const handleRemove = (id: string) => {
    if (!studentStore.students.data?.length || !id) return;

    const selectedStudent = studentStore.students.data.find(
      (el: IStudents) => el.id === id
    );

    setPickedStudent(selectedStudent ? selectedStudent : null);
    handleOpenMW("remove");
  };

  const handleOpenMW = (name: string) => {
    switch (name) {
      case "add":
        setIsAddMWOpen(true);
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

      {isAddMWOpen && <StudentForm onCancel={handleCloseEditModal} />}
    </div>
  );
};

export default observer(Students);
