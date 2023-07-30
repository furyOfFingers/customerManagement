import { Button, Form, Input, Modal, Space, Spin } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import { ICreateReportSettings } from "interfaces/moneyReport";
import { formItemLayout } from "common/utils/form";
import s from "./Add.styl";
import { schemeMoneyReportSettings } from "schemes/moneyReportSettings";

const options = {
  value: { min: 1, max: 50 },
  label: { min: 1, max: 50 },
  hint: { min: 1, max: 100 },
  subscription_payment: { min: 1, max: 10 },
  teacher_salary: { min: 1, max: 10 },
};

interface IOwnProps {
  isLoading: boolean;
  onCancel: VoidFunction;
  onAdd: (data: ICreateReportSettings) => Promise<void>;
}

const Add = ({ onCancel, onAdd, isLoading }: IOwnProps): JSX.Element => {
  const { t } = useTranslation();

  const renderTitle = () => (
    <Space align="baseline">
      <p>{t("common.panelControl.add")}</p>
    </Space>
  );

  const handleSubmitClick = async (data: ICreateReportSettings) => {
    onAdd(data);
  };

  return (
    <Modal title={renderTitle()} open onCancel={onCancel} footer={null} mask>
      <Spin tip="Loading..." spinning={isLoading}>
        <div className={s.editWrapper}>
          <Form
            labelAlign="left"
            {...formItemLayout}
            onFinish={handleSubmitClick}
            validateMessages={schemeMoneyReportSettings}
          >
            <>
              {Object.keys(options).map((el) => (
                <Form.Item
                  key={el}
                  name={el}
                  label={t(`report.fieldNames.${el}`)}
                  rules={[
                    {
                      required: true,
                      min: options[el].min,
                      max: options[el].max,
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
                  {t("common.panelControl.add")}
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

export default Add;
