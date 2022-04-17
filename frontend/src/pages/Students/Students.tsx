import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Button, Modal } from "antd";
import { isEmpty } from "ramda";

import { IStudents } from "interfaces/student";
import AddForm from "./AddForm";
import s from "./Students.styl";
import student from "store/student";
import StudentsTable from "./StudentsTable";
import spin from "store/spin";

const Students = (): JSX.Element | null => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<null | IStudents>(null);

  useEffect(() => {
    if (isEmpty(toJS(student.students))) {
      student.getStudents();
    }
  }, []);

  const handleRemove = (id: string) => {
    const selectedStudent = toJS(student.students).find(
      (el: IStudents) => el.id === id
    );

    setPickedStudent(selectedStudent ? selectedStudent : null);
    handleOpenMW("remove");
  };

  const handleOpenMW = (name: string) => {
    switch (name) {
      case "add":
        setIsAddModalOpen(true);
        break;
      // case 'edit':
      //     setIsEditModalOpen(true);
      case "remove":
        setIsRemoveModalOpen(true);
        break;
    }
  };

  const handleCancel = (name: string) => {
    switch (name) {
      case "add":
        setIsAddModalOpen(false);
        break;
      // case 'edit':
      //     setIsEditModalOpen(true);
      case "remove":
        setIsRemoveModalOpen(false);
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

      <StudentsTable
        listStudents={toJS(student.students)}
        remove={handleRemove}
      />

      <Modal
        title="Remove student"
        onCancel={() => handleCancel("remove")}
        visible={isRemoveModalOpen}
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

      {isAddModalOpen && <AddForm onCancel={() => handleCancel("add")} />}
    </div>
  );
};

export default observer(Students);
