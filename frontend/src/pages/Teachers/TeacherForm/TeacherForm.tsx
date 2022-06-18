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

import { IStudent } from "interfaces/student";
import { AVATAR_SIZE, ButtonsConfig, formItemLayout } from "./constants";
import { isPending } from "common/utils/data.utils";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Uploader from "components/Uploader";
import { ITeacher } from "interfaces/teacher";
import spinStore from "store/spin";
import teacherStore from "store/teacher";
import studentStore from "store/student";
import { locale } from "common/locale";
import { getModalMode } from "./utils";
import { EModalMode } from "common/enums";
import { schemeTeacherForm } from "schemes/teacher";
import { initialValues } from "./constants";
import s from "./TeacherForm.styl";
import { isEmpty } from "ramda";

const { Option } = Select;
interface IOwnProps {
  pickedTeacher: ITeacher | null;
  onCancel: VoidFunction;
  onUpdate: (data: ITeacher) => Promise<void>;
  onAdd: (data: ITeacher) => Promise<void>;
}

const TeacherForm = ({
  pickedTeacher,
  onCancel,
  onUpdate,
  onAdd,
}: IOwnProps): JSX.Element => {
  const [image, setImage] = useState<Blob>();
  const [mode] = useState(getModalMode(pickedTeacher));

  const setInitialValue = (pickedTeacher: ITeacher | null) => {
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

  const handleSubmitClick = async (data: ITeacher) => {
    const newData = { ...data, photo: image };
    let editFunc = onAdd;

    if (mode === EModalMode.EDIT) {
      newData.id = pickedTeacher?.id;
      editFunc = onUpdate;
    }
    await editFunc(newData);
    await teacherStore.getTeachers();
    onCancel();
  };

  const onPhotoLoader = (photo: Blob) => {
    setImage(photo);
  };

  const renderOptions = () => {
    return studentStore.students.data.map((student: IStudent) => {
      return (
        <Option key={student.id} value={student.id}>
          {student.id}
          {"-"}
          {student.lastname}. {student.firstname[0]}. {student.patronymic[0]}
        </Option>
      );
    });
  };

  const renderTitle = () => (
    <Space align="baseline">
      <Avatar
        size={AVATAR_SIZE}
        src={pickedTeacher?.photo}
        icon={<UserOutlined />}
      />
      <p>{`${mode === EModalMode.ADD ? "Add" : "Edit"} teacher`}</p>
    </Space>
  );

  return (
    <Modal title={renderTitle()} visible onCancel={onCancel} footer={null} mask>
      <Spin
        tip="Loading..."
        spinning={
          isPending(teacherStore.updateRequest) ||
          isPending(teacherStore.createRequest)
        }
      >
        <div className={s.container}>
          <Form
            labelAlign="left"
            {...formItemLayout}
            onFinish={handleSubmitClick}
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

            {!isEmpty(studentStore.students.data) && (
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
              <Radio.Group buttonStyle="outline" disabled={spinStore.spin}>
                <Radio.Button value="male">male</Radio.Button>
                <Radio.Button value="female">female</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={
                    isPending(teacherStore.updateRequest) ||
                    isPending(teacherStore.createRequest)
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

export default observer(TeacherForm);
