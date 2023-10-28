import React, { FC, ReactElement, useState, useEffect } from "react";
import { Product } from "../app/models/responseModels/restaurants";
import { MainDivProductCard } from "../style/RestaurantPages";
import { Button, Image } from "antd";
import placeholder from "../assets/placeholder.png";
import { Link } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard: FC<ProductDetailCardProps> = ({
  product,
}): ReactElement => {
  return (
    <MainDivProductCard>
      <div className="content-wrapper">
        <div className="image">
          <Image
            src={`${import.meta.env["VITE_SERVER_URL"]}${
              product?.image?.imageUrl
            }`}
            style={{ objectFit: "contain" }}
            width={"100%"}
            height={"100%"}
            fallback={placeholder}
            preview={false}
          />
        </div>
        <div className="info">
          <h6>
            {product.nameOfProduct} <span>#{product.codeOfProduct}</span>
          </h6>
          <p>{product.aboutProduct}</p>
          <Link to={`/products/${product.id}`}>
            <Button icon={<FiEdit3 />}>Edit</Button>
          </Link>
        </div>
      </div>
    </MainDivProductCard>
  );
};

export default ProductDetailCard;
