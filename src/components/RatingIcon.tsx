import React, { FC, ReactElement, useState, useEffect } from "react";
import { CgSmile, CgSmileNone, CgSmileSad } from "react-icons/cg";
import { MainDivRatingIcon } from "../style/RestaurantPages";

interface RatingIconProps {
  amount: number;
}

const RatingIcon: FC<RatingIconProps> = ({ amount }): ReactElement => {
  const getIcon = () => {
    switch (true) {
      case amount >= 4.5:
        return <CgSmile style={{ color: "#00cc00" }} />;
      case amount < 4.5 && amount >= 3.5:
        return <CgSmile style={{ color: "#80ff00" }} />;
      case amount < 3.5 && amount >= 2.5:
        return <CgSmileNone style={{ color: "#ffff33" }} />;
      case amount < 2.5 && amount >= 1.5:
        return <CgSmileSad style={{ color: "#ffcccc" }} />;
      case amount < 1.5:
        return <CgSmileSad style={{ color: "#ff0000" }} />;
    }
  };
  return (
    <MainDivRatingIcon>
      <div className="icon"> {getIcon()}</div>
      <div className="amount">{amount}</div>
    </MainDivRatingIcon>
  );
};

export default RatingIcon;
