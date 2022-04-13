import React, { useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Radio, DatePicker, Button } from "antd";
import moment from "moment";

import Uploader from "components/Uploader";
import { IStudents } from "interfaces/student";
import { schemeAddForm } from "schemes/student";
import s from "./AddForm.styl";
import spin from "store/spin";
import student from "store/student";

interface IAddForm {
  handleOk: () => void;
}

const AddForm = ({ handleOk }: IAddForm): JSX.Element => {
  const [image, setImage] = useState<Blob | undefined>();

  const onSubmit = async (data: IStudents) => {
    const newData = { ...data, photo: image };

    await student.createStudent(newData as IStudents);
    await student.getStudents();
    handleOk();
  };

  const onPhotoLoader = (photo: Blob) => {
    setImage(photo);
  };

  return (
    <div className={s.container}>
      <Form
        validateMessages={schemeAddForm}
        onFinish={onSubmit}
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
          <div className={s.buttons}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(AddForm);
