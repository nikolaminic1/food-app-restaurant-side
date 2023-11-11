import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getRestaurantDetailOwner,
  removeBackgroundImage,
  removeLogoImage,
  updateRestaurant,
  uploadBackgroundImage,
  uploadLogoImage,
} from "../../app/service/restaurants";
import { MainDivRestaurantPage } from "../../style/RestaurantPages";
import { RootState } from "../../app/store";
import { Status } from "../../app/service/Status";
import CSpin from "../../layout/CSpin";
import ProductDetailCard from "../../components/ProductDetailCard";
import ProductCategorySection from "../../components/ProductCategorySection";
import RestaurantOrderSection from "../../components/RestaurantOrderSection";
import RatingIcon from "../../components/RatingIcon";
import DeliveryPrice from "../../components/DeliveryPrice";
import RestaurantFormItems from "../../components/RestaurantFormItems";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { App, Form, Modal, Popconfirm, Upload } from "antd";
import { SubmitButton } from "./ProductPage";
import { getBase64 } from "../../app/modules/image";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import {
  Image,
  Restaurant as RestaurantType,
} from "../../app/models/responseModels/restaurants";
import LogoImage from "../../components/LogoImage";

interface RestaurantProps {}

const formItemLayout = {
  labelCol: {
    lg: { span: 8 },
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    lg: { span: 8 },
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const Restaurant: FC<RestaurantProps> = ({}): ReactElement => {
  const params = useParams();
  const run = useRef(false);
  const dispatch = useAppDispatch();
  const [mainImage, setMainImage] = useState<any>([]);
  const [logoImage, setLogoImage] = useState<any>([]);
  const [imagesToRemove, setImagesToRemove] = useState<any>([]);
  const [isFileLessT2M, setIsFileLessT2M] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const { notification } = App.useApp();
  const restaurantDetail = useAppSelector((state: RootState) => {
    return state.restaurant.restaurantDetail;
  });

  const { restaurant } = restaurantDetail;
  const [form] = Form.useForm();

  const createFile = (file: string) => {
    let k: UploadFile[] = [];
    // orderRequestStatus == Status.LOADING &&
    if (file) {
      const newFile = {
        uid: String(file),
        name: file,
        url: `${import.meta.env["VITE_DJANGO_SERVER"]}/api/v1/media/` + file,
      };
      k.push(newFile);
    }
    return k;
  };

  useEffect(() => {
    if (run.current === false) {
      dispatch(getRestaurantDetailOwner())
        .unwrap()
        .then((res: RestaurantType) => {
          console.log(res);
          const path = `${import.meta.env["VITE_DJANGO_SERVER"]}/api/v1/media/${
            res.backgroundImage
          }`;

          form.setFieldsValue({
            id: res.id,
            name: res.name,
            description: res.description,
            priceOfDelivery: res.priceOfDelivery,
            priceOfOrderForFreeDelivery: res.priceOfOrderForFreeDelivery,
            businessOwner: res.businessOwner,
            businessLocation: res.businessLocation,
            tags: res.tags,
          });

          setMainImage(createFile(res.backgroundImage));
          setLogoImage(createFile(res.logoImage));
        })
        .catch((error) => console.log(error));
    }
    return () => {
      run.current = true;
    };
  }, []);

  const logoImageUpdate = () => {
    if (logoImage[0] == undefined) {
      dispatch(removeLogoImage())
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (logoImage[0].originFileObj) {
      const logoImageForm = new FormData();
      logoImageForm.append("image", logoImage[0].originFileObj as RcFile);
      dispatch(uploadLogoImage(logoImageForm))
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const backgroundImageUpdate = () => {
    if (mainImage[0] == undefined) {
      dispatch(removeBackgroundImage())
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (mainImage[0].originFileObj) {
      const bgImageForm = new FormData();
      bgImageForm.append("image", mainImage[0].originFileObj as RcFile);
      dispatch(uploadBackgroundImage(bgImageForm))
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const onFinish = (values: any) => {
    dispatch(updateRestaurant(values))
      .unwrap()
      .then((res) => {
        notification.success({ message: "Successfully updated" });
        logoImageUpdate();
        backgroundImageUpdate();
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "An error occurred while updating the restaurant data",
        });
      });
  };

  const handleCancel = () => setPreviewOpen(false);
  const onChangeForm = (field: any, fields: any) => {};

  return (
    <>
      {restaurantDetail?.status == Status.LOADING ? (
        <CSpin />
      ) : (
        <MainDivRestaurantPage>
          <Modal
            open={previewOpen}
            title={null}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
          <div className="page-wrapper">
            <div className="restaurant-detail">
              <div className="info">
                {/* <Form.Provider
                  onFormFinish={(name, { values, forms }) => {
                    const { restaurant } = forms;
                    const { address } = forms;
                    const restaurantDetail = restaurant.getFieldsValue(true);
                    const addressDetail = address.getFieldsValue(true);
                    console.log(addressDetail);
                  }}
                > */}
                <Form
                  style={{ width: "100%" }}
                  {...formItemLayout}
                  form={form}
                  name="restaurant"
                  onFinish={onFinish}
                  onFieldsChange={onChangeForm}
                  scrollToFirstError
                  layout="vertical"
                >
                  <div className="detail">
                    <LogoImage
                      setPreviewImage={setPreviewImage}
                      setPreviewOpen={setPreviewOpen}
                      setMainImage={setMainImage}
                      setLogoImage={setLogoImage}
                      setImagesToRemove={setImagesToRemove}
                      mainImage={mainImage}
                      logoImage={logoImage}
                    />
                    <div className="restaurant-info">
                      <RestaurantFormItems />
                    </div>
                  </div>
                </Form>

                <Popconfirm
                  title="Restaurant save"
                  description="Are you sure you want to save changes ?"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  onConfirm={() => form.submit()}
                >
                  <SubmitButton form={form} />{" "}
                </Popconfirm>
                {/* <div className="rating">
                  <RatingIcon amount={restaurant.averageRating} />
                </div>
                <div className="delivery">
                  <DeliveryPrice amount={restaurant.priceOfDelivery} />
                </div> */}
              </div>
            </div>
          </div>
        </MainDivRestaurantPage>
      )}
    </>
  );
};

export default Restaurant;
