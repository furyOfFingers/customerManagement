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
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import Uploader from "components/Uploader";
import { IStudent } from "interfaces/student";
import spinStore from "store/spin";
import teacherStore from "store/teacher";
import studentStore from "store/student";
import { EModalMode } from "common/enums";
import { schemeStudentForm } from "schemes/student";
import { initialValues } from "./constants";
import { isPending } from "common/utils/data.utils";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { ITeacher } from "interfaces/teacher";
import {
  AVATAR_SIZE,
  ButtonsConfig,
  formItemLayout,
  getModalMode,
} from "common/utils/form";

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
  const { t } = useTranslation();
  const [image, setImage] = useState<Blob>();
  const [mode] = useState(getModalMode(pickedStudent));
  const endName = ButtonsConfig[mode].SubmitButton.title;

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

    let editFunc = onAdd;

    if (mode === EModalMode.EDIT) {
      newData.id = pickedStudent?.id ? pickedStudent?.id : "";
      editFunc = onUpdate;
    }

    await editFunc(newData);
    await studentStore.getStudents();
    onCancel();
  };

  const onFileLoader = (photo: Blob) => {
    setImage(photo);
  };

  const renderOptions = () =>
    teacherStore.teachers.data.map((teacher: ITeacher) => (
      <Option key={teacher.id} value={teacher.id}>
        {teacher.id}
        {"-"}
        {teacher.lastname}. {teacher.firstname[0]}. {teacher.patronymic[0]}
      </Option>
    ));

  const renderTitle = () => (
    <Space align="baseline">
      <Avatar
        size={AVATAR_SIZE}
        src={pickedStudent?.photo}
        icon={<UserOutlined />}
      />
      <p>{`${
        mode === EModalMode.ADD
          ? t("common.panelControl.add")
          : t("common.panelControl.edit")
      }`}</p>
    </Space>
  );

  return (
    <Modal title={renderTitle()} open onCancel={onCancel} footer={null} mask>
      <Spin
        tip="Loading..."
        spinning={
          isPending(studentStore.updateRequest) ||
          isPending(studentStore.createRequest)
        }
      >
        <div>
          <Form
            labelAlign="left"
            {...formItemLayout}
            onFinish={handleSubmitClick}
            validateMessages={schemeStudentForm}
            initialValues={setInitialValue(pickedStudent)}
          >
            <Form.Item
              name="lastname"
              label={t("common.fieldNames.lastname")}
              rules={[
                {
                  required: true,
                  min: 2,
                  max: 80,
                },
              ]}
            >
              <Input disabled={spinStore.get()} placeholder="lastname" />
            </Form.Item>

            <Form.Item
              name="firstname"
              label={t("common.fieldNames.firstname")}
              rules={[
                {
                  required: true,
                  min: 2,
                  max: 80,
                },
              ]}
            >
              <Input placeholder="firstname" disabled={spinStore.get()} />
            </Form.Item>

            <Form.Item
              name="patronymic"
              label={t("common.fieldNames.patronymic")}
              rules={[
                {
                  required: true,
                  min: 2,
                  max: 80,
                },
              ]}
            >
              <Input disabled={spinStore.get()} placeholder="patronymic" />
            </Form.Item>

            <Form.Item
              name="phone"
              label={t("common.fieldNames.phone")}
              rules={[
                {
                  required: true,
                  min: 5,
                  max: 30,
                },
              ]}
            >
              <Input disabled={spinStore.get()} placeholder="phone" />
            </Form.Item>

            <Form.Item
              name="birthday"
              label={t("common.fieldNames.birthday")}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker placeholder="birthday" format={"DD.MM.YYYY"} />
            </Form.Item>

            {!isEmpty(teacherStore.teachers.data) && (
              <Form.Item
                name="teachers"
                label={t("common.fieldNames.teachers")}
              >
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

            <Form.Item name="photo" label={t("common.fieldNames.photo")}>
              <Uploader
                text={t("common.fieldNames.uploadPhoto")}
                onFileLoader={onFileLoader}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label={t("common.fieldNames.gender")}
              initialValue="male"
            >
              <Radio.Group buttonStyle="outline" disabled={spinStore.get()}>
                <Radio.Button value="male">
                  {t("common.fieldNames.male")}
                </Radio.Button>
                <Radio.Button value="female">
                  {t("common.fieldNames.female")}
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={
                    isPending(studentStore.updateRequest) ||
                    isPending(studentStore.createRequest)
                  }
                >
                  {t(`common.panelControl.${endName}`)}
                </Button>

                <Button type="ghost" onClick={onCancel}>
                  {t("common.panelControl.cancel")}
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
