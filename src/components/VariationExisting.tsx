import React, { FC, ReactElement, useState, useEffect } from "react";
import { Variation } from "../app/models/responseModels/restaurants";

interface Props {
  deleteVariation: () => void;
  variation: Variation;
}

const VariationExisting: FC<Props> = ({}): ReactElement => {
  return <div></div>;
};

export default VariationExisting;
