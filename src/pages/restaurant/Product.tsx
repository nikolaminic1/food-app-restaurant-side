import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getProductDetail } from "../../app/service/product";
import { MainDivProductDetail } from "../../style/products";
import { Status } from "../../app/service/Status";
import CSpin from "../../layout/CSpin";
import AppendicesCategoryCard from "../../components/AppendicesCategoryCard";
import { Upload } from "antd";

interface Props {}

const Product: FC<Props> = ({}): ReactElement => {
  const { id } = useParams();
  const productDetail = useAppSelector((state: RootState) => {
    return state.product.productDetail;
  });
  const run = useRef(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (run.current === false) {
      dispatch(getProductDetail(Number(id)))
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <>
      {productDetail?.status == Status.LOADING ? (
        <CSpin />
      ) : (
        <>
          {productDetail.status == Status.REJECTED ? (
            <>Error</>
          ) : (
            <MainDivProductDetail>
              <div className="content-wrapper">
                <div className="detail">
                  <div className="info"></div>
                  <div className="images">
                    <Upload />
                  </div>
                </div>
                <div className="appendices">
                  {productDetail.product?.appendicesCategoryList?.map(
                    (category, i) => {
                      return (
                        <AppendicesCategoryCard category={category} key={i} />
                      );
                    }
                  )}
                </div>
              </div>
            </MainDivProductDetail>
          )}
        </>
      )}
    </>
  );
};

export default Product;
