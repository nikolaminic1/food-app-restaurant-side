import React, { FC, ReactElement, useState, useEffect } from "react";
import { Restaurant } from "../app/models/responseModels/restaurants";
import { Link } from "react-router-dom";
import { MainRestaurantCardDiv } from "../style/RestaurantPages";
import { Image, Tag } from "antd";
import placeholder from "../assets/placeholder.png";
import RatingIcon from "./RatingIcon";
import DeliveryPrice from "./DeliveryPrice";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: FC<RestaurantCardProps> = ({
  restaurant,
}): ReactElement => {
  return (
    <MainRestaurantCardDiv>
      <Link to={`${restaurant.id}`}>
        <div className="content-wrapper">
          <div className="image">
            <Image
              src={`${import.meta.env["VITE_SERVER_URL"]}${
                restaurant.logoImage
              }`}
              style={{ objectFit: "contain" }}
              width={"100%"}
              height={"100%"}
              fallback={placeholder}
              preview={false}
            />
          </div>
          <div className="content">
            <div className="title">
              <h6 className="name">{restaurant.name}</h6>
              <p className="description">{restaurant.description}</p>
            </div>
            <div className="details">
              <div className="tags">
                {restaurant.tags?.map((tag, i) => {
                  return (
                    <div key={i}>
                      <Tag color={tag.tagColor}>{tag.tagType}</Tag>
                    </div>
                  );
                })}
              </div>
              <div className="ratings">
                <RatingIcon amount={restaurant.averageRating} />
              </div>
              <div className="price-of-delivery">
                <DeliveryPrice amount={restaurant.priceOfDelivery} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </MainRestaurantCardDiv>
  );
};

export default RestaurantCard;
