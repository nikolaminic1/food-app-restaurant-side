import React, { FC, ReactElement, useState, useEffect } from "react";
import { ProductCategory } from "../app/models/responseModels/restaurants";
import { Link } from "react-router-dom";
import { MainDivCategoryCard } from "../style/RestaurantPages";
import { Button } from "antd";
import { FiEdit3 } from "react-icons/fi";

interface Props {
  category: ProductCategory;
}

const ProductCategoryCard: FC<Props> = ({ category }): ReactElement => {
  console.log(category);

  return (
    <MainDivCategoryCard>
      <div className="content-wrapper">
        <div className="content">
          <div className="info">
            <h6>{category.nameOfCategory}</h6>
            <p>{category.descOfCategory}</p>
          </div>
          <div className="data">
            <p>Featured : {category.featured ? <>Yes</> : <>No</>}</p>
            <p> Visible : {category.categoryVisible ? <>Yes</> : <>No</>}</p>
            <p> Number of products : {category.productList.length}</p>
          </div>
          <div className="control">
            <Link to={`${category.id}`}>
              <Button icon={<FiEdit3 />}>Edit</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainDivCategoryCard>
  );
};

export default ProductCategoryCard;
