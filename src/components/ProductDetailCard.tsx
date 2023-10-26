import React, { FC, ReactElement, useState, useEffect } from "react";
import { Product } from "../app/models/responseModels/restaurants";

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard: FC<ProductDetailCardProps> = ({
  product,
}): ReactElement => {
  return <div>{product.id}</div>;
};

export default ProductDetailCard;
