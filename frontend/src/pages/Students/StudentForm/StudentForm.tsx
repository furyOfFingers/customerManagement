import React, { useState } from "react";
import { observer } from "mobx-react";
import {
  Form,
  Input,
  Radio,
  DatePicker,
  Button,
  Modal,
  Spin,
  Avatar,
  Space,
  Select,
} from "antd";
import moment from "moment";

import Uploader from "components/Uploader";
import { IStudent } from "interfaces/student";
import spinStore from "store/spin";
import teacherStore from "store/teacher";
import studentStore from "store/student";
import { AVATAR_SIZE, ButtonsConfig, formItemLayout } from "./constants";
import { locale } from "common/locale";
import { getModalMode } from "./utils";
import { EModalMode } from "common/enums";
import { schemeStudentForm } from "schemes/student";
import { initialValues } from "./constants";
import { isPending } from "common/utils/data.utils";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import s from "./StudentForm.styl";
import { ITeacher } from "interfaces/teacher";
import { isEmpty } from "ramda";

const { Option } = Select;

interface IOwnProps {
  pickedStudent: IStudent | null;
  onCancel: VoidFunction;
  onUpdate: (data: IStudent) => Promise<void>;
  onAdd: (data: IStudent) => Promise<void>;
}

const StudentForm = ({
  pickedStudent,
  onCancel,
  onUpdate,
  onAdd,
}: IOwnProps): JSX.Element => {
  const [image, setImage] = useState<Blob>();
  const [mode] = useState(getModalMode(pickedStudent));

  const setInitialValue = (pickedStudent: IStudent | null) => {
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

  const handleSubmitClick = async (data: IStudent) => {
    const newData = {
      ...data,
      photo: image,
      birthday: moment(data.birthday).format("DD.MM.YYYY"),
    };

    // const newBirthday = moment(data.birthday).format("DD.MM.YYYY");
    // newData.birthday = newBirthday;
    let editFunc = onAdd;

    if (mode === EModalMode.EDIT) {
      newData.id = pickedStudent?.id;
      editFunc = onUpdate;
    }

    await editFunc(newData);
    await studentStore.getStudents();
    onCancel();
  };

  const onPhotoLoader = (photo: Blob) => {
    setImage(photo);
  };

  const renderOptions = () => {
    return teacherStore.teachers.data.map((teacher: ITeacher) => {
      return (
        <Option key={teacher.id} value={teacher.id}>
          {teacher.id}
          {"-"}
          {teacher.lastname}. {teacher.firstname[0]}. {teacher.patronymic[0]}
        </Option>
      );
    });
  };

  const renderTitle = () => (
    <Space align="baseline">
      <Avatar
        size={AVATAR_SIZE}
        src={pickedStudent?.photo}
        icon={<UserOutlined />}
      />
      <p>{`${mode === EModalMode.ADD ? "Add" : "Edit"} student`}</p>
    </Space>
  );

  return (
    <Modal title={renderTitle()} visible onCancel={onCancel} footer={null} mask>
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
              <Input disabled={spinStore.spin} placeholder="lastname" />
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
              <Input placeholder="firstname" disabled={spinStore.spin} />
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
              <Input disabled={spinStore.spin} placeholder="patronymic" />
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
              <Input disabled={spinStore.spin} placeholder="phone" />
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

            {!isEmpty(teacherStore.teachers.data) && (
              <Form.Item name="teachers" label="teachers">
                <Select
                  defaultValue={pickedStudent?.teachers}
                  allowClear
                  mode="multiple"
                  placeholder="select teachers"
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
                disabled={spinStore.spin}
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
