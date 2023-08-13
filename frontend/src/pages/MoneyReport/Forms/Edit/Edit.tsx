import React, { Fragment } from "react";
import { Button, Divider, Form, InputNumber, Modal, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";

import {
  IMoney,
  IMoneyReportSettings,
  IUpdateReportSettings,
} from "interfaces/moneyReport";
import { formItemLayout } from "common/utils/form";

import s from "./Edit.styl";

interface IownProps {
  isLoading: boolean;
  settings: IMoneyReportSettings[] | null;
  onCancel: VoidFunction;
  onUpdate: (data: IUpdateReportSettings) => Promise<void>;
}

const Edit = ({
  settings,
  onCancel,
  onUpdate,
  isLoading,
}: IownProps): JSX.Element => {
  const { t } = useTranslation();
  const renderTitle = () => (
    <Space align="baseline">
      <p>{t("common.panelControl.edit")}</p>
    </Space>
  );

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
    <Modal title={renderTitle()} open onCancel={onCancel} footer={null} mask>
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

                      <div>
                        {t("report.fieldNames.value")}: {el.value}
                      </div>

                      <div>
                        {t("report.fieldNames.hint")}: {el.hint}
                      </div>
                    </div>

                    <div className={s.inputBlock}>
                      <Form.Item
                        name={`${el.id} - subscription_payment`}
                        initialValue={el.subscription_payment}
                      >
                        <InputNumber
                          addonBefore={
                            <label>
                              {t("report.fieldNames.subscription_payment")}
                            </label>
                          }
                        />
                      </Form.Item>

                      <Form.Item
                        name={`${el.id} - teacher_salary`}
                        initialValue={el.teacher_salary}
                      >
                        <InputNumber
                          addonBefore={
                            <label>
                              {t("report.fieldNames.teacher_salary")}
                            </label>
                          }
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Fragment>
              ))}
            </>

            <Form.Item>
              <div className={s.buttons}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  {t("common.panelControl.edit")}
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

export default Edit;
