import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import ProductCategorySection from "../../components/ProductCategorySection";
import ProductCategoryCard from "../../components/ProductCategoryCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getRestaurantDetailOwner } from "../../app/service/restaurants";
import { RootState } from "../../app/store";
import { MainDivCategoriesList } from "../../style/RestaurantPages";
import { Status } from "../../app/service/Status";
import CSpin from "../../layout/CSpin";

interface Props {}

const CategoriesList: FC<Props> = ({}): ReactElement => {
  const run = useRef(false);
  const dispatch = useAppDispatch();

  const restaurantDetail = useAppSelector((state: RootState) => {
    return state.restaurant.restaurantDetail;
  });
  const { restaurant } = restaurantDetail;
  useEffect(() => {
    if (run.current === false) {
      dispatch(getRestaurantDetailOwner())
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
    }
    return () => {
      run.current = true;
    };
  }, []);

  return (
    <>
      {restaurantDetail.status == Status.LOADING ? (
        <CSpin />
      ) : (
        <MainDivCategoriesList>
          <div className="categories">
            <div className="row">
              {restaurant?.productCategories?.map((category, i) => {
                return (
                  <div className="col-lg-6 col-12" key={i}>
                    <ProductCategoryCard category={category} />
                  </div>
                );
              })}
            </div>
          </div>
        </MainDivCategoriesList>
      )}
    </>
    // <div>
    //   <div className="products">
    //     <div className="top-seller">
    //       <div className="row">
    //         {/* {restaurant?.topSeller?.map((product, i) => {
    //                   return (
    //                     <div className="col-lg-6 col-12" key={i}>
    //                       <ProductDetailCard product={product} key={i} />
    //                     </div>
    //                   );
    //                 })} */}
    //       </div>
    //     </div>

    //   </div>
    // </div>
  );
};

export default CategoriesList;
