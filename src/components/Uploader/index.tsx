/*
 * @Author: 刘玉田
 * @Date: 2021-06-09 18:08:26
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-10 10:02:21
 * 上传组件
 */

import { useAjax } from "ajax";
import { Button } from "antd";
import React, { ChangeEvent, FC, useState } from "react";

export const Uploader: FC = () => {
  const client = useAjax();
  const [fileList, setFileList] = useState<File[]>([]);

  const upload = () => {
    fileList.forEach((file: File) => {
      const formData = new FormData();
      formData.append("songFile", file);
      client("/cloud", {
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
      }).then((response) => {
        console.log(response);
      });
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const len = event.target.files.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(event.target.files[i]);
      }
      setFileList(arr);
    }
  };

  return (
    <>
      <input id="file" type="file" multiple onChange={onChange} />
      <Button onClick={upload}>上传</Button>
    </>
  );
};
