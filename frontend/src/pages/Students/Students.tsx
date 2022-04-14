import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Button} from "antd";
import { isEmpty } from "ramda";

import AddForm from "./AddForm";
import s from "./Students.styl";
import student from "store/student";
import StudentsTable from "./StudentsTable";
import spin from "store/spin";

const Students = (): JSX.Element | null => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    console.log("--> toJS(student.students", toJS(student.students));
    if (isEmpty(toJS(student.students))) {
      student.getStudents();
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return spin.spin ? null : (
    <div className={s.container}>
      <Button type="primary" onClick={showModal}>
        Add student
      </Button>

      <StudentsTable students={toJS(student.students)} />

      {isModalVisible && <AddForm onReject={handleCancel} onSubmit={handleOk}/>}
    </div>
  );
};

export default observer(Students);
