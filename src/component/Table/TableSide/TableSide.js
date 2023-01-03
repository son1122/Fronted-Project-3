import "./TableSide.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { forEach } from "lodash";
import ModalCheckout from "../../Modal/ModalCheckout";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TableSide = ({
  setSelTable,
  order,
  tables,
  setTables,
  setOrder,
  orderDetail,
  setOrderDetail,
  selTable,
  tableOrderDetailState,
  setTableOrderDetail,
}) => {
  const [menuItem, setMenuItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const lottieRef = useRef(null);
  // Get Menu from data base
  useEffect(() => {
    axios
      .get(`http://localhost:3001/menu_items`)
      .then((res) => {
        setMenuItem(res.data);
      })
      .catch((err) => {});
  }, []);

  const notiSelTable = () => {
    toast.info(`Selected Table: ${selTable}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const checkoutSuccess = () => {
    toast.success(`Payment Succeed`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const checkoutFailed = () => {
    toast.error(`Payment Failed`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const checkoutFailedNoItem = () => {
    toast.error(`Payment Failed. No order in table ${selTable}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    if (!selTable) {
    } else {
      notiSelTable();
    }
  }, [selTable]);

  //Map menu API
  const totalPrice = tableOrderDetailState.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const allOrderDetailDataFromTable = tableOrderDetailState.map((item, key) => {
    return (
      <div key={key} className={"order-side-menu-grid"}>
        <img
          src={item.img}
          className={"order-side-menu-img"}
          style={{ maxheight: "50%" }}
        />
        <div className="order-side-menu-nameprice">
          <div className="order-side-menu-name">{item.name}</div>
          <div className="order-side-menu-price">
            {" "}
            ฿ {item.price * item.quantity}
          </div>
        </div>
        <div className="order-side-menu-qtybtn">
          <div className="order-side-menu-qty">x {item.quantity}</div>
        </div>
      </div>
    );
  });

  const handleCheckout = () => {
    if (tableOrderDetailState.length > 0) {
      checkoutSuccess();
      setTableOrderDetail([]);
    } else {
      checkoutFailedNoItem();
    }
    axios
      .put(`http://localhost:3001/order/status/${selTable}`)
      .then((res) => {})
      .catch((err) => {
        checkoutFailed();
      });
  };
  return (
    <div className={"order-side-grid"}>
      <h2>Table: {selTable}</h2>
      <div className={"order-side-detail-grid"}>
        <div className={"table-selection"}>
          <div className="custom-select">
            <h3>Customer: Jane Doe </h3>
          </div>
        </div>

        <div className="order-details-container">
          <div className="dont-delete-this-for-testing">Order's Summary</div>
        </div>
        <div className="order-side-slide">
          <div className={"order-side-detail-container"}>
            {allOrderDetailDataFromTable}
          </div>
        </div>
        <div className="price-cont">
          <div className="total-price-left">
            <p className="total-price-label-total" id="service">
              Service Charge (0%)
            </p>
            <p className="total-price-label-total" id="tax">
              Tax (0%)
            </p>
            <p className="total-price-label-total" id="total">
              Total
            </p>
          </div>
          <div className="total-price-right">
            <p className="total-price-label-total" id="service">
              0 Baht
            </p>
            <p className="total-price-label-total" id="tax">
              0 Baht
            </p>
            <p className="total-price-label-total" id="total">
              {totalPrice} Baht
            </p>
          </div>
        </div>
      </div>
      <div className="order-side-confirm-btn-cont">
        {/* <div className="order-side-confirm-btn" onClick={handleCheckout}>
          Checkout
        </div> */}
        <ModalCheckout
          lottieRef={lottieRef}
          open={isModal}
          selTable={selTable}
          isModal={isModal}
          onClose={() => setIsModal(true)}
          setIsModal={setIsModal}
          isFailed={isFailed}
          setIsFailed={setIsFailed}
          handleCheckout={handleCheckout}
          tableOrderDetailState={tableOrderDetailState}
        >
          {/* open={isModal} */}
        </ModalCheckout>
        <div
          className="order-side-confirm-btn"
          onClick={() => {
            setIsModal(true);
          }}
        >
          Checkout
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default TableSide;
