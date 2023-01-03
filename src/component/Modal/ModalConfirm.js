import React, { useEffect, useState } from "react";
import styled from "styled-components";
import lottie from "lottie-web";

import { ToastContainer, toast } from "react-toastify";
const MODAL_STYLE = {
  position: "fixed",
  width: "420px",
  height: "180px",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "50px",
  zIndex: 300,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  MozBoxShadow: "0 0 3px #000",
  WebkitBoxShadow: "0 0 3px #000",
  boxShadow: "0 0 3px #ccc",
};

const OVERLAY_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 300,
};

const BUTTON_CONTAINER = {
  position: "fixed",
  bottom: "10px",
  display: "flex",
  justifyContent: "space-around",
  //   border: "1px solid red",
  height: "50px",
  width: "100%",
};

const CONFIRM_STYLE = {
  border: "none",
  backgroundColor: "#ff2531",
  color: "#fff",
  width: "150px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
};
const CANCEL_STYLE = {
  border: "none",
  backgroundColor: "#ccc",
  color: "#fff",
  width: "150px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
};

const CONFIRM_STYLE_HOVER = {
  ...CONFIRM_STYLE,
  opacity: "80%",
  transition: "0.4s",
  backgroundColor: "#81e480",
  color: "#252525",
};

const ConfirmButton = styled.button`
  ${CONFIRM_STYLE}&:hover {
    ${CONFIRM_STYLE_HOVER}
  }
`;

const CANCEL_STYLE_HOVER = {
  ...CANCEL_STYLE,
  opacity: "80%",
  transition: "0.4s",
  backgroundColor: "#252525",
};

const CancelButton = styled.button`
  ${CANCEL_STYLE}&:hover {
    ${CANCEL_STYLE_HOVER}
  }
`;

export default function ModalConfirm({
  open,
  children,
  onClose,
  lottieRef,
  currentOrder,
  isModal,
  setIsModal,
  confirmOrder,
  isFailed,
  setIsFailed,
  selectTable,
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  // const [isFailed, setIsFailed] = useState(false);
  const [statusText, setStatusText] = useState("Confirm Order?");

  useEffect(() => {
    // setIsSuccess(false);
    console.log("check if issuccess", isSuccess);
    console.log("check if isfailed", isFailed);
    if (isSuccess) {
      if (selectTable === null) {
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("../../assets/failedani.json"),
        });
        setTimeout(() => {
          confirmOrder();
          setIsModal(false);
          setStatusText("Confirm Order?");
        }, 4000);
      } else {
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("../../assets/successani.json"),
        });
        setTimeout(() => {
          confirmOrder();
          setIsModal(false);
          setStatusText("Confirm Order?");
        }, 4000);
      }
    } else if (isFailed) {
      lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../../assets/failedani.json"),
      });
      setTimeout(() => {
        confirmOrder();
        setIsModal(false);
        setStatusText("Confirm Order?");
      }, 4000);
    }
    setIsFailed(false);
    setIsSuccess(false);
  }, [isSuccess, isFailed]);
  if (!open) return null;

  const handleConfirmClick = () => {
    setIsFailed(false);
    setIsSuccess(true);
    setStatusText(`Confirming Order#00${currentOrder}`);
  };

  const handleCancelClick = () => {
    setIsSuccess(false);
    setIsFailed(true);
    setStatusText(`Cancelling Order#00${currentOrder}`);
  };
  return (
    <>
      <div style={OVERLAY_STYLE} />
      <div style={MODAL_STYLE}>
        {" "}
        <div
          style={{
            fontSize: "20px",
            position: "fixed",
            top: "0",
            backgroundColor: "#ff2531",
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          Order#00{currentOrder}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "120px",
          }}
        >
          <div style={{ height: "40px" }} ref={lottieRef}></div>
          <div style={{ fontSize: "20px", color: "#252525" }}>{statusText}</div>
        </div>
        <div style={BUTTON_CONTAINER}>
          <ConfirmButton
            onClick={() => {
              handleConfirmClick();
            }}
          >
            Confirm
          </ConfirmButton>
          <CancelButton
            onClick={() => {
              handleCancelClick();
            }}
          >
            Cancel
          </CancelButton>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
