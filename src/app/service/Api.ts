import axios from "axios";
import { useCookies } from "react-cookie";

const HOST = `${import.meta.env["VITE_SERVER_URL"]}`;

export function loginApi() {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return axios.create({
    baseURL: "http://localhost:8070/login",
    headers: headers,
  });
}

export function noAuthApi() {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Access-Control-Allow-Origin": true,
  };
  return axios.create({
    baseURL: "http://localhost:8070/api/auth/",
    headers: headers,
  });
}

export function genericApi() {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Access-Control-Allow-Origin": true,
  };
  return axios.create({
    baseURL: "http://localhost:8070/api/v1",
    headers: headers,
    // withCredentials: true,
  });
}

export function fileUploadApi() {
  const headers = {
    // "Content-Type": "*/*",
    Accept: "application/json",
    "Content-Disposition": " attachment; filename=file.jpeg",
  };
  return axios.create({
    baseURL: "http://localhost:8070/api/v1",
    headers: headers,
  });
}

export function authApi() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
    Accept: "application/json",
  };

  return axios.create({
    baseURL: "http://localhost:8070/api/v1",
    headers: headers,
  });
}

export function authApiForm() {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
    "Content-Type": "application/form-data",
    Accept: "*/*",
  };

  return axios.create({
    baseURL: "http://localhost:8070/api/v1",
    headers: headers,
  });
}

export function jwtApi() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
    Accept: "application/json",
  };

  return axios.create({
    baseURL: "http://localhost:8070/",
    headers: headers,
  });
}
