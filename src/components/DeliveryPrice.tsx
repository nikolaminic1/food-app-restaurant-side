import React, { FC, ReactElement, useState, useEffect } from "react";

interface DeliveryPriceProps {
  amount: number;
}

const DeliveryPrice: FC<DeliveryPriceProps> = ({ amount }): ReactElement => {
  return (
    <div>{amount == 0 ? <>Free delivery</> : <>Delivery : {amount}</>}</div>
  );
};

export default DeliveryPrice;
