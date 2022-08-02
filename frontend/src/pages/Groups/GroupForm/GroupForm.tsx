import React, { useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Button, Modal, Spin, Space, Select } from "antd";

import { IGroup } from "interfaces/group";
import { IStudent } from "interfaces/student";
import spinStore from "store/spin";
import teacherStore from "store/teacher";
import studentStore from "store/student";
import groupStore from "store/group";
import { ButtonsConfig, formItemLayout } from "./constants";
import { locale } from "common/locale";
import { getModalMode } from "./utils";
import { EModalMode } from "common/enums";
import { schemeGroupForm } from "schemes/group";
import { initialValues } from "./constants";
import { isPending } from "common/utils/data.utils";
import { ITeacher } from "interfaces/teacher";
import ClassDatePicker from "modules/ClassDatePicker/ClassDatePicker";
import s from "./GroupForm.styl";

const { Option } = Select;

interface IOwnProps {
  pickedGroup: IGroup | null;
  onCancel: VoidFunction;
  onUpdate: (data: IGroup) => Promise<void>;
  onAdd: (data: IGroup) => Promise<void>;
}

const GroupForm = ({
  pickedGroup,
  onCancel,
  onUpdate,
  onAdd,
}: IOwnProps): JSX.Element => {
  const [mode] = useState(getModalMode(pickedGroup));

  const setInitialValue = (pickedGroup: IGroup | null) => {
    if (!pickedGroup) {
      return initialValues;
    }

    return {
      remember: true,
      group_name: pickedGroup?.group_name,
      teacher: pickedGroup?.teacher,
      class_date: pickedGroup?.class_date,
      students: pickedGroup?.students,
    };
  };

  const handleSubmitClick = async (data: IGroup) => {
    const newData = { ...data };
    let editFunc = onAdd;

    if (mode === EModalMode.EDIT) {
      newData.id = pickedGroup?.id;
      editFunc = onUpdate;
    }

    await editFunc(newData);
    await groupStore.getGroups();
    onCancel();
  };

  const renderTeacherOptions = () => {
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

  const renderStudentOptions = () => {
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
      <p>{`${mode === EModalMode.ADD ? "Add" : "Edit"} group`}</p>
    </Space>
  );

  return (
    <Modal
      className={s.modal}
      title={renderTitle()}
      visible
      onCancel={onCancel}
      footer={null}
      mask
    >
      <Spin
        tip="Loading..."
        spinning={
          isPending(groupStore.updateRequest) ||
          isPending(groupStore.createRequest)
        }
      >
        <div className={s.container}>
          <Form
            labelAlign="left"
            {...formItemLayout}
            onFinish={handleSubmitClick}
            validateMessages={schemeGroupForm}
            initialValues={setInitialValue(pickedGroup)}
          >
            <Form.Item
              name="group_name"
              label="group_name"
              rules={[
                {
                  required: true,
                  min: 2,
                  max: 40,
                },
              ]}
            >
              <Input disabled={spinStore.spin} placeholder="group name" />
            </Form.Item>

            <Form.Item
              name="teacher"
              label="teacher"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                allowClear
                placeholder="select teacher"
                defaultValue={pickedGroup?.teacher}
              >
                {renderTeacherOptions()}
              </Select>
            </Form.Item>

            <Form.Item
              name="students"
              label="students"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                allowClear
                mode="multiple"
                placeholder="select students"
                defaultValue={pickedGroup?.students}
              >
                {renderStudentOptions()}
              </Select>
            </Form.Item>

            <Form.Item
              name="class_date"
              label="class_date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <ClassDatePicker />
            </Form.Item>

            <Form.Item>
              <div className={s.centered}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={
                    isPending(groupStore.updateRequest) ||
                    isPending(groupStore.createRequest)
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

export default observer(GroupForm);
