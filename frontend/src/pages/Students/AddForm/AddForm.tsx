import React, { useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Radio, DatePicker, Button, Modal } from "antd";
import moment from "moment";

import Uploader from "components/Uploader";
import { IStudents } from "interfaces/student";
import s from "./AddForm.styl";
import spin from "store/spin";
import student from "store/student";
import {ButtonsConfig, formItemLayout} from "./constants";
import {locale} from "common/locale";
import {getModalMode} from "./utils";
import {EModalMode} from "common/enums";

interface IAddForm {
  id?: string;
  onSubmit: VoidFunction;
  onReject: VoidFunction;
}

const AddForm = ({ onSubmit, id, onReject }: IAddForm): JSX.Element => {
  const [image, setImage] = useState<Blob | undefined>();
  const [mode] = useState(getModalMode(id));

  const handleSubmitClick = async (data: IStudents) => {
    const newData = { ...data, photo: image };
    console.log("--> newData", newData);
    await student.createStudent(newData as IStudents);
    await student.getStudents();
    onSubmit();
  };

  const onPhotoLoader = (photo: Blob) => {
    setImage(photo);
  };

  return (
    <Modal
      title={`${mode === EModalMode.ADD ? "Add" : "Edit" } student`}
      visible
      onCancel={onReject}
      footer={null}
    >
      <div className={s.container}>
        <Form
          {...formItemLayout}
          // validateMessages={schemeSignUp}
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
                min: 5,
                max: 50,
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
            <div className={s.buttons}>
              <Button type="primary" htmlType="submit">
                {ButtonsConfig[mode].SubmitButton.title}
              </Button>
              <Button type="ghost" onClick={onReject}>
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
