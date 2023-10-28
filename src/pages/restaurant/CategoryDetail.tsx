import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Status } from "../../app/service/Status";
import CSpin from "../../layout/CSpin";
import { MainDivCategoryDetail } from "../../style/RestaurantPages";
import ProductDetailCard from "../../components/ProductDetailCard";
import { ProductCategory } from "../../app/models/responseModels/restaurants";
import { getCategoryDetail } from "../../app/service/restaurants";
import { useParams } from "react-router-dom";

interface Props {}

const CategoryDetail: FC<Props> = ({}): ReactElement => {
  const categoryDetail = useAppSelector((state: RootState) => {
    return state.restaurant.categoryDetail;
  });
  const dispatch = useAppDispatch();
  const params = useParams();
  const run = useRef(false);
  useEffect(() => {
    if (run.current === false) {
      dispatch(getCategoryDetail(Number(params.id)))
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      run.current = true;
    };
  }, []);
  console.log(categoryDetail);

  return (
    <>
      {categoryDetail && (
        <>
          {categoryDetail.status == Status.LOADING ? (
            <CSpin />
          ) : (
            <>
              {categoryDetail.status == Status.REJECTED ? (
                <></>
              ) : (
                <MainDivCategoryDetail>
                  {categoryDetail && (
                    <div className="content-wrapper">
                      <div className="info"></div>
                      <div className="products">
                        <div className="row">
                          {categoryDetail.category?.productList?.map(
                            (product, i) => {
                              return (
                                <div className="col-lg-6 col-12" key={i}>
                                  <ProductDetailCard product={product} />
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </MainDivCategoryDetail>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default CategoryDetail;
