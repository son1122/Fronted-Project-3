import "./Order.css";
import OrderView from "./OrderView/OrderView";
import OrderSide from "./OrderSide/OrderSide";
import { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  return (
    <div className={"order-grid"} style={{ height: "90vh" }}>
      <OrderView />
      <OrderSide />
    </div>
  );
};

export default Order;
