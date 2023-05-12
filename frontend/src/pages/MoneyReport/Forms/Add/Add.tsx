import { Button, Form, Input, Modal, Space, Spin } from "antd";
import React from "react";

import { ICreateReportSettings } from "interfaces/moneyReport";
import { formItemLayout } from "common/utils/form";
import { locale } from "common/locale";
import s from "./Add.styl";

const options = ["value", "label", "hint", "teacher_salary"];
interface IOwnProps {
  isLoading: boolean;
  onCancel: VoidFunction;
  onAdd: (data: ICreateReportSettings) => Promise<void>;
}

const renderTitle = () => (
  <Space align="baseline">
    <p>Add Money Report Settings</p>
  </Space>
);

const Add = ({ onCancel, onAdd, isLoading }: IOwnProps): JSX.Element => {
  const handleSubmitClick = async (data: ICreateReportSettings) => {
    onAdd(data);
  };

  return (
    <Modal title={renderTitle()} visible onCancel={onCancel} footer={null} mask>
      <Spin tip="Loading..." spinning={isLoading}>
        <div className={s.editWrapper}>
          <Form
            labelAlign="left"
            {...formItemLayout}
            onFinish={handleSubmitClick}
          >
            <>
              {options.map((el) => (
                <Form.Item
                  key={el}
                  name={el}
                  label={el}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ))}
            </>

            <Form.Item>
              <div className={s.buttons}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  {locale.form.add}
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

export default Add;
