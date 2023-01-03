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

const CHECKOUT_BUTTON_CONTAINER = {
  position: "fixed",
  bottom: "10px",
  display: "flex",
  justifyContent: "space-around",
  //   border: "1px solid red",
  height: "50px",
  width: "100%",
};

const CHECKOUT_CONFIRM_STYLE = {
  border: "none",
  backgroundColor: "#ff2531",
  color: "#fff",
  width: "150px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
};
const CHECKOUT_CANCEL_STYLE = {
  border: "none",
  backgroundColor: "#ccc",
  color: "#fff",
  width: "150px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
};

const CHECKOUT_CONFIRM_STYLE_HOVER = {
  ...CHECKOUT_CONFIRM_STYLE,
  opacity: "80%",
  transition: "0.4s",
  backgroundColor: "#81e480",
  color: "#252525",
};

const CheckoutConfirmButton = styled.button`
  ${CHECKOUT_CONFIRM_STYLE}&:hover {
    ${CHECKOUT_CONFIRM_STYLE_HOVER}
  }
`;

const CHECKOUT_CANCEL_STYLE_HOVER = {
  ...CHECKOUT_CANCEL_STYLE,
  opacity: "80%",
  transition: "0.4s",
  backgroundColor: "#252525",
};

const CheckoutCancelButton = styled.button`
  ${CHECKOUT_CANCEL_STYLE}&:hover {
    ${CHECKOUT_CANCEL_STYLE_HOVER}
  }
`;

//Using lottie react and react-toastify for animations.
export default function ModalConfirm({
  open,
  lottieRef,
  setIsModal,
  isFailed,
  setIsFailed,
  selTable,
  handleCheckout,
  tableOrderDetailState,
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusText, setStatusText] = useState("Confirm Order?");

  //This useEffect is use to control the modal.
  useEffect(() => {
    //This is a nested if else statement
    //This is the outer layer, this outer layer check if a confirm or cancel button is clicked where "confirm" = "isSucess", and "cancel" = "isFailed"
    if (isSuccess) {
      //This inner layer is checking if the order is less than 1 (not exist), to prevent the status to show success even though there are no menu items.
      if (tableOrderDetailState.length < 1) {
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("../../assets/failedani.json"),
        });
        setTimeout(() => {
          handleCheckout();
          setIsModal(false);
          setStatusText("Confirm Payment?");
        }, 4000);
        //This is the inner layer else statement if isSuccess and the menuitems is more than one then run this.
      } else {
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("../../assets/successani.json"),
        });
        setTimeout(() => {
          handleCheckout();
          setIsModal(false);
          setStatusText("Confirm Payment?");
        }, 4000);
      }
      //This is the outer layer else if statement, pretty self explanatory, if the cancel button is clicked then fail animation and handleCheckout() is not included.
    } else if (isFailed) {
      lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../../assets/failedani.json"),
      });
      setTimeout(() => {
        setIsModal(false);
        setStatusText("Confirm Payment?");
      }, 4000);
    }
    //Reset all the status
    setIsFailed(false);
    setIsSuccess(false);
  }, [isSuccess, isFailed]);

  //This is to check if the modal is not open then return null so the modal wont always show
  if (!open) return null;

  //Handle confirm setting isSuccess to true and change the status text, when this is click it will trigger the useEffect which will then automatically run the conditionals
  const handleConfirmClick = () => {
    setIsFailed(false);
    setIsSuccess(true);
    setStatusText(`Confirming Payment for Table ${selTable}`);
  };

  //Same as handleConfirmClick()
  const handleCancelClick = () => {
    setIsSuccess(false);
    setIsFailed(true);
    setStatusText(`Cancelling Payment for Table ${selTable}`);
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
          Table:{selTable}
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
        <div style={CHECKOUT_BUTTON_CONTAINER}>
          <CheckoutConfirmButton
            onClick={() => {
              handleConfirmClick();
            }}
          >
            Confirm
          </CheckoutConfirmButton>
          <CheckoutCancelButton
            onClick={() => {
              handleCancelClick();
            }}
          >
            Cancel
          </CheckoutCancelButton>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
