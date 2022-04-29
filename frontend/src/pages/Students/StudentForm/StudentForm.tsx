import React, { useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Radio, DatePicker, Button, Modal, Spin } from "antd";
import moment from "moment";

import Uploader from "components/Uploader";
import { IStudents } from "interfaces/student";
import s from "./StudentForm.styl";
import spin from "store/spin";
import studentStore from "store/student";
import { ButtonsConfig, formItemLayout } from "./constants";
import { locale } from "common/locale";
import { getModalMode } from "./utils";
import { EModalMode } from "common/enums";
import { schemeStudentForm } from "schemes/student";
import { initialValues } from "./constants";
import { isPending } from "common/utils/data.utils";

interface IOwnProps {
  pickedStudent?: IStudents;
  onCancel: VoidFunction;
}

const StudentForm = ({ pickedStudent, onCancel }: IOwnProps): JSX.Element => {
  const [image, setImage] = useState<Blob>();
  const [mode] = useState(getModalMode(pickedStudent));

  const setInitialValue = (pickedStudent?: IStudents) => {
    if (!pickedStudent) {
      return initialValues;
    }

    return {
      remember: true,
      firstname: pickedStudent?.firstname,
      lastname: pickedStudent?.lastname,
      patronymic: pickedStudent?.patronymic,
      phone: pickedStudent?.phone,
      birthday: moment(pickedStudent?.birthday, "DD-MM-YYYY"),
      photo: pickedStudent?.photo,
    };
  };

  const handleSubmitClick = async (data: IStudents) => {
    const newData = { ...data, photo: image };
    const action =
      mode === EModalMode.EDIT ? handleUpdateStudent : handleAddStudent;

    await action(newData);
    await studentStore.getStudents();
    onCancel();
  };

  const handleUpdateStudent = async (data: IStudents) => {
    const newData = { ...data, id: pickedStudent?.id };
    await studentStore.updateStudent(newData);
  };

  const handleAddStudent = async (data: IStudents) => {
    await studentStore.createStudent(data as IStudents);
  };

  const onPhotoLoader = (photo: Blob) => {
    setImage(photo);
  };

  return (
    <Modal
      title={`${mode === EModalMode.ADD ? "Add" : "Edit"} student`}
      visible
      onCancel={onCancel}
      footer={null}
      mask
    >
      <Spin
        tip="Loading..."
        spinning={
          isPending(studentStore.updateRequest) ||
          isPending(studentStore.createRequest)
        }
      >
        <div className={s.container}>
          <Form
            labelAlign="left"
            {...formItemLayout}
            onFinish={handleSubmitClick}
            validateMessages={schemeStudentForm}
            initialValues={setInitialValue(pickedStudent)}
          >
            <Form.Item
              name="lastname"
              label="lastname"
              rules={[
                {
                  required: true,
                  min: 2,
                  max: 80,
                },
              ]}
            >
              <Input disabled={spin.spin} placeholder="lastname" />
            </Form.Item>

            <Form.Item
              name="firstname"
              label="firstname"
              rules={[
                {
                  required: true,
                  min: 2,
                  max: 80,
                },
              ]}
            >
              <Input placeholder="firstname" disabled={spin.spin} />
            </Form.Item>

            <Form.Item
              name="patronymic"
              label="patronymic"
              rules={[
                {
                  required: true,
                  min: 2,
                  max: 80,
                },
              ]}
            >
              <Input disabled={spin.spin} placeholder="patronymic" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="phone"
              rules={[
                {
                  required: true,
                  min: 5,
                  max: 30,
                },
              ]}
            >
              <Input disabled={spin.spin} placeholder="phone" />
            </Form.Item>

            <Form.Item
              name="birthday"
              label="birthday"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker placeholder="birthday" format={"DD.MM.YY"} />
            </Form.Item>

            <Form.Item name="photo" label="photo">
              <Uploader onPhotoLoader={onPhotoLoader} />
            </Form.Item>

            <Form.Item name="gender" label="gender" initialValue="male">
              <Radio.Group
                buttonStyle="outline"
                className={s.centered}
                disabled={spin.spin}
              >
                <Radio.Button value="male">male</Radio.Button>
                <Radio.Button value="female">female</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <div className={s.centered}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={
                    isPending(studentStore.updateRequest) ||
                    isPending(studentStore.createRequest)
                  }
                >
                  {ButtonsConfig[mode].SubmitButton.title}
                </Button>

                <Button type="ghost" onClick={onCancel}>
                  {locale.form.cancel}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
};

export default observer(StudentForm);
