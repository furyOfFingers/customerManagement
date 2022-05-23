import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import { isEmpty } from "ramda";

import { IStudents } from "interfaces/student";
import StudentForm from "./StudentForm";
import s from "./Students.styl";
import student from "store/student";
import StudentsTable from "./StudentsTable";
import spin from "store/spin";

const Students = (): JSX.Element | null => {
  const [isAddMWOpen, setIsAddMWOpen] = useState(false);
  const [isRemoveMWOpen, setIsRemoveMWOpen] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<IStudents | null>(null);

  useEffect(() => {
    if (isEmpty(student.students)) {
      student.getStudents();
    }
  }, []);

  const handleRemove = (id: string) => {
    const selectedStudent = student.students.find(
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
      case "add":
        setIsAddMWOpen(false);
        break;
      // case 'edit':
      //     setIsEditModalOpen(true);
      case "remove":
        setIsRemoveMWOpen(false);
        break;
    }
  };

  const confirmHandleRemove = async () => {
    await student.removeStudent(pickedStudent?.id as string);
    await student.getStudents();
    handleCancel("remove");
    setPickedStudent(null);
  };

  return spin.spin ? null : (
    <div className={s.container}>
      <Button type="primary" onClick={() => handleOpenMW("add")}>
        Add student
      </Button>

      {!isEmpty(student.students) && (
        <StudentsTable listStudents={student.students} remove={handleRemove} />
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
          {`remove student ${pickedStudent?.lastname}
            ${pickedStudent?.firstname.substring(0, 1)}.
            ${pickedStudent?.patronymic.substring(0, 1)}. ?`}
        </div>
      </Modal>

      {isAddMWOpen && <StudentForm onCancel={() => handleCancel("add")} />}
    </div>
  );
};

export default observer(Students);
