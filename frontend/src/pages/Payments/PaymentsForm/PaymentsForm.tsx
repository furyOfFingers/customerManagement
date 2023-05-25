import React from "react";
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
import moment from "moment";
import { isEmpty } from "ramda";

import spinStore from "store/spin";
import teacherStore from "store/teacher";
import groupStore from "store/group";
import studentStore from "store/student";
import paymentStore from "store/payment";
import { locale } from "common/locale";
import { schemeStudentForm } from "schemes/student";
import { isPending } from "common/utils/data.utils";
import { ITeacher } from "interfaces/teacher";
import { initialValues } from "./constants";
import { IPayment } from "interfaces/payment";
import { IStudent } from "interfaces/student";
import { IGroup } from "interfaces/group";
import { formItemLayout } from "common/utils/form";
import { IMoneyReportSettings } from "interfaces/moneyReport";

const { Option } = Select;

interface IOwnProps {
  date: [string, string];
  picked: IPayment | null;
  optionsType: IMoneyReportSettings[] | null;
  onCancel: VoidFunction;
  onAdd: (data: IPayment) => Promise<void>;
}

const StudentForm = ({
  date,
  picked,
  optionsType,
  onAdd,
  onCancel,
}: IOwnProps): JSX.Element => {
  const [form] = Form.useForm();
  const setInitialValue = (picked: IPayment | null) => {
    if (!picked) {
      return isEmpty(optionsType)
        ? initialValues
        : {
            ...initialValues,
            type: optionsType?.[0].value,
            payment_amount: optionsType?.[0].subscription_payment,
          };
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
    const newDate = moment(data.payment_date).format("DD.MM.YYYY");
    const newPaymentAmount = String(data.payment_amount);
    data.payment_date = newDate;
    data.payment_amount = newPaymentAmount;

    await onAdd(data);
    await paymentStore.getPayments(date[0], date[1]);
    onCancel();
  };

  const renderOptionsType = () => {
    if (isEmpty(optionsType)) {
      return [];
    }

    return optionsType!.map((el: IMoneyReportSettings) => (
      <Option key={el.id} value={el.value}>
        {el.value}
      </Option>
    ));
  };

  const renderOptionsPayer = () =>
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
      <p>Add</p>
    </Space>
  );

  const handleTypeSelect = (select: string) => {
    const selectedOption = optionsType?.find((el) => el.value === select);

    if (selectedOption) {
      form.setFieldsValue({
        payment_amount: selectedOption.subscription_payment,
      });
    }
  };

  return (
    <Modal title={renderTitle()} visible onCancel={onCancel} footer={null} mask>
      <Spin
        tip="Loading..."
        spinning={
          isPending(studentStore.updateRequest) ||
          isPending(studentStore.createRequest)
        }
      >
        <div>
          <Form
            form={form}
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
              <Select
                onSelect={handleTypeSelect}
                allowClear
                placeholder="select type"
              >
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
                {renderOptionsPayer()}
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
              <DatePicker placeholder="payment date" format={"DD-MM-YYYY"} />
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
                disabled={spinStore.get()}
              />
            </Form.Item>

            <Form.Item name="method" initialValue="cash" label="payment type">
              <Radio.Group buttonStyle="outline">
                <Radio.Button value="cash">cash</Radio.Button>
                <Radio.Button value="card">card</Radio.Button>
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
