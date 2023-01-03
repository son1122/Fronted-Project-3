import "./NotFound.css";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const NotFound = () => {
  const noPermission = () => {
    toast.error("Authorization failed.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    noPermission();
  }, []);
  return (
    <div className="not-found-cont">
      {noPermission}
      <ToastContainer />
    </div>
  );
};

export default NotFound;
