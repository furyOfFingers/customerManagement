import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import s from "./Uploader.styl";

interface IUploader {
  onPhotoLoader: (data: Blob) => void;
}

function Uploader({ onPhotoLoader }: IUploader): JSX.Element {
  const request = ({ file, onSuccess }) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
      onPhotoLoader(reader.result);
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
      <Upload customRequest={request} maxCount={1}>
        <Button icon={<UploadOutlined />}>Upload photo</Button>
      </Upload>
    </div>
  );
}

export default Uploader;
