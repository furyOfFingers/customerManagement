import React, { useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Radio, DatePicker, Button, Modal, Select } from "antd";
import moment from "moment";

import { IStudents } from "interfaces/student";
import Uploader from "components/Uploader";
import { ITeacher } from "interfaces/teacher";
import s from "./TeacherForm.styl";
import spin from "store/spin";
import teacher from "store/teacher";
import { ButtonsConfig, formItemLayout } from "./constants";
import { locale } from "common/locale";
import { getModalMode } from "./utils";
import { EModalMode } from "common/enums";
import { schemeTeacherForm } from "schemes/teacher";
import { initialValues } from "./constants";
import studentStore from "store/student";

const { Option } = Select;
interface ITeacherForm {
  pickedTeacher?: ITeacher;
  onCancel: VoidFunction;
}

const TeacherForm = ({
  pickedTeacher,
  onCancel,
}: ITeacherForm): JSX.Element => {
  const [image, setImage] = useState<Blob>();
  const [mode] = useState(getModalMode(pickedTeacher));

  const setInitialValue = (pickedTeacher?: ITeacher) => {
    if (!pickedTeacher) {
      return initialValues;
    }

    return {
      remember: true,
      firstname: pickedTeacher?.firstname,
      lastname: pickedTeacher?.lastname,
      patronymic: pickedTeacher?.patronymic,
      phone: pickedTeacher?.phone,
      birthday: moment(pickedTeacher?.birthday, "DD-MM-YYYY"),
      photo: pickedTeacher?.photo,
    };
  };

  const renderOptions = () => {
    return studentStore.students.map((student: IStudents) => {
      return (
        <Option key={student.id} value={student.id}>
          {student.id}
          {"-"}
          {student.lastname}. {student.firstname[0]}. {student.patronymic[0]}
        </Option>
      );
    });
  };

  const handleSubmit = async (data: ITeacher) => {
    const newData = { ...data, photo: image };
    const action = mode === EModalMode.EDIT ? handleUpdate : handleAdd;

    await action(newData);
    await teacher.getTeachers();
    onCancel();
  };

  const handleUpdate = async (data: ITeacher) => {
    const newData = { ...data, id: pickedTeacher?.id };
    await teacher.updateTeacher(newData);
  };

  const handleAdd = async (data: ITeacher) => {
    await teacher.createTeacher(data as ITeacher);
  };

  const onPhotoLoader = (photo: Blob) => {
    setImage(photo);
  };

  return (
    <Modal
      title={`${mode === EModalMode.ADD ? "Add" : "Edit"} teacher`}
      visible
      onCancel={onCancel}
      footer={null}
    >
      <div className={s.container}>
        <Form
          labelAlign="left"
          {...formItemLayout}
          onFinish={handleSubmit}
          validateMessages={schemeTeacherForm}
          initialValues={setInitialValue(pickedTeacher)}
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

          {studentStore.students && (
            <Form.Item name="students" label="students">
              <Select
                defaultValue={pickedTeacher?.students}
                allowClear
                mode="multiple"
                placeholder="select students"
              >
                {renderOptions()}
              </Select>
            </Form.Item>
          )}

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

export default observer(TeacherForm);
