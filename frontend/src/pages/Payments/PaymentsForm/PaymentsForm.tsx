import React, { useState } from "react";
import { observer } from "mobx-react";
import {
  Form,
  InputNumber,
  Radio,
  DatePicker,
  Button,
  Modal,
  Spin,
  Space,
  Select,
} from "antd";

import spinStore from "store/spin";
import teacherStore from "store/teacher";
import groupStore from "store/group";
import studentStore from "store/student";
import paymentStore from "store/payment";
import { locale } from "common/locale";
import { getModalMode } from "./utils";
import { EModalMode } from "common/enums";
import { schemeStudentForm } from "schemes/student";
import { isPending } from "common/utils/data.utils";
import { ITeacher } from "interfaces/teacher";
import { formItemLayout, initialValues, OPTIONS_TYPE } from "./constants";
import { IPayment } from "interfaces/payment";
import { IStudent } from "interfaces/student";
import { IGroup } from "interfaces/group";
import s from "./PaymentsForm.styl";

const { Option } = Select;

interface IOwnProps {
  picked: IPayment | null;
  onCancel: VoidFunction;
  onAdd: (data: IPayment) => Promise<void>;
}

const StudentForm = ({ picked, onAdd, onCancel }: IOwnProps): JSX.Element => {
  const [mode] = useState(getModalMode(picked));

  const setInitialValue = (picked: IPayment | null) => {
    if (!picked) {
      return initialValues;
    }

    return {
      remember: true,
      type: picked?.type,
      payer_id: picked?.payer_id,
      payment_date: picked?.payment_date,
      payment_amount: picked?.payment_amount,
      method: picked?.method,
      teacher_id: picked?.teacher_id,
      group_id: picked?.group_id,
    };
  };

  const handleSubmitClick = async (data: IPayment) => {
    await onAdd(data);
    await paymentStore.getPayments();
    onCancel();
  };

  const renderOptionsType = () =>
    OPTIONS_TYPE.map((el: string) => (
      <Option key={el} value={el}>
        {el}
      </Option>
    ));

  const renderOptionspayer_id = () =>
    studentStore.students.data.map((student: IStudent) => (
      <Option key={student.id} value={student.id}>
        {student.id}
        {"-"}
        {student.lastname}. {student.firstname[0]}. {student.patronymic[0]}
      </Option>
    ));

  const renderTeacherOptions = () =>
    teacherStore.teachers.data.map((teacher: ITeacher) => (
      <Option key={teacher.id} value={teacher.id}>
        {teacher.id}
        {"-"}
        {teacher.lastname}. {teacher.firstname[0]}. {teacher.patronymic[0]}
      </Option>
    ));

  const renderGroupOptions = () =>
    groupStore.groups.data.map((group: IGroup) => (
      <Option key={group.id} value={group.id}>
        {group.id} {"-"} {group.group_name}
      </Option>
    ));

  const renderTitle = () => (
    <Space align="baseline">
      <p>{`${mode === EModalMode.ADD ? "Add" : "Edit"} payment`}</p>
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
            initialValues={setInitialValue(picked)}
          >
            <Form.Item
              name="type"
              label="type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select allowClear placeholder="select type">
                {renderOptionsType()}
              </Select>
            </Form.Item>

            <Form.Item
              name="payer_id"
              label="payer"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select allowClear placeholder="payer Id">
                {renderOptionspayer_id()}
              </Select>
            </Form.Item>

            <Form.Item
              name="teacher_id"
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
                defaultValue={picked?.teacher_id}
              >
                {renderTeacherOptions()}
              </Select>
            </Form.Item>

            <Form.Item
              name="group_id"
              label="group"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                allowClear
                placeholder="select group"
                defaultValue={picked?.group_id}
              >
                {renderGroupOptions()}
              </Select>
            </Form.Item>

            <Form.Item
              name="payment_date"
              label="payment date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker placeholder="payment date" format={"DD.MM.YY"} />
            </Form.Item>

            <Form.Item
              name="payment_amount"
              label="payment amount"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                placeholder="payment amount"
                disabled={spinStore.spin}
              />
            </Form.Item>

            <Form.Item name="method" initialValue="cash" label="payment type">
              <Radio.Group buttonStyle="outline">
                <Radio.Button value="cash">cash</Radio.Button>
                <Radio.Button value="card">card</Radio.Button>
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
                  Add
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
