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

import { IStudent } from "interfaces/student";
import { isPending } from "common/utils/data.utils";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Uploader from "components/Uploader";
import { ITeacher } from "interfaces/teacher";
import spinStore from "store/spin";
import teacherStore from "store/teacher";
import studentStore from "store/student";
import { EModalMode } from "common/enums";
import { schemeTeacherForm } from "schemes/teacher";
import { initialValues } from "./constants";
import {
  AVATAR_SIZE,
  ButtonsConfig,
  formItemLayout,
  getModalMode,
} from "common/utils/form";

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
  const { t } = useTranslation();
  const [image, setImage] = useState<Blob>();
  const [mode] = useState(getModalMode(pickedTeacher));
  const endName = ButtonsConfig[mode].SubmitButton.title;

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
      gender: pickedTeacher.gender,
    };
  };

  const handleSubmitClick = async (data: ITeacher) => {
    const newData = {
      ...data,
      photo: image,
      birthday: moment(data.birthday).format("DD.MM.YYYY"),
    };
    let editFunc = onAdd;

    if (mode === EModalMode.EDIT) {
      newData.id = pickedTeacher?.id;
      editFunc = onUpdate;
    }
    await editFunc(newData);
    await teacherStore.getTeachers();
    onCancel();
  };

  const onFileLoader = (photo: Blob) => {
    setImage(photo);
  };

  const renderOptions = () =>
    studentStore.students.data.map((student: IStudent) => (
      <Option key={student.id} value={student.id}>
        {student.id}
        {"-"}
        {student.lastname}. {student.firstname[0]}. {student.patronymic[0]}
      </Option>
    ));

  const renderTitle = () => (
    <Space align="baseline">
      <Avatar
        size={AVATAR_SIZE}
        src={pickedTeacher?.photo}
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
          isPending(teacherStore.updateRequest) ||
          isPending(teacherStore.createRequest)
        }
      >
        <div>
          <Form
            labelAlign="left"
            {...formItemLayout}
            onFinish={handleSubmitClick}
            validateMessages={schemeTeacherForm}
            initialValues={setInitialValue(pickedTeacher)}
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
              <DatePicker placeholder="birthday" format={"DD.MM.YY"} />
            </Form.Item>

            {!isEmpty(studentStore.students.data) && (
              <Form.Item
                name="students"
                label={t("common.fieldNames.students")}
              >
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
                    isPending(teacherStore.updateRequest) ||
                    isPending(teacherStore.createRequest)
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

export default observer(TeacherForm);
