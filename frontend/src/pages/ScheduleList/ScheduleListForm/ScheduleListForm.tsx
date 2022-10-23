import React, { useState } from "react";
import { observer } from "mobx-react";
import { Form, Input, Button, Modal, Spin, Space } from "antd";

import { isPending } from "common/utils/data.utils";
import spinStore from "store/spin";
import scheduleListStore from "store/scheduleList";
import { locale } from "common/locale";
import { EModalMode } from "common/enums";
import { schemeScheduleList } from "schemes/scheduleList";
import { initialValues } from "./constants";
import { IScheduleList } from "interfaces/scheduleList";
import ClassDatePicker from "modules/ClassDatePicker/ClassDatePicker";
import { ISchedule } from "interfaces/schedule";
import { ButtonsConfig, formItemLayout, getModalMode } from "common/utils/form";
import s from "./ScheduleListForm.styl";

interface IOwnProps {
  pickedScheduleList: IScheduleList | null;
  onCancel: VoidFunction;
  onUpdate: (data: IScheduleList) => Promise<void>;
  onAdd: (data: IScheduleList) => Promise<void>;
}

const ScheduleListForm = ({
  pickedScheduleList,
  onCancel,
  onUpdate,
  onAdd,
}: IOwnProps): JSX.Element => {
  const [mode] = useState(getModalMode(pickedScheduleList));
  const [schedule, setSchedule] = useState<ISchedule>();

  const setInitialValue = (pickedScheduleList: IScheduleList | null) => {
    if (!pickedScheduleList) {
      return initialValues;
    }

    return {
      remember: true,
      schedule_list_name: pickedScheduleList?.schedule_list_name,
      schedule: pickedScheduleList?.schedule,
    };
  };

  const handleSubmitClick = async (data: IScheduleList) => {
    const newData = { ...data, schedule: schedule };
    let editFunc = onAdd;

    if (mode === EModalMode.EDIT) {
      newData.id = pickedScheduleList?.id;
      editFunc = onUpdate;
    }
    await editFunc(newData as IScheduleList);
    await scheduleListStore.getScheduleLists();
    onCancel();
  };

  const renderTitle = () => (
    <Space align="baseline">
      <p>{`${mode === EModalMode.ADD ? "Add" : "Edit"} schedule list`}</p>
    </Space>
  );

  const handleClick = (time: ISchedule) => {
    setSchedule(time);
  };

  return (
    <Modal
      className={s.modal}
      title={renderTitle()}
      visible
      onCancel={onCancel}
      footer={null}
    >
      <Spin
        tip="Loading..."
        spinning={
          isPending(scheduleListStore.updateRequest) ||
          isPending(scheduleListStore.createRequest)
        }
      >
        <div>
          <Form
            labelAlign="left"
            {...formItemLayout}
            onFinish={handleSubmitClick}
            validateMessages={schemeScheduleList}
            initialValues={setInitialValue(pickedScheduleList)}
          >
            <Form.Item
              name="schedule_list_name"
              label="schedule_list_name"
              rules={[
                {
                  required: true,
                  min: 2,
                  max: 40,
                },
              ]}
            >
              <Input
                disabled={spinStore.get()}
                placeholder="schedule_list_name"
              />
            </Form.Item>

            <Form.Item name="class_date" label="class_date">
              <ClassDatePicker onClick={handleClick} />
            </Form.Item>

            <Form.Item>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={
                    isPending(scheduleListStore.updateRequest) ||
                    isPending(scheduleListStore.createRequest)
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

export default observer(ScheduleListForm);
