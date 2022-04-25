import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Radio, DatePicker, Button, Modal } from "antd";
import moment from "moment";

import Uploader from "components/Uploader";
import { IStudents } from "interfaces/student";
import s from "./AddForm.styl";
import spin from "store/spin";
import student from "store/student";
import { ButtonsConfig, formItemLayout } from "./constants";
import { locale } from "common/locale";
import { getModalMode } from "./utils";
import { EModalMode } from "common/enums";
import { Maybe } from "common/types";
import { schemeAddForm } from "schemes/student";

interface IAddForm {
  id?: Maybe<string>;
  onCancel: VoidFunction;
}

const AddForm = ({ id, onCancel }: IAddForm): JSX.Element => {
  const [image, setImage] = useState<Blob | undefined>();
  const [mode] = useState(getModalMode(id));

  useEffect(() => {
    if (id) {
      student.getStudent(id);
    }
  }, []);

  const handleSubmitClick = async (data: IStudents) => {
    const newData = { ...data, photo: image };
    const action =
      mode === EModalMode.EDIT ? handleUpdateStudent : handleAddStudent;
    await action(newData);
    await student.getStudents();
    onCancel();
  };

  const handleUpdateStudent = async (data: IStudents) => {
    if (!id) return;
    console.log("--> newData", data);

    await student.updateStudent(id, data as IStudents);
  };

  const handleAddStudent = async (data: IStudents) => {
    console.log("--> newData", data);
    await student.createStudent(data as IStudents);
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
    >
      <div className={s.container}>
        <Form
          {...formItemLayout}
          validateMessages={schemeAddForm}
          onFinish={handleSubmitClick}
          labelAlign="left"
          initialValues={{
            remember: true,
            firstname: "Марат",
            lastname: "Асадуллаев",
            patronymic: "Абакарович",
            phone: "89064422353",
            birthday: moment("28-01-1990", "DD-MM-YYYY"),
            photo: "photo",
            // groups: ['1'],
            // parents: ["2"],
            // payment: ['3'],
            // is_phone_number_client: true,
          }}
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
              <Button type="primary" htmlType="submit">
                {ButtonsConfig[mode].SubmitButton.title}
              </Button>

              <Button type="ghost" onClick={onCancel}>
                {locale.form.cancel}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default observer(AddForm);
