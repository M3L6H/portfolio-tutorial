import axios from "axios";
import Cookies from "js-cookie";

import { getCookieFromReq } from "../helpers/utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 3000
});

const setAuthHeader = (req) => {
  const token = req ? getCookieFromReq(req, "jwt") : Cookies.get("jwt");

  if (token) {
    return { headers: { "authorization": `Bearer ${token}` } };
  }

  return undefined;
};

const rejectPromise = resError => {
  let error = {};

  if (resError && resError.response && resError.response.data)
    error = resError.response.data;
  else
    error = resError;

  return Promise.reject(error);
}

export const getSecretData = async (req) => {
  return await axiosInstance.get("/secret", setAuthHeader(req)).then(res => res.data);
};

export const getProjects = async () => {
  return await axiosInstance.get("/portfolio").then(res => res.data);
};

export const getProjectById = async (id) => {
  return await axiosInstance.get(`/portfolio/${id}`).then(res => res.data);
};

export const createProject = async (projectData) => {
  return await axiosInstance.post("/portfolio", projectData, setAuthHeader())
    .then(res => res.data)
    .catch(err => rejectPromise(err));
};

export const updateProject = async (projectData) => {
  return await axiosInstance.patch(`/portfolio/${ projectData._id }`, projectData, setAuthHeader())
    .then(res => res.data)
    .catch(err => rejectPromise(err));
};

export const deleteProject = (projectData) => {
  return axiosInstance.delete(`/portfolio/${ projectData._id }`, setAuthHeader())
    .then(res => res.data);
}