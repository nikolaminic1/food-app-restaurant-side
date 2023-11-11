import { App, UploadFile } from "antd";
import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  SetStateAction,
} from "react";
import { getBase64 } from "../app/modules/image";
import Upload, { RcFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  setPreviewImage: SetStateAction<any>;
  setPreviewOpen: SetStateAction<any>;
  setMainImage: SetStateAction<any>;
  setLogoImage: SetStateAction<any>;
  setImagesToRemove: SetStateAction<any>;
  mainImage: Array<any>;
  logoImage: Array<any>;
}

const LogoImage: FC<Props> = ({
  setPreviewImage,
  setPreviewOpen,
  setMainImage,
  setLogoImage,
  setImagesToRemove,
  mainImage,
  logoImage,
}): ReactElement => {
  const uploadButton = (
    <div style={{ borderColor: "#afafaf" }}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload image</div>
    </div>
  );

  const { message } = App.useApp();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChangeMainImage: UploadProps["onChange"] = async ({
    file,
    fileList,
  }) => {
    setMainImage(fileList);
    const formData = new FormData();
    formData.append("files[]", file as RcFile);
  };

  const beforeUploadMainImage = (file: any) => {
    let m: UploadFile = {
      uid: String(file.uid),
      name: file.name || "",
      url: `${import.meta.env["VITE_DJANGO_SERVER"]}${file.url}`,
    };
    setMainImage([...mainImage, m]);

    checkSize(file);
    return false;
  };

  const checkSize = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    console.log(file.size);

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    console.log(isLt2M);

    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const onRemoveMainImage = (file: UploadFile) => {
    setImagesToRemove((list: any) => [...list, file]);
  };

  const handleChangeLogoImage: UploadProps["onChange"] = async ({
    file,
    fileList,
  }) => {
    setLogoImage(fileList);
  };
  const onRemoveLogoImage = () => {};

  const beforeUploadLogoImage = (file: any) => {
    let m: UploadFile = {
      uid: String(file.uid),
      name: file.name || "",
      url: `${import.meta.env["VITE_DJANGO_SERVER"]}${file.url}`,
    };
    checkSize(file);

    setLogoImage([...logoImage, m]);
    return false;
  };

  return (
    <div>
      {" "}
      <div className="images d-flex">
        <div className="image me-4">
          <h6>Main image</h6>
          <Upload
            listType="picture-card"
            fileList={mainImage}
            onPreview={handlePreview}
            onChange={handleChangeMainImage}
            onRemove={onRemoveMainImage}
            beforeUpload={beforeUploadMainImage}
            maxCount={1}
            // {...props}
          >
            {uploadButton}
          </Upload>
        </div>
        <div className="logo">
          <h6>Logo image</h6>
          <Upload
            listType="picture-card"
            fileList={logoImage}
            onPreview={handlePreview}
            onChange={handleChangeLogoImage}
            onRemove={onRemoveLogoImage}
            beforeUpload={beforeUploadLogoImage}
            maxCount={1}
            // {...props}
          >
            {uploadButton}
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default LogoImage;
