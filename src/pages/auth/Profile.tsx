import { Button } from "antd";
import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { windowReducer, windowSlice } from "../../app/store/slice/windowSlice";
import {
  setLoginModalOpenAction,
  setSignUpModalOpenAction,
} from "../../app/store/actions/layouyActions";
import { getMyProfile, logoutRequest } from "../../app/service/auth";
import { RootState } from "../../app/store";
import { Navigate, redirect } from "react-router-dom";
import { logout } from "../../app/store/actions/auth";

interface ProfileProps {}

const Profile: FC<ProfileProps> = ({}): ReactElement => {
  const dispatch = useAppDispatch();
  const run = useRef(false);
  const isAuthenticated = useAppSelector((state: RootState) => {
    return state.auth.jwt.isAuthenticated;
  });
  const profile = useAppSelector((state: RootState) => {
    return state.auth.user.user;
  });
  console.log(profile);

  // create login and register buttons
  useEffect(() => {
    if (run.current === false) {
      if (isAuthenticated) {
        dispatch(getMyProfile())
          .unwrap()
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        redirect("/login");
      }
    }
    return () => {
      run.current = true;
    };
  }, []);
  return (
    <>
      {isAuthenticated ? (
        <div>
          {profile && (
            <>
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
            </>
          )}
          <Button
            onClick={() => {
              logout();

              dispatch(logoutRequest())
                .unwrap()
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            {" "}
            Logout
          </Button>
        </div>
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  );
};

export default Profile;
