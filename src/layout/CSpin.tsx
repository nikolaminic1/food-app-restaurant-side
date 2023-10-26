import { Spin } from "antd";
import React, { FC, ReactElement } from "react";
import { SpinDiv } from "../style/Layout";

interface CSpinProps {}

const CSpin: FC<CSpinProps> = ({}): ReactElement => {
  return (
    <SpinDiv>
      <Spin />
    </SpinDiv>
  );
};

export default CSpin;
