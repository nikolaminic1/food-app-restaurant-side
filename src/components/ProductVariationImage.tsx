import React, { FC, ReactElement, useState, useEffect, useRef } from "react";

import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Upload,
  UploadFile,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import type { UploadProps } from "antd";
import { Image } from "../app/models/responseModels/restaurants";

interface ProductVariationImageProps {
  restField: { fieldKey?: number | undefined };
  name: number;
  file?: Image;
}

const ProductVariationImage: FC<ProductVariationImageProps> = ({
  restField,
  name,
  file,
}): ReactElement => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [SfileList, setSFileList] = useState<any>([]);
  const [imagesToRemove, setImagesToRemove] = useState<any>([]);
  const run = useRef(false);

  const createFileList = (file: Image | undefined) => {
    let k: UploadFile[] = [];
    // orderRequestStatus == Status.LOADING &&
    if (file) {
      const newFile = {
        uid: String(file.id),
        name: file.name_of_image,
        url: `${import.meta.env["VITE_DJANGO_SERVER"]}` + file.imageUrl,
      };
      k.push(newFile);
      // console.log(k);
    }
    setSFileList(k);
  };

  useEffect(() => {
    if (run.current === false) {
      createFileList(file);
    }
    return () => {
      run.current = true;
    };
  }, []);

  const uploadButton = (
    <div style={{ borderColor: "#afafaf" }}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload image</div>
    </div>
  );

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    // console.log(file);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({ file, fileList }) => {
    setSFileList(fileList);
    // const formData = new FormData();
    // formData.append("files[]", file as RcFile);
    console.log(fileList);
  };
  const beforeUpload = (file: UploadFile) => {
    let m = {
      uid: String(file.uid),
      name: file.fileName,
      url: `${import.meta.env["VITE_DJANGO_SERVER"]}${file.url}`,
    };
    setSFileList([...SfileList, m]);
    return false;
  };

  const handleCancel = () => setPreviewOpen(false);

  const onRemove = (file: UploadFile) => {
    // console.log(file);
    setImagesToRemove((list: any) => [...list, file]);

    // dispatch(removeImageFromProduct(Number(file.uid)))
    //   .unwrap()
    //   .then(() => {})
    //   .catch((err) => {
    // console.log(err);
    //   });
    //todo this fucntion should send request to remove image from product
  };

  return (
    <>
      <Modal
        open={previewOpen}
        title={null}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <Form.Item
        labelAlign="left"
        wrapperCol={{ sm: 24 }}
        labelCol={{ sm: 24 }}
        {...restField}
        name={[name, "product_variation_image"]}
        label={null}
        // getValueFromEvent={SfileList}
      >
        <Upload
          listType="picture-card"
          fileList={SfileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={onRemove}
          beforeUpload={beforeUpload}
          maxCount={1}
          // {...props}
        >
          {uploadButton}
        </Upload>
      </Form.Item>
    </>
  );
};

export default ProductVariationImage;
