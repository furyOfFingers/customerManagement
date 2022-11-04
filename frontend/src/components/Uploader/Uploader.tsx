import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import s from "./Uploader.styl";

interface IUploader {
  onFileLoader: (data: Blob) => void;
  onRemove?: () => void;
  text?: string;
}

function Uploader({
  onFileLoader,
  text = "Upload photo",
  onRemove,
}: IUploader): JSX.Element {
  const request = ({ file, onSuccess }) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
      onFileLoader(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };

    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div className={s.container}>
      <Upload onRemove={onRemove} customRequest={request} maxCount={1}>
        <Button icon={<UploadOutlined />}>{text}</Button>
      </Upload>
    </div>
  );
}

export default Uploader;
