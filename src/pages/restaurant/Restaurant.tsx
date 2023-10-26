import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getRestaurantDetail } from "../../app/service/restaurants";
import { MainDivRestaurantPage } from "../../style/RestaurantPages";
import { RootState } from "../../app/store";
import { Status } from "../../app/service/Status";
import CSpin from "../../layout/CSpin";
import ProductDetailCard from "../../components/ProductDetailCard";
import ProductCategorySection from "../../components/ProductCategorySection";
import RestaurantOrderSection from "../../components/RestaurantOrderSection";
import RatingIcon from "../../components/RatingIcon";
import DeliveryPrice from "../../components/DeliveryPrice";

interface RestaurantProps {}

const Restaurant: FC<RestaurantProps> = ({}): ReactElement => {
  const params = useParams();
  const run = useRef(false);
  const dispatch = useAppDispatch();
  const restaurantDetail = useAppSelector((state: RootState) => {
    return state.restaurant.restaurantDetail;
  });
  const { restaurant } = restaurantDetail;
  useEffect(() => {
    if (run.current === false) {
      console.log(params.id);
      dispatch(getRestaurantDetail(Number(params.id)))
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
      {restaurantDetail?.status == Status.LOADING ? (
        <CSpin />
      ) : (
        <MainDivRestaurantPage>
          <div className="page-wrapper">
            <div className="restaurant-detail">
              <div className="info">
                <div className="name">{restaurant.name}</div>
                <div className="description">{restaurant.description}</div>
                <div className="rating">
                  <RatingIcon amount={restaurant.averageRating} />
                </div>
                <div className="delivery">
                  <DeliveryPrice amount={restaurant.priceOfDelivery} />
                </div>
              </div>
              <div className="products">
                <div className="top-seller">
                  <div className="row">
                    {restaurant?.topSeller?.map((product, i) => {
                      return (
                        <div className="col-lg-6 col-12" key={i}>
                          <ProductDetailCard product={product} key={i} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="categories">
                  {restaurant?.productCategories?.map((category, i) => {
                    return <ProductCategorySection category={category} />;
                  })}
                </div>
              </div>
            </div>
            <div className="restaurant-order">
              <RestaurantOrderSection id={restaurant?.id} />
            </div>
          </div>
        </MainDivRestaurantPage>
      )}
    </>
  );
};

export default Restaurant;
