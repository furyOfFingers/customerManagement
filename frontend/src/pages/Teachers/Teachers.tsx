import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import { isEmpty } from "ramda";

import TeacherForm from "./TeacherForm";
import TeachersTable from "./TeachersTable";
import { ITeacher } from "interfaces/teacher";
import teacher from "store/teacher";
import spin from "store/spin";
import s from "./Teachers.styl";

const Teachers = (): JSX.Element | null => {
  const [isAddMWOpen, setIsAddMWOpen] = useState(false);
  const [isRemoveMWOpen, setIsRemoveMWOpen] = useState(false);
  const [pickedTeacher, setPickedTeacher] = useState<ITeacher | null>(null);

  useEffect(() => {
    if (isEmpty(teacher.teachers)) {
      teacher.getTeachers();
    }
  }, []);
  const handleRemove = (id: string) => {
    const selectedTeacher = teacher.teachers.find(
      (el: ITeacher) => el.id === id
    );

    setPickedTeacher(selectedTeacher ? selectedTeacher : null);
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
    // await teacher.removeTeacher(pickedTeacher?.id as string);
    await teacher.getTeachers();
    handleCancel("remove");
    setPickedTeacher(null);
  };

  return spin.spin ? null : (
    <div className={s.container}>
      <Button type="primary" onClick={() => handleOpenMW("add")}>
        Add teacher
      </Button>

      {!isEmpty(teacher.teachers) && (
        <TeachersTable listTeachers={teacher.teachers} remove={handleRemove} />
      )}

      <Modal
        title="Remove teacher"
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
          remove teacher{" "}
          <span>
            {`${pickedTeacher?.lastname}
            ${pickedTeacher?.firstname.substring(0, 1)}.
            ${pickedTeacher?.patronymic.substring(0, 1)}.`}{" "}
            ?
          </span>
        </div>
      </Modal>

      {isAddMWOpen && <TeacherForm onCancel={() => handleCancel("add")} />}
    </div>
  );
};

export default observer(Teachers);
