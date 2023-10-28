import React, { FC, ReactElement, useState, useEffect } from "react";
import { ProductCategory } from "../app/models/responseModels/restaurants";
import ProductDetailCard from "./ProductDetailCard";
import { MainDivProductCategorySection } from "../style/RestaurantPages";

interface Props {
  category: ProductCategory;
}

const ProductCategorySection: FC<Props> = ({ category }): ReactElement => {
  return (
    <MainDivProductCategorySection>
      <div className="info">
        <h6>{category.nameOfCategory}</h6>
        <p>{category.descOfCategory}</p>
      </div>
      <div className="products">
        <div className="row">
          {category.productList.map((product, i) => {
            return (
              <div className="col-lg-6 col-12" key={i}>
                <ProductDetailCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </MainDivProductCategorySection>
  );
};

export default ProductCategorySection;
