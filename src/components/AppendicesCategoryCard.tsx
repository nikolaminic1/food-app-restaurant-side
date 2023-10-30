import React, { FC, ReactElement, useState, useEffect } from "react";
import { AppendicesCategory } from "../app/models/responseModels/restaurants";

interface Props {
  category: AppendicesCategory;
}

const AppendicesCategoryCard: FC<Props> = ({ category }): ReactElement => {
  return <div>{category.id}</div>;
};

export default AppendicesCategoryCard;
