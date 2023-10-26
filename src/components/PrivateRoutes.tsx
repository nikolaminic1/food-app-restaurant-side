import React, { FC, ReactElement, useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRoutesProps {}

const PrivateRoutes: FC<PrivateRoutesProps> = ({}): ReactElement => {
  let auth = { token: localStorage.getItem("access") };

  return auth.token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
