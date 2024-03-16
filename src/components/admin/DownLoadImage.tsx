import React, { useState } from "react";

import { Image as ImageAnt, Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUploader = ({ SetValue }: any) => {
  const [image, setImage] = useState<File>();
  const [imageURL, setImageURL] = useState<string | undefined>();

  const handleOnChange = (event: any) => {
    const file = event.file;
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const img = new Image();
        img.src = fileReader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const targetWidth = 640;
          const targetHeight = 480;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > targetWidth) {
              height *= targetWidth / width;
              width = targetWidth;
            }
          } else {
            if (height > targetHeight) {
              width *= targetHeight / height;
              height = targetHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          const resizedDataURL = canvas.toDataURL("image/jpeg");
          setImageURL(resizedDataURL);
          SetValue("image", resizedDataURL);
        };
      };
      fileReader.readAsDataURL(file);
      setImage(file);
    }
  };
  const handleBeforeUpload = (file: File) => {
    return false;
  };

  return (
    <Form>
      <Form.Item>
        <Upload
          maxCount={1}
          name="file"
          listType="picture"
          beforeUpload={handleBeforeUpload}
          className="hidden"
          onChange={handleOnChange}
          onRemove={() => setImage(undefined)}
        >
          <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
      </Form.Item>
      <ImageAnt src={imageURL ? imageURL : "no_photo.jpg"} alt="Preview" />
      <div>{image ? image.name : ""}</div>
    </Form>
  );
};

export default FileUploader;
