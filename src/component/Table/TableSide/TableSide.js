import "./TableSide.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { forEach } from "lodash";

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
  // Get Menu from data base
  useEffect(() => {
    axios
      .get(`http://localhost:3001/menu_items`)
      .then((res) => {
        setMenuItem(res.data);
      })
      .catch((err) => {});
  }, []);

  //Map menu API
  const totalPrice = tableOrderDetailState.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const allOrderDetailDataFromTable = tableOrderDetailState.map((item, key) => {
    return (
      <div key={item.id} className={"order-side-menu-grid"}>
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
    alert("Payment success");
    setTableOrderDetail([]);
    axios
      .put(`http://localhost:3001/order/status/${selTable}`)
      .then((res) => {})
      .catch((err) => {});
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
        <div className="order-side-confirm-btn" onClick={handleCheckout}>
          Checkout
        </div>
      </div>
    </div>
  );
};
export default TableSide;
