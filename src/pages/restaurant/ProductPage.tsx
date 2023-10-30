import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getProductDetail } from "../../app/service/product";
import { MainDivProductDetail } from "../../style/products";
import { Status } from "../../app/service/Status";
import CSpin from "../../layout/CSpin";
import AppendicesCategoryCard from "../../components/AppendicesCategoryCard";
import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Upload,
  UploadFile,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadProps } from "antd/es/upload";
import { Image, Product } from "../../app/models/responseModels/restaurants";
import TextArea from "antd/es/input/TextArea";
import VariationSection from "../../components/VariationSection";
import { getBase64 } from "../../app/modules/image";
import FormInfoItems from "../../components/FormInfoItems";
import AppendicesSection from "../../components/AppendicesSection";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface Props {}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

export const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button size="large" type="primary" disabled={!submittable}>
      Sačuvaj
    </Button>
  );
};

const ProductPage: FC<Props> = ({}): ReactElement => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState<any>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [numberOfMainImages, setNumberOfMainImages] = useState(1);
  const [imagesToRemove, setImagesToRemove] = useState<any>([]);
  const [previewImage, setPreviewImage] = useState("");
  const [doesHaveVariations, setDoesHaveVariations] = useState(false);
  const [newVariationName, setNewVariationName] = useState("");
  const [newVariation, setNewVariation] = useState(false);
  const productDetail = useAppSelector((state: RootState) => {
    return state.product.productDetail;
  });

  const [form] = Form.useForm();
  const { product } = productDetail;
  const run = useRef(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (run.current === false) {
      dispatch(getProductDetail(Number(id)))
        .unwrap()
        .then((data: Product) => {
          createFileList(data.image);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const createFileList = (main_image: Image) => {
    let k: UploadFile[] = [];
    // orderRequestStatus == Status.LOADING &&
    if (main_image) {
      let l: UploadFile[] = [];
      let img = {
        uid: String(main_image.id),
        name: main_image.name_of_image,
        url: `${import.meta.env["VITE_DJANGO_SERVER"]}${main_image.imageUrl}`,
      };
      l.push(img);
      setMainImage(l);
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };
  const onChangeForm = (field: any, fields: any) => {};

  const handlePreview = async (file: UploadFile) => {
    // console.log(file);

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
    setNumberOfMainImages(mainImage.length);

    const formData = new FormData();
    formData.append("files[]", file as RcFile);

    // console.log(file);
  };

  const beforeUploadMainImage = (file: UploadFile) => {
    let m: UploadFile = {
      uid: String(file.uid),
      name: file.fileName || "",
      url: `${import.meta.env["VITE_DJANGO_SERVER"]}${file.url}`,
    };
    setMainImage([...mainImage, m]);
    setNumberOfMainImages(mainImage.length);
    return false;
  };
  const onRemoveMainImage = (file: UploadFile) => {
    setImagesToRemove((list: any) => [...list, file]);
  };
  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <div style={{ borderColor: "#afafaf" }}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload image</div>
    </div>
  );

  return (
    <>
      {productDetail?.status == Status.LOADING ? (
        <CSpin />
      ) : (
        <>
          {productDetail.status == Status.REJECTED ? (
            <>Error</>
          ) : (
            <>
              {product && (
                <MainDivProductDetail>
                  <div className="form">
                    <Form
                      style={{ width: "100%" }}
                      {...formItemLayout}
                      form={form}
                      name="product"
                      onFinish={onFinish}
                      onFieldsChange={onChangeForm}
                      scrollToFirstError
                      layout="vertical"
                    >
                      <div className="detail col-lg-6 col-12">
                        <div className="image">
                          <Upload
                            listType="picture-card"
                            fileList={mainImage}
                            onPreview={handlePreview}
                            onChange={handleChangeMainImage}
                            onRemove={onRemoveMainImage}
                            beforeUpload={beforeUploadMainImage}
                            // {...props}
                          >
                            {uploadButton}
                          </Upload>
                          <Modal
                            open={previewOpen}
                            title={null}
                            footer={null}
                            onCancel={handleCancel}
                          >
                            <img
                              alt="example"
                              style={{ width: "100%" }}
                              src={previewImage}
                            />
                          </Modal>
                        </div>
                        <div className="info">
                          <FormInfoItems />
                        </div>
                      </div>
                      <div className="variation">
                        <VariationSection
                          form={form}
                          variation={product.variation}
                        />
                      </div>
                      <div className="appendices mt-3">
                        <AppendicesSection
                          form={form}
                          appendices={product.appendicesCategoryList}
                        />
                      </div>
                      <Form.Item
                        className="save-button mt-4"
                        wrapperCol={{ span: 24 }}
                      >
                        <Popconfirm
                          title="Product save"
                          description="Are you sure you want to save changes ?"
                          icon={
                            <QuestionCircleOutlined style={{ color: "red" }} />
                          }
                          onConfirm={() => form.submit()}
                        >
                          <SubmitButton form={form} />{" "}
                        </Popconfirm>
                      </Form.Item>
                    </Form>
                  </div>
                </MainDivProductDetail>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductPage;
