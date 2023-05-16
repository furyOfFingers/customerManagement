import React, { Fragment } from "react";
import { Button, Divider, Form, InputNumber, Modal, Space, Spin } from "antd";

import {
  IMoney,
  IMoneyReportSettings,
  IUpdateReportSettings,
} from "interfaces/moneyReport";
import { formItemLayout } from "common/utils/form";
import { locale } from "common/locale";

import s from "./Edit.styl";

interface IownProps {
  isLoading: boolean;
  settings: IMoneyReportSettings[] | null;
  onCancel: VoidFunction;
  onUpdate: (data: IUpdateReportSettings) => Promise<void>;
}

const renderTitle = () => (
  <Space align="baseline">
    <p>Edit Money Report Settings</p>
  </Space>
);

const Edit = ({
  settings,
  onCancel,
  onUpdate,
  isLoading,
}: IownProps): JSX.Element => {
  const handleSubmitClick = async (data: IUpdateReportSettings) => {
    const update = {} as IUpdateReportSettings;
    const money = {} as IMoney;

    Object.keys(data).forEach((el) => {
      const [id, name] = el.split(" - ");

      if (typeof data[el] === "number") {
        money[name] = data[el];
        update[id] = { ...money };
      }
    });

    onUpdate(update);
  };

  return (
    <Modal title={renderTitle()} visible onCancel={onCancel} footer={null} mask>
      <Spin tip="Loading..." spinning={isLoading}>
        <div className={s.editWrapper}>
          <Form {...formItemLayout} onFinish={handleSubmitClick}>
            <>
              {settings?.map((el) => (
                <Fragment key={el.id}>
                  <Divider>{el.label}</Divider>

                  <div className={s.infoWrappBlock}>
                    <div className={s.infoBlock}>
                      <div>id: {el.id}</div>
                      <div>value: {el.value}</div>
                      <div>hint: {el.hint}</div>
                    </div>

                    <div className={s.inputBlock}>
                      <Form.Item
                        name={`${el.id} - subscription_payment`}
                        initialValue={el.subscription_payment}
                      >
                        <InputNumber
                          addonBefore={<label>subscription</label>}
                        />
                      </Form.Item>

                      <Form.Item
                        name={`${el.id} - teacher_salary`}
                        initialValue={el.teacher_salary}
                      >
                        <InputNumber addonBefore={<label>teacher</label>} />
                      </Form.Item>
                    </div>
                  </div>
                </Fragment>
              ))}
            </>

            <Form.Item>
              <div className={s.buttons}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  {locale.form.update}
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

export default Edit;
