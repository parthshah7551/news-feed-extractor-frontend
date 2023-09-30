import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastifyContainer = () => {
  return <ToastContainer autoClose={2000} theme="colored" />;
};

export default ToastifyContainer;
